/* ============================================================
   邪修英语 · 发音引擎 audio.js（v4 英音 + 分包缓存版）
   优先级（成功产品的做法：预置音频，不依赖手机系统语音）：
   ① 本地 MP3（audio-manifest.js，edge-tts 英音神经语音，随站部署，
      Cache Storage 分包缓存，二次访问离线可用）
   ② 有道在线原声（英文单词/短句兜底，需联网，固定英式 type=0）
   ③ 浏览器 TTS（最后兜底，优先 en-GB）
   代际令牌保证 stop/切词后旧音频立即作废。
   ============================================================ */
(function () {
  var manifest = window.AUDIO_MANIFEST || { en: {}, zh: {} };
  var playGen = 0;
  var curAudio = null;     // 当前本地音频对象
  var curBlobUrl = null;   // 当前 blob URL（播放完释放）
  var preloads = [];       // 预热去重表（最多 8 条）

  var synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
  var voices = [];
  var readyResolvers = [];
  var ready = false;
  var activeFinishes = [];
  var lastCancelAt = 0;
  var keepTimer = null;

  var norm = function (s) { return String(s == null ? '' : s).trim().replace(/\s+/g, ' '); };

  /* 语言级音量补偿：实测 edge-tts 响度 en≈-20.0 LUFS / zh≈-19.1 LUFS，
     中文偏响约 0.9 LU，播放中文时按 0.9（≈-0.9dB）拉平，避免中英音量忽大忽小 */
  var LANG_VOLUME = { en: 1.0, zh: 0.9 };

  /* ================= Cache Storage 分包缓存 ================= */
  var CACHE_NAME = 'xx-audio-v1';   // 词库文本更新时升版本号
  var cacheP = null;
  try {
    if ('caches' in window) cacheP = caches.open(CACHE_NAME);
  } catch (e) { cacheP = null; }

  /* ================= ① 本地 MP3 ================= */
  /* 清单只存哈希前12位（减体积），路径在这里拼 */
  function localPath(lang, text) {
    var t = norm(text);
    var h = lang === 'zh' ? manifest.zh[t] : manifest.en[t];
    return h ? 'assets/audio/' + lang + '/' + h + '.mp3' : null;
  }

  /** 供分包模块用：文本 → MP3 URL（不在清单内返回 null） */
  function urlOf(lang, text) { return localPath(lang, text); }

  /** 预取单条：fetch → Cache Storage；命中即跳过；失败静默（播放时再取） */
  function prefetch(src) {
    if (!cacheP || !src) return Promise.resolve(false);
    return cacheP.then(function (c) {
      return c.match(src).then(function (hit) {
        if (hit) return true;
        return fetch(src, { mode: 'same-origin' }).then(function (resp) {
          if (!resp.ok) return false;
          return c.put(src, resp.clone()).then(function () { return true; });
        }).catch(function () { return false; });
      });
    }).catch(function () { return false; });
  }

  function playLocal(lang, text, rate) {
    var src = localPath(lang, text);
    if (!src) return Promise.resolve(false);
    var myGen = playGen;
    // 有缓存读缓存（blob 秒开且支持离线），没有直接播网络地址
    var srcP = cacheP
      ? cacheP.then(function (c) {
          return c.match(src).then(function (hit) {
            if (!hit) return src;
            return URL.createObjectURL(hit.blob ? hit.blob() : hit);
          });
        }).catch(function () { return src; })
      : Promise.resolve(src);
    return srcP.then(function (resolved) {
      if (myGen !== playGen) {
        if (resolved.indexOf('blob:') === 0) try { URL.revokeObjectURL(resolved); } catch (e) {}
        return false;
      }
      return new Promise(function (resolve) {
        var a = new Audio(resolved);
        a.preload = 'auto';
        a.volume = LANG_VOLUME[lang] || 1;   // 语言级音量补偿
        a.playbackRate = Math.max(0.5, Math.min(2, rate || 1));
        curAudio = a;
        curBlobUrl = resolved.indexOf('blob:') === 0 ? resolved : null;
        var done = false, timer = null;
        function finish(ok) {
          if (done) return;
          done = true;
          clearTimeout(timer);
          if (curAudio === a) curAudio = null;
          if (curBlobUrl) { try { URL.revokeObjectURL(curBlobUrl); } catch (e) {} curBlobUrl = null; }
          resolve(ok);
        }
        a.onended = function () { finish(true); };
        a.onerror = function () { finish(false); };
        timer = setTimeout(function () { finish(false); }, 40000);
        // 用户点过播放，媒体自动播放策略已放开；仍 catch 拒绝
        a.play().then(function () {
          if (myGen !== playGen) { try { a.pause(); } catch (e) {} finish(true); }
        }).catch(function () { finish(false); });
      });
    });
  }

  /** 预热（播放循环中提前拿下一条）：走缓存层，兼容无 Cache 的环境 */
  function preload(lang, text) {
    var src = localPath(lang, text);
    if (!src) return;
    if (cacheP) { prefetch(src); return; }
    if (preloads.indexOf(src) >= 0) return;
    try {
      var a = new Audio(src);
      a.preload = 'auto';
      preloads.push(src);
      if (preloads.length > 8) preloads.shift();
    } catch (e) {}
  }

  /**
   * 分包预载：把一个包内的所有音频拉进 Cache Storage
   * list: [src...]；onProgress(done, total) 逐条回调
   * 并发 4；单条失败不阻塞整包
   * 返回 {done, total, ok}，ok=false 表示有失败（调用方不应标记已缓存）
   */
  function preloadPack(list, onProgress) {
    var total = list.length, doneN = 0, okN = 0, ptr = 0;
    function worker() {
      if (ptr >= total) return Promise.resolve();
      var src = list[ptr++];
      return prefetch(src).catch(function () { return false; }).then(function (ok) {
        doneN++;
        if (ok) okN++;
        try { onProgress && onProgress(doneN, total); } catch (e) {}
        return worker();
      });
    }
    var n = Math.min(4, total);
    var ws = [];
    for (var i = 0; i < n; i++) ws.push(worker());
    return Promise.all(ws).then(function () {
      return { done: doneN, total: total, ok: okN === total && total > 0 };
    });
  }

  /* ================= ③ 浏览器 TTS（兜底） ================= */
  function refreshVoices() {
    if (!synth) return;
    try { voices = synth.getVoices() || []; } catch (e) { voices = []; }
    if (voices.length && !ready) {
      ready = true;
      readyResolvers.splice(0).forEach(function (r) { r(true); });
    }
  }
  if (synth) {
    refreshVoices();
    try { synth.onvoiceschanged = refreshVoices; } catch (e) {}
    var warmTicks = 0;
    var warmTimer = setInterval(function () {
      refreshVoices();
      if (++warmTicks >= 10) {
        clearInterval(warmTimer);
        if (!ready) { ready = true; readyResolvers.splice(0).forEach(function (r) { r(false); }); }
      }
    }, 250);
  }
  function whenReady() {
    return new Promise(function (res) {
      if (ready || !synth) return res(true);
      readyResolvers.push(res);
    });
  }

  function pickVoice(prefix) {
    if (!voices.length) refreshVoices();
    var i;
    if (prefix === 'en') {
      // 英音优先，其次任意英文引擎
      for (i = 0; i < voices.length; i++)
        if (voices[i].lang === 'en-GB') return voices[i];
      for (i = 0; i < voices.length; i++)
        if (voices[i].lang && voices[i].lang.toLowerCase().indexOf('en') === 0) return voices[i];
      return null; // 不用中文引擎冒充英文
    } else if (prefix === 'zh') {
      for (i = 0; i < voices.length; i++)
        if (voices[i].lang && voices[i].lang.toLowerCase().indexOf('zh') === 0) return voices[i];
      return voices[0] || null;
    } else if (prefix === 'any') {
      return voices[0] || null;
    }
    return null;
  }
  function ensureVoice(prefix) {
    return new Promise(function (resolve) {
      if (pickVoice(prefix)) return resolve(true);
      var n = 0;
      var t = setInterval(function () {
        refreshVoices();
        if (pickVoice(prefix) || ++n >= 10) { clearInterval(t); resolve(!!pickVoice(prefix)); }
      }, 250);
    });
  }

  function keepAliveStart() {
    if (keepTimer || !synth) return;
    keepTimer = setInterval(function () {
      try {
        if (synth.speaking && synth.paused) synth.resume();
        else if (synth.pending === false && synth.speaking === false) keepAliveStop();
      } catch (e) {}
    }, 8000);
  }
  function keepAliveStop() { if (keepTimer) { clearInterval(keepTimer); keepTimer = null; } }

  function ttsSpeak(text, langPrefix, rate, attempt) {
    attempt = attempt || 0;
    var myGen = playGen;
    return ensureVoice(langPrefix).then(function (hasVoice) {
      if (!hasVoice) return false;
      return new Promise(function (resolve) {
        var delay = Math.max(0, 90 - (Date.now() - lastCancelAt));
        setTimeout(function () {
          if (myGen !== playGen) return resolve(true);
          var v = pickVoice(langPrefix);
          if (!v) return resolve(false);

          var u = new SpeechSynthesisUtterance(text);
          u.voice = v; u.lang = v.lang; u.rate = rate; u.volume = 1;
          var done = false, timer = null;
          function finish(ok) {
            if (done) return;
            done = true;
            clearTimeout(timer);
            var i = activeFinishes.indexOf(finish);
            if (i >= 0) activeFinishes.splice(i, 1);
            if (!activeFinishes.length) keepAliveStop();
            resolve(ok);
          }
          activeFinishes.push(finish);
          keepAliveStart();
          u.onend = function () { finish(true); };
          u.onerror = function (e) {
            if (myGen !== playGen) return finish(true);
            var err = e && e.error;
            if (err === 'interrupted' || err === 'canceled') return finish(true);
            if (attempt === 0 && (!err || err === 'network' || err === 'synthesis-failed' || err === 'audio-busy')) {
              finish(true);
              setTimeout(function () {
                if (myGen === playGen) ttsSpeak(text, langPrefix, rate, 1).then(resolve);
                else resolve(true);
              }, 260);
              return;
            }
            finish(false);
          };
          timer = setTimeout(function () { finish(false); }, 20000);
          try { synth.speak(u); } catch (e2) { finish(false); }
        }, delay);
      });
    });
  }

  function stopTTS() {
    lastCancelAt = Date.now();
    keepAliveStop();
    if (synth) { try { synth.cancel(); } catch (e) {} }
    activeFinishes.splice(0).forEach(function (f) { f(true); });
  }

  /* ================= ② 有道在线（英文兜底） ================= */
  function youdaoSpeak(text) {
    return new Promise(function (resolve) {
      var myGen = playGen;
      // type=0 英式发音（站点已统一英音）
      var url = 'https://dict.youdao.com/dictvoice?audio=' +
                encodeURIComponent(text) + '&type=0';
      var audio = new Audio();
      audio.preload = 'auto';
      var done = false;
      var timer = setTimeout(function () { finish(false); }, 9000);
      function finish(ok) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(ok);
      }
      audio.onended = function () { finish(true); };
      audio.onerror = function () { finish(false); };
      audio.src = url;
      audio.play().then(function () {
        var t = setInterval(function () {
          if (myGen !== playGen) { clearInterval(t); finish(true); }
        }, 300);
      }).catch(function () { finish(false); });
    });
  }
  function youdaoEligible(text) {
    if (/^[a-zA-Z][a-zA-Z'’\-]*$/.test(text)) return true;
    return text.length <= 60 && /^[A-Za-z0-9 ,.'’!?;:()\-]+$/.test(text);
  }

  /* ================= 对外接口 ================= */
  function stopAll() {
    playGen++;
    if (curAudio) { try { curAudio.pause(); curAudio.currentTime = 0; } catch (e) {} curAudio = null; }
    stopTTS();
  }

  var AudioEngine = {
    /** 英文：本地 MP3 → 有道 → en 系 TTS → 任意 TTS */
    speakEn: function (text, rate) {
      var genAtCall = playGen;
      return playLocal('en', text, rate || 1).then(function (ok) {
        if (ok || genAtCall !== playGen) return ok;
        if (youdaoEligible(text)) {
          return youdaoSpeak(text).then(function (ok2) {
            if (ok2 || genAtCall !== playGen) return ok2;
            return whenReady().then(function () { return ttsSpeak(text, 'en', rate || 1); });
          }).then(function (ok3) {
            if (ok3 || genAtCall !== playGen) return ok3;
            return whenReady().then(function () { return ttsSpeak(text, 'any', rate || 1); });
          });
        }
        return whenReady().then(function () { return ttsSpeak(text, 'en', rate || 1); });
      });
    },
    /** 中文：本地 MP3 → TTS */
    speakZh: function (text, rate) {
      var genAtCall = playGen;
      return playLocal('zh', text, rate || 0.95).then(function (ok) {
        if (ok || genAtCall !== playGen) return ok;
        return whenReady().then(function () { return ttsSpeak(text, 'zh', rate || 0.95); });
      });
    },
    preload: preload,
    preloadPack: preloadPack,
    urlOf: urlOf,
    stop: stopAll,
    /** Cache Storage 是否可用（分包缓存降级判断） */
    cacheReady: function () { return !!cacheP; },
    /** 能力检测：本地清单覆盖数 / TTS 情况（供诊断） */
    capabilities: function () {
      return {
        localEn: Object.keys(manifest.en).length,
        localZh: Object.keys(manifest.zh).length,
        tts: !!synth,
        enVoice: !!pickVoice('en'),
        zhVoice: !!pickVoice('zh')
      };
    },
    whenReady: whenReady,

    /* ---------- Wake Lock ---------- */
    _wantLock: false,
    _lock: null,
    wake: {
      setWant: function (want) {
        AudioEngine._wantLock = !!want;
        if (want && document.visibilityState === 'visible') acquire();
        else release();
      }
    }
  };

  function acquire() {
    if (!AudioEngine._wantLock || !navigator.wakeLock) return;
    navigator.wakeLock.request('screen').then(function (lk) {
      AudioEngine._lock = lk;
      lk.addEventListener('release', function () { AudioEngine._lock = null; });
    }).catch(function () {});
  }
  function release() {
    if (AudioEngine._lock) {
      AudioEngine._lock.release().catch(function () {});
      AudioEngine._lock = null;
    }
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && AudioEngine._wantLock) acquire();
  });

  window.AudioEngine = AudioEngine;
})();

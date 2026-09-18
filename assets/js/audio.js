/* ============================================================
   邪修英语 · 发音引擎 audio.js（v3 本地音频版）
   优先级（成功产品的做法：预置音频，不依赖手机系统语音）：
   ① 本地 MP3（audio-manifest.js，edge-tts 神经语音，随网站部署）
   ② 有道在线原声（英文单词/短句兜底，需联网）
   ③ 浏览器 TTS（最后兜底，各机型表现不一）
   本地音频用 HTMLAudio，playbackRate 支持语速设置；
   代际令牌保证 stop/切词后旧音频立即作废。
   ============================================================ */
(function () {
  var manifest = window.AUDIO_MANIFEST || { en: {}, zh: {} };
  var playGen = 0;
  var curAudio = null;     // 当前本地音频对象
  var preloads = [];       // 预加载缓存（最多 4 条）

  var synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
  var voices = [];
  var readyResolvers = [];
  var ready = false;
  var accent = 'us';
  var activeFinishes = [];
  var lastCancelAt = 0;
  var keepTimer = null;

  var norm = function (s) { return String(s == null ? '' : s).trim().replace(/\s+/g, ' '); };

  /* 语言级音量补偿：实测 edge-tts 响度 en≈-20.0 LUFS / zh≈-19.1 LUFS，
     中文偏响约 0.9 LU，播放中文时按 0.9（≈-0.9dB）拉平，避免中英音量忽大忽小 */
  var LANG_VOLUME = { en: 1.0, zh: 0.9 };

  /* ================= ① 本地 MP3 ================= */
  function localPath(lang, text) {
    var t = norm(text);
    return (lang === 'zh' ? manifest.zh[t] : manifest.en[t]) || null;
  }

  function playLocal(lang, text, rate) {
    var src = localPath(lang, text);
    if (!src) return Promise.resolve(false);
    var myGen = playGen;
    return new Promise(function (resolve) {
      var a = new Audio(src);
      a.preload = 'auto';
      a.volume = LANG_VOLUME[lang] || 1;   // 语言级音量补偿
      a.playbackRate = Math.max(0.5, Math.min(2, rate || 1));
      curAudio = a;
      var done = false, timer = null;
      function finish(ok) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        if (curAudio === a) curAudio = null;
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
  }

  /** 预加载（循环中提前拿下一条，播放更跟手） */
  function preload(lang, text) {
    var src = localPath(lang, text);
    if (!src || preloads.indexOf(src) >= 0) return;
    try {
      var a = new Audio(src);
      a.preload = 'auto';
      preloads.push(src);
      if (preloads.length > 4) preloads.shift();
    } catch (e) {}
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
      var want = accent === 'gb' ? 'en-GB' : 'en-US';
      for (i = 0; i < voices.length; i++)
        if (voices[i].lang === want) return voices[i];
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
      var url = 'https://dict.youdao.com/dictvoice?audio=' +
                encodeURIComponent(text) + '&type=' + (accent === 'gb' ? 0 : 1);
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
    stop: stopAll,
    setAccent: function (a) { accent = a; },
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

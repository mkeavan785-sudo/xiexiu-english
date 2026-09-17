/* ============================================================
   邪修英语 · 发音引擎 audio.js（v2 加固版）
   三级兜底：① 浏览器 TTS（en-US/en-GB + zh-CN）
            ② 有道词典在线发音（单词 + 短句，需联网）
            ③ 全部失败：回调上层显示横幅，绝不静默
   加固点：
   - 语音预热：speak 前等待目标语音注册（voiceschanged + 轮询，最长 2.5s）
   - 抢词保护：cancel 后 90ms 再发声，避免新句子被一起杀掉
   - 失败重试：network/synthesis-failed 自动重试 1 次
   - 防挂起：朗读期间每 8s resume()，治 Chrome 系 15 秒断句 bug
   - 代际令牌：stop 后旧链路的延迟发声一律作废
   - interrupted/canceled 视为正常停止，不误报失败
   另含：Wake Lock 常亮
   ============================================================ */
(function () {
  var synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
  var voices = [];
  var activeFinishes = [];
  var readyResolvers = [];
  var ready = false;
  var accent = 'us';
  var speakGen = 0;       // stop 时代际 +1，旧发声任务作废
  var lastCancelAt = 0;
  var keepTimer = null;

  /* ---------- 音色加载（异步，兼容 voiceschanged + 轮询） ---------- */
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
    // 老夸克/部分安卓不触发事件：轮询 + 1.5s 放行
    var warmTicks = 0;
    var warmTimer = setInterval(function () {
      refreshVoices();
      if (++warmTicks >= 10) { // 2.5s
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
      // 同前缀任意 en（en-GB / en-AU 都行，胜过无声）
      for (i = 0; i < voices.length; i++)
        if (voices[i].lang && voices[i].lang.toLowerCase().indexOf('en') === 0) return voices[i];
      // 注意：这里故意不兜底中文语音——中文引擎念英文口音重，
      // 英文宁可走有道在线原声（speakEn 的第二级）
      return null;
    } else if (prefix === 'zh') {
      for (i = 0; i < voices.length; i++)
        if (voices[i].lang && voices[i].lang.toLowerCase().indexOf('zh') === 0) return voices[i];
      return voices[0] || null;
    } else if (prefix === 'any') {
      return voices[0] || null;
    }
    return null;
  }

  /* speak 前确保目标语音已注册（最长等 2.5s） */
  function ensureVoice(prefix) {
    return new Promise(function (resolve) {
      if (pickVoice(prefix)) return resolve(true);
      var n = 0;
      var t = setInterval(function () {
        refreshVoices();
        if (pickVoice(prefix) || ++n >= 10) {
          clearInterval(t);
          resolve(!!pickVoice(prefix));
        }
      }, 250);
    });
  }

  /* ---------- 防挂起心跳：Chrome 系长时间朗读会自行 paused ---------- */
  function keepAliveStart() {
    if (keepTimer || !synth) return;
    keepTimer = setInterval(function () {
      try {
        if (synth.speaking && synth.paused) synth.resume();
        else if (synth.pending === false && synth.speaking === false) keepAliveStop();
      } catch (e) {}
    }, 8000);
  }
  function keepAliveStop() {
    if (keepTimer) { clearInterval(keepTimer); keepTimer = null; }
  }

  /* ---------- TTS 朗读，resolve(true=成功/正常停止 false=不可用) ---------- */
  function ttsSpeak(text, langPrefix, rate, attempt) {
    attempt = attempt || 0;
    var myGen = speakGen;
    return ensureVoice(langPrefix).then(function (hasVoice) {
      if (!hasVoice) return false;
      return new Promise(function (resolve) {
        // cancel 后留 90ms 缓冲，防止新 utterance 被浏览器连坐
        var delay = Math.max(0, 90 - (Date.now() - lastCancelAt));
        setTimeout(function () {
          if (myGen !== speakGen) return resolve(true); // 已被 stop，静默退出
          var v = pickVoice(langPrefix);
          if (!v) return resolve(false);

          var u = new SpeechSynthesisUtterance(text);
          u.voice = v;
          u.lang = v.lang;
          u.rate = rate;
          u.volume = 1;

          var done = false;
          var timer = null;
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
            if (myGen !== speakGen) return finish(true); // 主动 stop 引发的中断
            var err = e && e.error;
            // 取消/打断属于正常流程
            if (err === 'interrupted' || err === 'canceled') return finish(true);
            // 网络/引擎抖动：重试一次
            if (attempt === 0 && (!err || err === 'network' || err === 'synthesis-failed' || err === 'audio-busy')) {
              finish(true); // 先摘出活动表
              setTimeout(function () {
                if (myGen === speakGen) ttsSpeak(text, langPrefix, rate, 1).then(resolve);
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

  /** 立即停止所有朗读（暂停/切词时调用） */
  function stopAll() {
    speakGen++;                 // 所有在途任务作废
    lastCancelAt = Date.now();
    keepAliveStop();
    if (synth) {
      try { synth.cancel(); } catch (e) {}
    }
    activeFinishes.splice(0).forEach(function (f) { f(true); });
  }

  /* ---------- 有道在线发音（单词 / 短句兜底） ---------- */
  function youdaoSpeak(text) {
    return new Promise(function (resolve) {
      var myGen = speakGen;
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
        audio.onended = audio.onerror = null;
        resolve(ok);
      }
      audio.onended = function () { finish(true); };
      audio.onerror = function () { finish(false); };
      audio.src = url;
      audio.play().then(function () {
        // 部分机型 onended 不稳：播放开始后轮询，结束/被 stop 时收尾
        var t = setInterval(function () {
          if (myGen !== speakGen) { clearInterval(t); finish(true); }
          else if (audio.paused && audio.currentTime > 0 && !audio.ended && audio.readyState >= 2) {
            // 极短音频可能瞬间结束未触发 onended
            clearInterval(t);
            setTimeout(function () { finish(true); }, 200);
          }
        }, 400);
      }).catch(function () { finish(false); });
    });
  }

  /* 可走有道兜底的英文：单词，或 ≤100 字符的常规短句 */
  function youdaoEligible(text) {
    if (/^[a-zA-Z][a-zA-Z'’\-]*$/.test(text)) return true;
    return text.length <= 100 && /^[A-Za-z0-9 ,.'’!?;:()\-]+$/.test(text);
  }

  /* ---------- 对外朗读接口 ---------- */
  var AudioEngine = {
    /** 英文：en 系 TTS → 有道原声 → 任意引擎（中文腔，离线末位兜底） */
    speakEn: function (text, rate) {
      var myGenAtCall = speakGen;
      return whenReady().then(function () {
        return ttsSpeak(text, 'en', rate || 1).then(function (ok) {
          if (ok || myGenAtCall !== speakGen) return ok;
          if (youdaoEligible(text)) {
            return youdaoSpeak(text).then(function (ok2) {
              if (ok2 || myGenAtCall !== speakGen) return ok2;
              return ttsSpeak(text, 'any', rate || 1); // 离线末位：有声胜过无声
            });
          }
          return ttsSpeak(text, 'any', rate || 1);
        });
      });
    },
    /** 中文：仅 TTS，无声卡就静默跳过（文字仍显示） */
    speakZh: function (text, rate) {
      return whenReady().then(function () {
        return ttsSpeak(text, 'zh', rate || 0.95);
      });
    },
    stop: stopAll,
    setAccent: function (a) { accent = a; },
    /** 能力检测：TTS 是否存在、英文/中文语音是否各自就位 */
    capabilities: function () {
      return {
        tts: !!synth,
        enVoice: !!pickVoice('en'),
        zhVoice: !!pickVoice('zh')
      };
    },
    whenReady: whenReady,

    /* ---------- Wake Lock 常亮 ---------- */
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
    }).catch(function () { /* 不支持或被系统拒绝，忽略 */ });
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

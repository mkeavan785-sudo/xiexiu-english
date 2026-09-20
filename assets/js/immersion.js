/* ============================================================
   邪修英语 · 磨耳朵播放器 immersion.js
   单词模式：独立场景词库（IMMERSION），按场景顺序教学、不打乱
     · 英文音→间隔→中文音，逐条顺序；场景末自动进下一场景，全完循环
     · 进度持久化（scene/item），离开再进停在原处
     · 「从头开始」回第一场第一条；「下一组」跳到另一个逻辑场景
   句子模式：内置现场话术 + 我的导入句，每轮乱序
   ============================================================ */
(function () {
  var el = {};
  var mode = 'words';   // words / sentences
  var playing = false;
  var loopToken = 0;
  var waitCancel = null;
  var lastWarnAt = 0;

  /* 失败提示节流：同一轮播放最多 12 秒弹一次，避免刷屏 */
  function warn(msg) {
    var now = Date.now();
    if (now - lastWarnAt > 12000) { lastWarnAt = now; App.notify(msg); }
  }

  // 单词模式进度（含跨场景定位）
  var sIdx = 0, iIdx = 0;
  // 句模式
  var sQueue = [], sPos = 0;

  /* ---------- 工具 ---------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function wait(ms) {
    return new Promise(function (res) {
      waitCancel = res;
      setTimeout(res, ms);
    });
  }
  function cancelWait() { if (waitCancel) { waitCancel(); waitCancel = null; } }

  function scenes() { return window.IMMERSION.scenes; }
  function curItem() { return scenes()[sIdx].items[iIdx]; }

  /* ---------- 进度持久化 ---------- */
  function savePos() {
    Store.get().immWords = { scene: sIdx, item: iIdx };
    Store.save();
  }
  function loadPos() {
    var p = Store.get().immWords;
    if (p && typeof p.scene === 'number' && scenes()[p.scene]) {
      sIdx = p.scene;
      var max = scenes()[sIdx].items.length - 1;
      iIdx = Math.min(Math.max(p.item || 0, 0), max);
    }
  }

  function nextItem() {
    iIdx++;
    if (iIdx >= scenes()[sIdx].items.length) {
      iIdx = 0;
      sIdx++;
      if (sIdx >= scenes().length) sIdx = 0; // 全完一轮：回第一场
    }
    savePos();
  }
  function prevItem() {
    iIdx--;
    if (iIdx < 0) {
      sIdx = (sIdx - 1 + scenes().length) % scenes().length;
      iIdx = scenes()[sIdx].items.length - 1;
    }
    savePos();
  }

  /* ---------- 句模式队列 ---------- */
  function rebuildSentences() {
    sQueue = shuffle(window.SENTENCES.list.concat(Store.get().mySentences || []));
    sPos = 0;
  }

  /* ---------- 舞台显示 ---------- */
  function showWord() {
    var it = curItem();
    var sc = scenes()[sIdx];
    el.stage.classList.remove('is-sentence');
    el.en.textContent = it.w;
    el.ipa.textContent = '场景 ' + (sIdx + 1) + '/' + scenes().length + ' · ' + sc.name;
    el.zh.textContent = it.zh;
    el.progress.textContent = '本组 ' + (iIdx + 1) + '/' + sc.items.length;
    el.sceneLabel.textContent = sc.name;
    AudioEngine.setMediaInfo(it.w, '磨耳朵 · ' + sc.name);
    // 打开页面/切词即静默预热当前条音频（后台写缓存，不打扰界面），点播放秒响
    AudioEngine.preload('en', it.w);
    AudioEngine.preload('zh', it.zh);
  }
  function showSentence() {
    var item = sQueue[sPos];
    if (!item) return;
    el.stage.classList.add('is-sentence');
    el.en.textContent = item.en;
    var sc = SENTENCES.scenes.filter(function (s) { return s.key === item.sc; })[0];
    el.ipa.textContent = item.sc && sc ? '【' + sc.name + '】' : '【我的句子】';
    el.zh.textContent = item.zh || '';
    el.progress.textContent = (sPos + 1) + ' / ' + sQueue.length;
    AudioEngine.setMediaInfo(item.en, '话术 · ' + (sc ? sc.name : '我的句子'));
    AudioEngine.preload('en', item.en);
    AudioEngine.preload('zh', item.zh || '');
  }
  function show() { mode === 'words' ? showWord() : showSentence(); }

  /* ---------- 播放主循环 ---------- */
  function loop(token) {
    return Promise.resolve().then(function again() {
      if (!playing || token !== loopToken) return;
      var s = Store.settings();

      if (mode === 'words') {
        var it = curItem();
        showWord();
        return AudioEngine.speakEn(it.w, s.rate).then(function (ok) {
          if (!playing || token !== loopToken) return;
          if (!ok) warn('当前环境无法发音：系统语音不可用，在线发音也失败，请检查网络或系统语音。');
          // 英文播完的间隙预热：当前中文 + 下一条英文，循环无缝
          AudioEngine.preload('zh', it.zh);
          var sc = scenes()[sIdx];
          var nx = sc.items[(iIdx + 1) % sc.items.length];
          if (nx) AudioEngine.preload('en', nx.w);
          return wait(s.gap);
        }).then(function () {
          if (!playing || token !== loopToken) return;
          return AudioEngine.speakZh(it.zh, 0.95);
        }).then(function () {
          if (!playing || token !== loopToken) return;
          Store.get().stats.listenWords++;
          return wait(Math.min(800, s.gap));
        }).then(function () {
          if (!playing || token !== loopToken) return;
          nextItem();
          return again();
        });
      }

      /* 句模式：中文 → 停顿 → 英文 × N */
      var item = sQueue[sPos];
      showSentence();
      return AudioEngine.speakZh(item.zh || '', 0.95).then(function () {
        if (!playing || token !== loopToken) return;
        return wait(s.gap);
      }).then(function () {
        if (!playing || token !== loopToken) return;
        // 中文播完的间隙预热下一句英文
        var nx = sQueue[(sPos + 1) % sQueue.length];
        if (nx) AudioEngine.preload('en', nx.en);
        var reps = s.enRepeat || 1;
        var chain = Promise.resolve();
        for (var i = 0; i < reps; i++) {
          (function (n) {
            chain = chain.then(function () {
              if (!playing || token !== loopToken) return;
              return AudioEngine.speakEn(item.en, s.rate).then(function (ok) {
                if (!ok) warn('英文朗读不可用：系统语音缺失，在线发音也失败，请检查网络或系统语音。');
                if (n < reps - 1) return wait(600);
              });
            });
          })(i);
        }
        return chain;
      }).then(function () {
        if (!playing || token !== loopToken) return;
        Store.get().stats.listenWords++;
        sPos++;
        if (sPos >= sQueue.length) { rebuildSentences(); sPos = 0; }
        return wait(Math.min(900, s.gap));
      }).then(function () {
        if (!playing || token !== loopToken) return;
        return again();
      });
    });
  }

  /* ---------- 控制 ---------- */
  function hardStop() {
    playing = false;
    loopToken++;
    cancelWait();
    AudioEngine.stop();
    AudioEngine.wake.setWant(false);
  }

  function start() {
    if (playing) return;
    var cap = AudioEngine.capabilities();
    // 英文有在线原声兜底，只在"无引擎且离线"时才拒绝启动
    if (!cap.tts && !navigator.onLine) {
      App.notify('发音不可用：本机没有语音引擎且当前离线。');
      return;
    }
    // 开启自动联播前，首次询问是否后台播放（每会话最多一次，已开常亮不打扰）
    if (!Store.settings().wakeLock && !sessionStorage.getItem('xx_bg_asked')) {
      var panel = document.getElementById('bg-ask');
      if (panel && !panel.classList.contains('hidden')) return;
      if (panel) {
        panel.classList.remove('hidden');
        return;   // 等用户选择后再真正开始
      }
    }
    beginPlay();
  }

  /** 后台播放询问面板的落点：真正开始循环 */
  function beginPlay() {
    if (playing) return;
    playing = true;
    var token = ++loopToken;
    AudioEngine.wake.setWant(!!Store.settings().wakeLock);
    renderPlayBtn();
    loop(token);
  }

  /** 后台播放询问面板（index.html 静态节点，此处绑定） */
  function initBgAsk() {
    var panel = document.getElementById('bg-ask');
    if (!panel) return;
    panel.querySelector('#bg-ask-yes').addEventListener('click', function () {
      sessionStorage.setItem('xx_bg_asked', '1');
      Store.settings({ wakeLock: true });
      var cb = document.getElementById('opt-wake');
      if (cb) cb.checked = true;
      panel.classList.add('hidden');
      beginPlay();
    });
    panel.querySelector('#bg-ask-no').addEventListener('click', function () {
      sessionStorage.setItem('xx_bg_asked', '1');
      panel.classList.add('hidden');
      beginPlay();
    });
  }

  function pause() {
    if (!playing) return;
    hardStop();
    Store.save();
    renderPlayBtn();
  }

  /* 单词模式：上/下一条（带记忆）；句模式：上/下一句 */
  function jump(delta) {
    var wasPlaying = playing;
    hardStop();
    if (mode === 'words') {
      delta < 0 ? prevItem() : nextItem();
    } else {
      if (!sQueue.length) rebuildSentences();
      sPos = (sPos + delta + sQueue.length) % sQueue.length;
    }
    show();
    if (wasPlaying) { playing = true; var token = ++loopToken; loop(token); }
    renderPlayBtn();
  }

  function replay() {
    hardStop();
    show();
    playing = true; var token = ++loopToken; loop(token);
    renderPlayBtn();
  }

  /* 从头开始：回第一场第一条 */
  function restart() {
    hardStop();
    sIdx = 0; iIdx = 0;
    savePos();
    show();
    playing = true; var token = ++loopToken; loop(token);
    renderPlayBtn();
  }

  /* 下一组：跳到下一场景开头 */
  function nextGroup() {
    hardStop();
    sIdx = (sIdx + 1) % scenes().length;
    iIdx = 0;
    savePos();
    show();
    playing = true; var token = ++loopToken; loop(token);
    renderPlayBtn();
    App.notify('下一场景：' + scenes()[sIdx].name, 1800);
  }

  function switchMode(next) {
    if (next === mode) return;
    hardStop();
    mode = next;
    document.querySelectorAll('.mode-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
    el.sceneBar.classList.toggle('hidden', mode !== 'words');
    el.restartBtn.classList.toggle('hidden', mode !== 'words');
    el.wrapRepeat.classList.toggle('hidden', mode !== 'sentences');
    if (mode === 'sentences' && !sQueue.length) rebuildSentences();
    show();
    renderPlayBtn();
  }

  function renderPlayBtn() {
    el.play.textContent = playing ? '⏸ 暂停' : '▶ 播放';
    el.play.classList.toggle('playing', playing);
  }

  /* ---------- 初始化 ---------- */
  function init() {
    el = {
      stage: document.getElementById('word-stage'),
      en: document.getElementById('p-en'),
      ipa: document.getElementById('p-ipa'),
      zh: document.getElementById('p-zh'),
      progress: document.getElementById('p-progress'),
      sceneLabel: document.getElementById('scene-label'),
      sceneBar: document.getElementById('scene-bar'),
      nextGroup: document.getElementById('p-nextgroup'),
      restartBtn: document.getElementById('p-restart'),
      replay: document.getElementById('p-replay'),
      play: document.getElementById('p-play'),
      prev: document.getElementById('p-prev'),
      next: document.getElementById('p-next'),
      rate: document.getElementById('opt-rate'),
      gap: document.getElementById('opt-gap'),
      wake: document.getElementById('opt-wake'),
      wrapRepeat: document.getElementById('wrap-enrepeat'),
      enrepeat: document.getElementById('opt-enrepeat')
    };

    var s = Store.settings();
    el.rate.value = String(s.rate);
    el.gap.value = String(s.gap);
    el.wake.checked = !!s.wakeLock;
    el.enrepeat.value = String(s.enRepeat || 2);

    initBgAsk();
    loadPos();
    show();
    renderPlayBtn();

    el.play.addEventListener('click', function () { playing ? pause() : start(); });
    el.prev.addEventListener('click', function () { jump(-1); });
    el.next.addEventListener('click', function () { jump(1); });
    el.replay.addEventListener('click', replay);
    el.restartBtn.addEventListener('click', restart);
    el.nextGroup.addEventListener('click', nextGroup);

    document.querySelectorAll('.mode-btn').forEach(function (b) {
      b.addEventListener('click', function () { switchMode(b.dataset.mode); });
    });

    el.rate.addEventListener('change', function () { Store.settings({ rate: parseFloat(el.rate.value) }); });
    el.gap.addEventListener('change', function () { Store.settings({ gap: parseInt(el.gap.value, 10) }); });
    el.enrepeat.addEventListener('change', function () { Store.settings({ enRepeat: parseInt(el.enrepeat.value, 10) }); });
    el.wake.addEventListener('change', function () {
      Store.settings({ wakeLock: el.wake.checked });
      if (playing) AudioEngine.wake.setWant(el.wake.checked);
    });

    AudioEngine.whenReady().then(function () {
      var cap = AudioEngine.capabilities();
      // 本地 MP3 是主力（覆盖全部词库），仅当本地清单为空且无英文引擎时才提示
      if (cap.tts && !cap.enVoice && !cap.localEn) {
        App.notify('本机无英文语音，英文将使用在线原声（需联网）；可在系统设置安装英语语音包离线使用。', 6000);
      }
    });
  }

  /* 句库变化后（M4 导入句子），暂停态重建句队列 */
  function refreshPool() {
    if (!playing && mode === 'sentences') {
      sPos = 0;
      rebuildSentences();
      show();
    }
  }

  window.Immersion = {
    init: init, pause: pause, isPlaying: function () { return playing; },
    refreshPool: refreshPool
  };
})();

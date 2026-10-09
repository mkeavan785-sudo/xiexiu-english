/* ============================================================
   邪修英语 · 自然拼读 phonics.js（原 drill.js 重写）
   v3：去掉每日任务/轮转/抽词，改为随时可听的两块：
   上块 · 拼读速听（BLENDS）：2/3字母组合清单（单字母已移除），
          每条 = 逐字母名(带停顿)→组合音两遍，音频内嵌两轮；▶全部连播
   下块 · 组合与单词（PHONICS 6阶段41组折叠区）：
          组头展开 → 包含该组合的单词，点词本身发音，
          单词中的目标组合字母块异色显示；右上角 ▶ 一键连播
   ============================================================ */
(function () {
  var el = {};
  var speakToken = 0;      // 连播代际令牌
  var chainRunning = false;

  /* ---------- 工具 ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function stopSpeak() { speakToken++; AudioEngine.stop(); }

  function speak(text) {
    stopSpeak();
    var token = speakToken;
    AudioEngine.speakEn(text, Store.settings().rate).then(function (ok) {
      if (!ok && token === speakToken) App.notify('发音不可用，请检查网络。');
    });
  }

  /* ---------- 异色高亮：在 word 中高亮组合字母块 ---------- */
  function highlightCombo(word, combos) {
    var w = String(word);
    var lower = w.toLowerCase();
    var hit = null;
    (combos || []).forEach(function (c) {
      if (hit) return;
      if (!c) return;
      if (c.indexOf('_') >= 0) {
        // Magic E 型：a_e → a+任意单字母+e
        var reStr = '^';
        for (var i = 0; i < c.length; i++) {
          reStr += (c[i] === '_') ? '[a-z]' : c[i];
        }
        reStr += '$';
        if (new RegExp(reStr).test(lower)) {
          // 标出元音与词尾e
          var vi = c.indexOf('_');
          hit = { start: vi, end: vi + 1, tail: w.length - 1 };
        }
        return;
      }
      var idx = lower.indexOf(c);
      if (idx >= 0) hit = { start: idx, end: idx + c.length };
    });
    if (!hit) return escapeHtml(w);
    return escapeHtml(w.slice(0, hit.start)) +
      '<span class="hl-word">' + escapeHtml(w.slice(hit.start, hit.end)) + '</span>' +
      escapeHtml(w.slice(hit.end));
  }

  /* 从组的 title/pattern 提取目标字母块（小写数组） */
  var comboCache = {};
  function combosOf(g) {
    if (comboCache[g.id]) return comboCache[g.id];
    var src = (g.title + ' ' + (g.pattern || '')).toLowerCase();
    var arr = src.match(/[a-z][a-z_]{1,3}/g) || [];
    // 过滤说明词（如 "magic"、"如"拼不出）——保留纯字母块
    arr = arr.filter(function (s) { return s.length >= 2; });
    comboCache[g.id] = arr;
    return arr;
  }

  /* ---------- 上块 · 拼读速听 ---------- */
  function renderBlends() {
    var box = el.blList;
    box.innerHTML = '';
    BLENDS.list.forEach(function (b) {
      var row = document.createElement('div');
      row.className = 'bl-row';
      var inner =
        '<div class="bl-main">' +
          '<span class="bl-letters">' + escapeHtml(b.c) + '</span>' +
          '<span class="bl-word">' + escapeHtml(b.word) + '</span>' +
          '<span class="bl-zh">' + escapeHtml(b.zh) + '</span>' +
        '</div>';
      // 组合 ↔ 自然发音搭配（有独立音素的组合才显示）
      if (b.sound) inner += '<div class="bl-sound">' + escapeHtml(b.sound) + '</div>';
      row.innerHTML = inner;
      row.addEventListener('click', function () { speak(b.say); });
      box.appendChild(row);
    });
  }

  /* 上块全部连播 */
  function playAllBlends() {
    stopSpeak();
    var token = ++speakToken;
    var i = 0;
    el.blPlay.textContent = '⏸ 连播中';
    function next() {
      if (token !== speakToken) { el.blPlay.textContent = '▶ 全部连播'; return; }
      if (i >= BLENDS.list.length) { el.blPlay.textContent = '▶ 全部连播'; return; }
      var b = BLENDS.list[i++];
      el.blList.querySelectorAll('.bl-row')[i - 1].classList.add('speaking');
      AudioEngine.speakEn(b.say, Store.settings().rate).then(function () {
        var row = el.blList.querySelectorAll('.bl-row')[i - 1];
        if (row) row.classList.remove('speaking');
        next();
      });
    }
    next();
  }

  /* ---------- 下块 · 组合与单词折叠 ---------- */
  function renderGroups() {
    var box = el.drList;
    box.innerHTML = '';

    PHONICS.stages.forEach(function (st) {
      var stageHead = document.createElement('div');
      stageHead.className = 'stage-head';
      stageHead.textContent = '阶段' + st.id + ' · ' + st.name;
      box.appendChild(stageHead);

      st.groups.forEach(function (g) {
        var open = false;
        var item = document.createElement('div');
        item.className = 'root-item';

        var words = g.words || [];
        var head = document.createElement('button');
        head.className = 'root-head';
        head.innerHTML =
          '<span class="root-arrow">▸</span>' +
          '<span class="root-key">' + escapeHtml(g.title) + '</span>' +
          '<span class="root-mean">' + escapeHtml(g.pattern || '') + '</span>' +
          '<span class="root-meta">' + words.length + '词</span>';
        head.addEventListener('click', function () {
          open = !open;
          head.querySelector('.root-arrow').textContent = open ? '▾' : '▸';
          body.classList.toggle('hidden', !open);
        });
        item.appendChild(head);

        var body = document.createElement('div');
        body.className = 'root-body hidden';
        var combos = combosOf(g);
        words.forEach(function (w) {
          var row = document.createElement('div');
          row.className = 'root-word';
          row.innerHTML =
            '<span class="rw-main">' + highlightCombo(w.w, combos) + '</span>' +
            '<span class="rw-zh">' + escapeHtml(w.zh || '') + '</span>';
          row.addEventListener('click', function () { speak(w.w); });
          body.appendChild(row);
        });
        item.appendChild(body);
        box.appendChild(item);
      });
    });
  }

  /* 下块一键连播：所有组的所有单词（含组合两遍？——单词只读一遍，连续流） */
  function playAllWords() {
    stopSpeak();
    var token = ++speakToken;
    var queue = [];
    PHONICS.stages.forEach(function (st) {
      st.groups.forEach(function (g) {
        (g.words || []).forEach(function (w) { queue.push(w.w); });
      });
    });
    var i = 0;
    el.gpPlay.textContent = '⏸ 连播中';
    function next() {
      if (token !== speakToken) { el.gpPlay.textContent = '▶ 一键连播'; return; }
      if (i >= queue.length) { el.gpPlay.textContent = '▶ 一键连播'; return; }
      var w = queue[i++];
      AudioEngine.speakEn(w, Store.settings().rate).then(function () { next(); });
    }
    next();
  }

  function init() {
    el = {
      blList: document.getElementById('bl-list'),
      blPlay: document.getElementById('bl-play'),
      drList: document.getElementById('dr-list'),
      gpPlay: document.getElementById('gp-play')
    };

    renderBlends();
    renderGroups();

    el.blPlay.addEventListener('click', playAllBlends);
    el.gpPlay.addEventListener('click', playAllWords);
  }

  function stop() {
    speakToken++;
    AudioEngine.stop();
    if (el.blPlay) el.blPlay.textContent = '▶ 全部连播';
    if (el.gpPlay) el.gpPlay.textContent = '▶ 一键连播';
  }

  window.Drill = { init: init, stop: stop };
})();

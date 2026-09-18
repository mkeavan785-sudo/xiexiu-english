/* ============================================================
   邪修英语 · 熟读 drill.js
   规则：7 阶段每日轮转（epochDay % 7 → 阶段1-7）
        每组当天用日期种子随机抽 3 词，当天重开看到同样三词
        优先抽最近 2 天没出现过的词；完成今日全部组即展示完成态
   ============================================================ */
(function () {
  var el = {};
  var stageId = 0;        // 当前查看/练习的阶段
  var groupIdx = 0;       // 组在阶段内的序号
  var viewing = false;    // 完成后回看模式（只浏览，不动进度）
  var speakToken = 0;

  /* ---------- 日期工具（本地时区） ---------- */
  function dateStr(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }
  function epochDay() {
    var d = new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  }
  var TODAY = dateStr(new Date());
  var TODAY_STAGE = (epochDay() % 7) + 1; // 1..7

  /* ---------- 随机：日期+组ID 做种子（当天结果固定） ---------- */
  function hashStr(s) {
    var h = 1779033703;
    for (var i = 0; i < s.length; i++) {
      h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return h >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- 数据快捷方式 ---------- */
  function stages() {
    var include0 = Store.settings().lettersStage;
    return PHONICS.stages.filter(function (st) { return include0 || st.id !== 0; });
  }
  function stage(id) {
    return PHONICS.stages.filter(function (s) { return s.id === id; })[0];
  }

  /* ---------- 每日抽词（3 个，防前两天重复，当天固定） ---------- */
  function ensureDrillStore() {
    var d = Store.get().drill || {};
    if (!d.drawn) d.drawn = {};
    if (!d.done) d.done = {};
    if (!d.recent) d.recent = {};
    Store.get().drill = d;
    return d;
  }

  function drawWords(group) {
    var d = ensureDrillStore();
    if (!d.drawn[TODAY]) d.drawn[TODAY] = {};
    if (d.drawn[TODAY][group.id]) return d.drawn[TODAY][group.id];

    var pool = group.words.slice();
    var day = epochDay();
    // 优先池：最近 2 天没出现过
    var fresh = pool.filter(function (w) {
      var last = d.recent[w.w];
      return last === undefined || (day - last) > 2;
    });
    var pickFrom = fresh.length >= 3 ? fresh : pool;

    var rnd = mulberry32(hashStr(TODAY + '|' + group.id));
    for (var i = pickFrom.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = pickFrom[i]; pickFrom[i] = pickFrom[j]; pickFrom[j] = t;
    }
    var picked = pickFrom.slice(0, 3);
    picked.forEach(function (w) { d.recent[w.w] = day; });
    // 清理 14 天前的 recent，控制存储体积
    Object.keys(d.recent).forEach(function (k) {
      if (day - d.recent[k] > 14) delete d.recent[k];
    });
    d.drawn[TODAY][group.id] = picked;
    Store.save();
    return picked;
  }

  /* ---------- 打卡 ---------- */
  function doneList() {
    var d = ensureDrillStore();
    return d.done[TODAY] || (d.done[TODAY] = []);
  }
  function isDone(groupId) { return doneList().indexOf(groupId) >= 0; }

  function todayComplete() {
    return stage(TODAY_STAGE).groups.every(function (g) { return isDone(g.id); });
  }

  /* ---------- 渲染 ---------- */
  function renderHead() {
    el.day.textContent = TODAY_STAGE;
    var st = stage(TODAY_STAGE);
    el.stageName.textContent = '今日：阶段' + st.id + ' · ' + st.name;
    var total = st.groups.length;
    var doneN = doneList().length;
    el.groupProgress.textContent = Math.min(doneN, total) + ' / ' + total + ' 组';
    el.bar.style.width = Math.round(doneN / total * 100) + '%';
  }

  function renderChips() {
    el.chips.innerHTML = '';
    stages().filter(function (s) { return s.id !== 0; }).forEach(function (s) {
      var b = document.createElement('button');
      b.className = 'stage-chip';
      if (s.id === stageId) b.classList.add('active');
      if (s.id === TODAY_STAGE) b.classList.add('today');
      b.textContent = (s.id === TODAY_STAGE ? '今日·' : '') + s.id + ' ' + s.name;
      b.addEventListener('click', function () { selectStage(s.id); });
      el.chips.appendChild(b);
    });
  }

  function renderGroup() {
    var st = stage(stageId);
    var g = st.groups[groupIdx];
    var words = drawWords(g);
    // 组卡出现即预热整组发音，点读/连读不等网络
    words.forEach(function (w) { AudioEngine.preload('en', w.w); });

    el.groupTitle.textContent = '第 ' + (groupIdx + 1) + ' 组 · ' + g.title;
    el.pattern.textContent = g.pattern;
    el.tip.textContent = g.tip;

    el.words.innerHTML = '';
    words.forEach(function (w) {
      var card = document.createElement('div');
      card.className = 'dr-word';
      card.innerHTML =
        '<div class="dr-word-main">' + w.w + '</div>' +
        '<div class="dr-word-ipa">' + (w.ipa || '') + '</div>' +
        '<div class="dr-word-zh">' + (w.zh || '') + '</div>' +
        '<button class="dr-word-sound" aria-label="朗读">🔊</button>';
      card.querySelector('.dr-word-sound').addEventListener('click', function () {
        speakOne(w.w);
      });
      el.words.appendChild(card);
    });

    // 下一组按钮文案
    var isTodayStage = (stageId === TODAY_STAGE);
    var last = groupIdx >= st.groups.length - 1;
    if (isTodayStage && !viewing && last) {
      el.nextBtn.textContent = '今日最后一组，读完打卡 🎉';
    } else if (last) {
      el.nextBtn.textContent = '已是本阶段最后一组 ↑';
    } else {
      el.nextBtn.textContent = '读完了，下一组 →';
    }

    // 今日已完成 → 完成态优先
    if (todayComplete() && stageId === TODAY_STAGE && !viewing) {
      showDone();
    } else {
      el.card.classList.remove('hidden');
      el.doneBox.classList.add('hidden');
    }
  }

  function showDone() {
    el.card.classList.add('hidden');
    el.doneBox.classList.remove('hidden');
    el.doneTitle.textContent = '今日熟读完成';
    var nextId = (TODAY_STAGE % 7) + 1;
    el.doneSub.textContent = '明天进入：阶段' + nextId + ' · ' + stage(nextId).name;
  }

  function selectStage(id) {
    stopSpeak();
    stageId = id;
    groupIdx = 0;
    viewing = false;
    renderChips();
    renderGroup();
  }

  /* ---------- 发音 ---------- */
  function stopSpeak() { speakToken++; AudioEngine.stop(); }
  function speakOne(text) {
    stopSpeak();
    var token = speakToken;
    AudioEngine.speakEn(text, Store.settings().rate).then(function (ok) {
      if (!ok && token === speakToken) App.notify('发音不可用，请检查系统语音或网络。');
    });
  }
  function readAll() {
    stopSpeak();
    var token = ++speakToken;
    var st = stage(stageId);
    var words = drawWords(st.groups[groupIdx]);
    var chain = Promise.resolve();
    words.forEach(function (w, i) {
      chain = chain.then(function () {
        if (token !== speakToken) return;
        return AudioEngine.speakEn(w.w, Store.settings().rate).then(function (ok) {
          if (!ok && i === 0 && token === speakToken) {
            App.notify('发音不可用，请检查系统语音或网络。');
          }
          if (i < words.length - 1) return new Promise(function (r) { setTimeout(r, 500); });
        });
      });
    });
  }

  /* ---------- 下一组 ---------- */
  function next() {
    stopSpeak();
    var st = stage(stageId);
    // 今日阶段且非回看：记录完成
    if (stageId === TODAY_STAGE && !viewing) {
      var g = st.groups[groupIdx];
      if (!isDone(g.id)) doneList().push(g.id);
      if (todayComplete()) {
        renderHead();
        renderChips();
        showDone();
        return;
      }
    }
    if (groupIdx < st.groups.length - 1) groupIdx++;
    renderHead();
    renderGroup();
  }

  function review() {
    stopSpeak();
    viewing = true;
    stageId = TODAY_STAGE;
    groupIdx = 0;
    renderChips();
    el.doneBox.classList.add('hidden');
    el.card.classList.remove('hidden');
    renderGroup();
  }

  /* ---------- 初始化 ---------- */
  function init() {
    el = {
      day: document.getElementById('dr-day'),
      stageName: document.getElementById('dr-stage-name'),
      bar: document.getElementById('dr-bar'),
      groupProgress: document.getElementById('dr-group-progress'),
      chips: document.getElementById('dr-stage-chips'),
      card: document.getElementById('dr-card'),
      groupTitle: document.getElementById('dr-group-title'),
      pattern: document.getElementById('dr-pattern'),
      tip: document.getElementById('dr-tip'),
      words: document.getElementById('dr-words'),
      readall: document.getElementById('dr-readall'),
      nextBtn: document.getElementById('dr-next'),
      doneBox: document.getElementById('dr-done'),
      doneTitle: document.getElementById('dr-done-title'),
      doneSub: document.getElementById('dr-done-sub'),
      reviewBtn: document.getElementById('dr-review')
    };
    stageId = TODAY_STAGE;
    ensureDrillStore();
    // 清理 7 天前的 drawn（只保留当天即可）
    var d = Store.get().drill;
    Object.keys(d.drawn).forEach(function (k) { if (k !== TODAY) delete d.drawn[k]; });
    Object.keys(d.done).forEach(function (k) { if (k !== TODAY) delete d.done[k]; });

    renderHead();
    renderChips();
    renderGroup();

    el.readall.addEventListener('click', readAll);
    el.nextBtn.addEventListener('click', next);
    el.reviewBtn.addEventListener('click', review);
  }

  window.Drill = { init: init, stop: stopSpeak };
})();

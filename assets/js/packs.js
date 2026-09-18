/* ============================================================
   邪修英语 · 音频分包 packs.js
   运行时从词库/句库/拼读/词根数据构建补充包清单：
     w0..w13  磨耳朵场景包（英+中）
     s0..s5   现场话术包（英+中）
     d0..d7   熟读阶段包（英）
     r0       词根库包（英）
   进入页面只自动加载「首包」：单词当前场景 + 话术第一组，
   其余包在「我的 → 音频补充包」点击后加载（Cache Storage 持久缓存）。
   已加载状态记 localStorage（键=包id，值=条数；条数变化视为有更新）。
   ============================================================ */
(function () {
  var KEY = 'xx_packs_v1';

  function state() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveState(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  /* ---------- 构建包清单 ---------- */
  function flat(items) {
    // [{lang,text}...] → 过滤清单外词条（自定义句无预置音频）
    return items.filter(function (it) {
      return it.text && AudioEngine.urlOf(it.lang, it.text);
    });
  }
  function build() {
    var packs = [];
    (window.IMMERSION ? IMMERSION.scenes : []).forEach(function (sc, i) {
      var items = [];
      sc.items.forEach(function (it) {
        items.push({ lang: 'en', text: it.w });
        items.push({ lang: 'zh', text: it.zh });
      });
      packs.push({ id: 'w' + i, name: '磨耳朵 · ' + sc.name, kind: 'words', items: flat(items) });
    });
    (window.SENTENCES ? SENTENCES.scenes : []).forEach(function (sc, i) {
      var items = [];
      SENTENCES.list.forEach(function (it) {
        if (it.sc !== sc.key) return;
        items.push({ lang: 'en', text: it.en });
        items.push({ lang: 'zh', text: it.zh || '' });
      });
      packs.push({ id: 's' + i, name: '话术 · ' + sc.name, kind: 'sent', items: flat(items) });
    });
    (window.PHONICS ? PHONICS.stages : []).forEach(function (st) {
      var items = [];
      st.groups.forEach(function (g) {
        (g.words || []).forEach(function (w) { items.push({ lang: 'en', text: w.w }); });
      });
      packs.push({ id: 'd' + st.id, name: '熟读 · 阶段' + st.id + ' ' + st.name, kind: 'drill', items: flat(items) });
    });
    if (window.ROOTS) {
      var items = [];
      ROOTS.list.forEach(function (r) {
        (r.w || []).forEach(function (it) { items.push({ lang: 'en', text: it[0] }); });
      });
      packs.push({ id: 'r0', name: '词根库全部例词', kind: 'roots', items: flat(items) });
    }
    return packs;
  }

  var packs = build();

  /* ---------- 对外接口 ---------- */
  window.AudioPacks = {
    all: function () { return packs; },
    get: function (id) { return packs.filter(function (p) { return p.id === id; })[0]; },

    /** 首包：单词当前进度场景 + 话术第一组（进入页面自动加载） */
    firstIds: function () {
      var wId = 'w0';
      try {
        var p = Store.get().immWords;
        if (p && typeof p.scene === 'number' && packs.some(function (x) { return x.id === 'w' + p.scene; })) {
          wId = 'w' + p.scene;
        }
      } catch (e) {}
      return [wId, 's0'];
    },

    /** 包内全部音频 URL */
    urls: function (pack) {
      return pack.items.map(function (it) { return AudioEngine.urlOf(it.lang, it.text); })
        .filter(function (u) { return !!u; });
    },

    /** 状态：cached 已缓存 / outdated 有更新 / none 未加载 */
    status: function (pack) {
      var n = state()[pack.id];
      if (!n) return 'none';
      return n === pack.items.length ? 'cached' : 'outdated';
    },
    markDone: function (packId) {
      var p = this.get(packId);
      if (!p) return;
      var s = state();
      s[packId] = p.items.length;
      saveState(s);
    },
    loadedCount: function () {
      var s = state(), n = 0;
      packs.forEach(function (p) { if (s[p.id]) n++; });
      return n;
    }
  };
})();

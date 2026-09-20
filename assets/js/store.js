/* ============================================================
   邪修英语 · 本地存储 store.js
   单键 xx_en_v1；结构性操作立即保存；提供导入导出（M4 用）
   ============================================================ */
(function () {
  var KEY = 'xx_en_v1';

  var DEFAULTS = {
    settings: {
      rate: 1,           // 语速
      gap: 1500,         // 中英之间停顿 ms
      enRepeat: 2,       // 句模式英文连读次数
      wakeLock: true,    // 磨耳朵常亮
      lettersStage: false,// 熟读是否包含阶段0字母（M2）
      volume: 1,         // 全局发音音量 0~1（右上角音量按钮）
    },
    drill: {},           // {date, stageId, done/drawn/recent}
    immWords: {scene: 0, item: 0}, // 磨耳朵单词场景进度（跨会话记忆）
    fed: [],             // 历史字段（v1.1前词根喂养，已停用，保留兼容）
    myWords: [],         // 历史字段（单词外部导入已停用，保留兼容）
    mySentences: [],     // 自定义句子（配音稿/话术导入）
    stats: { listenWords: 0, listenMs: 0 }  // 打卡字段已随功能移除（旧数据残留无害）
  };

  var state = null;

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : {};
    } catch (e) {
      state = {};
    }
    // 合并默认值（浅合并两层，新老版本字段兼容）
    state = merge(DEFAULTS, state);
    // 清理已撤销的补充包按包记录（缓存改为全静默预热）
    try { localStorage.removeItem('xx_packs_v1'); } catch (e) {}
  }

  function merge(base, over) {
    var out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
    if (over && typeof over === 'object') {
      Object.keys(over).forEach(function (k) {
        if (base && typeof base[k] === 'object' && !Array.isArray(base[k]) &&
            over[k] && typeof over[k] === 'object') {
          out[k] = merge(base[k], over[k]);
        } else {
          out[k] = over[k];
        }
      });
    }
    return out;
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* 隐私模式/配额满时静默，M4 做显式提示 */ }
  }

  load();

  window.Store = {
    get: function () { return state; },
    settings: function (patch) {
      if (patch) { Object.assign(state.settings, patch); save(); }
      return state.settings;
    },
    save: save,
    /** 导出全量 JSON（M4） */
    exportJSON: function () { return JSON.stringify(state); },
    /** 导入全量 JSON（M4） */
    importJSON: function (str) {
      var data = JSON.parse(str); // 抛错由调用方捕获提示
      state = merge(DEFAULTS, data);
      save();
      return state;
    },
    KEY: KEY
  };
})();

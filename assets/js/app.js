/* ============================================================
   邪修英语 · 应用入口 app.js
   职责：路由（顶/底导航同步高亮）、全局提示横幅、初始化各模块
   ============================================================ */
(function () {
  var banner, bannerText, bannerClose, bannerTimer = null;

  /* ---------- 全局提示横幅（发音降级等） ---------- */
  function notify(msg, ms) {
    if (!banner) return;
    bannerText.textContent = msg;
    banner.classList.remove('hidden');
    clearTimeout(bannerTimer);
    if (ms !== 0) bannerTimer = setTimeout(function () {
      banner.classList.add('hidden');
    }, ms || 5000);
  }

  /* ---------- 全局音量（右上角按钮） ---------- */
  function initVolume() {
    var wrap = document.getElementById('vol-wrap');
    var btn = document.getElementById('vol-btn');
    var pop = document.getElementById('vol-pop');
    var range = document.getElementById('vol-range');
    var val = document.getElementById('vol-val');
    if (!wrap || !btn) return;

    function icon(v) {
      if (v <= 0) return '🔇';
      if (v < 0.45) return '🔈';
      if (v < 0.9) return '🔉';
      return '🔊';
    }
    function apply(v, save) {
      v = Math.max(0, Math.min(1, v));
      AudioEngine.setVolume(v);
      btn.textContent = icon(v);
      if (val) val.textContent = Math.round(v * 100) + '%';
      if (save) Store.settings({ volume: v });
    }

    apply(Store.settings().volume, false);
    range.value = String(Math.round(Store.settings().volume * 100));

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      pop.classList.toggle('hidden');
      if (!pop.classList.contains('hidden')) {
        // 展开时同步当前值
        range.value = String(Math.round(AudioEngine.getVolume() * 100));
        val.textContent = Math.round(AudioEngine.getVolume() * 100) + '%';
      }
    });
    // input：拖动实时生效；change：松手才落盘
    range.addEventListener('input', function () {
      apply(parseInt(range.value, 10) / 100, false);
    });
    range.addEventListener('change', function () {
      apply(parseInt(range.value, 10) / 100, true);
    });
    // 点其他区域收起
    document.addEventListener('click', function (e) {
      if (!pop.classList.contains('hidden') && !wrap.contains(e.target)) {
        pop.classList.add('hidden');
      }
    });
  }

  /* ---------- 路由 ---------- */
  function go(page) {
    // 离开磨耳朵页：暂停播放，避免看不见还在念
    if (page !== 'immersion' && window.Immersion && Immersion.isPlaying()) {
      Immersion.pause();
    }
    // 离开熟读页：停止整组连读
    if (page !== 'drill' && window.Drill && Drill.stop) {
      Drill.stop();
    }
    // 离开词根页：停止单词朗读
    if (page !== 'roots' && window.Roots && Roots.stop) {
      Roots.stop();
    }
    document.querySelectorAll('.page').forEach(function (p) {
      p.classList.toggle('active', p.id === 'page-' + page);
    });
    document.querySelectorAll('.nav-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.page === page);
    });
    window.scrollTo(0, 0);
    if (page === 'mine' && window.My) My.onShow();
  }

  document.addEventListener('DOMContentLoaded', function () {
    banner = document.getElementById('audio-banner');
    bannerText = document.getElementById('audio-banner-text');
    bannerClose = document.getElementById('audio-banner-close');
    bannerClose.addEventListener('click', function () {
      banner.classList.add('hidden');
    });

    // 顶/底导航所有按钮共用一套路由
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { go(btn.dataset.page); });
    });

    // 模块初始化（发音已固定英音，无需设置）
    initVolume();
    Immersion.init();
    Drill.init();
    Roots.init();
    My.init();
  });

  window.App = { notify: notify, go: go };
})();

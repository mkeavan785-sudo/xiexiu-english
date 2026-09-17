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

    // 设置 → 发音引擎
    AudioEngine.setAccent(Store.settings().accent);

    // 模块初始化
    Immersion.init();
    Drill.init();
    Roots.init();
    My.init();
  });

  window.App = { notify: notify, go: go };
})();

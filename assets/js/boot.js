/* ============================================================
   邪修英语 · 载入页 boot.js
   纯品牌介绍过场：展示介绍栏 2.2 秒后淡出进入主页面。
   音频缓存已改为全静默预热（audio.js preload 后台写入），
   载入页不再等待任何网络资源，展示期与网络无关。
   ============================================================ */
(function () {
  function run() {
    var boot = document.getElementById('boot');
    if (!boot) return;
    var bar = document.getElementById('boot-bar');
    var tip = document.getElementById('boot-tip');

    // 进度条装饰性填满，文案就绪
    requestAnimationFrame(function () {
      if (bar) bar.style.width = '100%';
      if (tip) tip.textContent = '准备就绪';
    });

    setTimeout(function () {
      boot.classList.add('boot-done');   // CSS 淡出（卡片微上移）
      setTimeout(function () { boot.remove(); }, 550);
    }, 2200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

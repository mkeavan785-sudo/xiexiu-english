/* ============================================================
   邪修英语 · 载入页 boot.js
   进入页面只自动加载首包（单词当前场景 + 话术第一组），
   载入页显示进度条；完成或超时（15s）放行，未完部分后台续载。
   无 Cache Storage（file:// 或老内核）时跳过载入页直接进入。
   ============================================================ */
(function () {
  function run() {
    var boot = document.getElementById('boot');
    if (!boot) return;

    // 无缓存能力或离线：不展示首包进度，直接进入
    if (!AudioEngine.cacheReady() || !navigator.onLine) { finish(); return; }

    var bar = document.getElementById('boot-bar');
    var tip = document.getElementById('boot-tip');
    var ids = AudioPacks.firstIds();
    var total = 0, done = 0;

    function update() {
      if (tip) tip.textContent = '正在加载首包音频 ' + done + ' / ' + total;
      if (bar) bar.style.width = total ? Math.round(done / total * 100) + '%' : '0%';
    }
    function onProgress(d, t) { done = d; total = t; update(); }

    function finish(completed) {
      if (boot.classList.contains('boot-done')) return;
      boot.classList.add('boot-done');       // CSS 淡出
      setTimeout(function () { boot.remove(); }, 450);
      if (completed) {
        ids.forEach(function (id) { AudioPacks.markDone(id); });
        if (window.My && My.refreshPacks) My.refreshPacks();
      }
    }

    // 15 秒兜底：未载完也放行（后台继续），不打扰使用
    var timer = setTimeout(function () { finish(false); }, 15000);

    // 首包顺序载入，进度合并展示；全部成功才标记已缓存
    var allOk = true;
    var chain = Promise.resolve();
    ids.forEach(function (id) {
      var pack = AudioPacks.get(id);
      if (!pack) return;
      chain = chain.then(function () {
        return AudioEngine.preloadPack(AudioPacks.urls(pack), onProgress)
          .then(function (r) { if (!r.ok) allOk = false; });
      });
    });
    chain.then(function () { clearTimeout(timer); finish(allOk); })
      .catch(function () { clearTimeout(timer); finish(false); });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

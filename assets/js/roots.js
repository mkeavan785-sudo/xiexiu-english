/* ============================================================
   邪修英语 · 词根库 roots.js
   手风琴展开：词根头 → 词族；每词三级展示：
   单词 + 中文 + 喇叭；下方构词拆解 chips（in- 进入 + stall 放置 + -ation）
   v2：喂养磨耳朵链路已下线（磨耳朵词库独立）
   ============================================================ */
(function () {
  var el = {};
  var kw = '';
  var expanded = {};

  /* ---------- 搜索 ---------- */
  function matchRoot(root) {
    if (!kw) return true;
    var k = kw.toLowerCase();
    if (root.r.toLowerCase().indexOf(k) >= 0) return true;
    if (root.m.indexOf(kw) >= 0) return true;
    for (var i = 0; i < root.w.length; i++) {
      if (root.w[i][0].toLowerCase().indexOf(k) >= 0) return true;
      if (root.w[i][1].indexOf(kw) >= 0) return true;
      if (root.w[i][2] && root.w[i][2].indexOf(kw) >= 0) return true;
    }
    return false;
  }

  function render() {
    el.list.innerHTML = '';
    var shown = 0;
    var totalWords = ROOTS.list.reduce(function (n, r) { return n + r.w.length; }, 0);

    ROOTS.list.forEach(function (root) {
      if (!matchRoot(root)) return;
      shown++;
      var item = document.createElement('div');
      item.className = 'root-item';

      /* 头部 */
      var head = document.createElement('button');
      head.className = 'root-head';
      var indN = root.w.filter(function (it) { return it[3]; }).length;
      head.innerHTML =
        '<span class="root-arrow">' + (expanded[root.r] ? '▾' : '▸') + '</span>' +
        '<span class="root-key">' + root.r + '</span>' +
        '<span class="root-mean">' + root.m + '</span>' +
        '<span class="root-meta">' + root.w.length + '词' +
          (indN ? ' · ⭐' + indN : '') + '</span>';
      head.addEventListener('click', function () {
        expanded[root.r] = !expanded[root.r];
        render();
      });
      item.appendChild(head);

      /* 展开体 */
      if (expanded[root.r] || kw) {
        var body = document.createElement('div');
        body.className = 'root-body';

        root.w.forEach(function (it) {
          var w = it[0], zh = it[1], partsStr = it[2] || '', ind = it[3];
          var wrap = document.createElement('div');
          wrap.className = 'rw-block';

          var row = document.createElement('div');
          row.className = 'root-word';
          row.innerHTML =
            '<span class="rw-star">' + (ind ? '⭐' : '') + '</span>' +
            '<span class="rw-main">' + escapeHtml(w) + '</span>' +
            '<span class="rw-zh">' + escapeHtml(zh) + '</span>' +
            '<button class="rw-sound" aria-label="朗读">🔊</button>';
          row.querySelector('.rw-sound').addEventListener('click', function () {
            AudioEngine.speakEn(w, Store.settings().rate).then(function (ok) {
              if (!ok) App.notify('发音不可用，请检查系统语音或网络。');
            });
          });
          wrap.appendChild(row);

          /* 构词拆解：installation = in-（进入） + stall（放置） + -ation（名词后缀） */
          if (partsStr) {
            var parts = ROOTS.parseParts(partsStr);
            var pBox = document.createElement('div');
            pBox.className = 'rw-parts';
            parts.forEach(function (p, i) {
              if (i > 0) {
                var plus = document.createElement('span');
                plus.className = 'rw-plus';
                plus.textContent = '+';
                pBox.appendChild(plus);
              }
              var chip = document.createElement('span');
              chip.className = 'rw-chip';
              chip.innerHTML = '<b>' + escapeHtml(p.t) + '</b>' +
                (p.m ? '<em>' + escapeHtml(p.m) + '</em>' : '');
              pBox.appendChild(chip);
            });
            wrap.appendChild(pBox);
          }
          body.appendChild(wrap);
        });
        item.appendChild(body);
      }
      el.list.appendChild(item);
    });

    el.empty.classList.toggle('hidden', shown > 0);
    el.count.textContent = '（' + ROOTS.list.length + ' 词根 · ' + totalWords + ' 词）';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function init() {
    el = {
      list: document.getElementById('roots-list'),
      empty: document.getElementById('roots-empty'),
      search: document.getElementById('roots-search'),
      count: document.getElementById('roots-count')
    };

    var t = null;
    el.search.addEventListener('input', function () {
      clearTimeout(t);
      var v = el.search.value.trim();
      t = setTimeout(function () {
        kw = v;
        // 搜索时自动展开匹配项（render 内 kw 条件），清空恢复手动状态
        render();
      }, 180);
    });

    render();
  }

  function stop() { AudioEngine.stop(); }

  window.Roots = { init: init, stop: stop };
})();

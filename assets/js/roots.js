/* ============================================================
   邪修英语 · 词根库 roots.js
   手风琴展开：词根头 → 词族；每词三级展示：
   单词 + 中文 + 点行朗读；下方构词拆解 chips
   v3：页头双模式切换（词根 / 概念切片）
     · 词根模式：ROOTS 手风琴（原有）
     · 切片模式：SLICES 手风琴——中文大粒度词按
       "状态/语境"拆成英语词，每片带状态标签+例句
   ============================================================ */
(function () {
  var el = {};
  var kw = '';
  var expanded = {};      // 词根展开状态（键=root）
  var expandedSlice = {}; // 切片展开状态（键=c）
  var mode = 'roots';     // roots / slices

  /* ---------- 搜索匹配 ---------- */
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
  function matchSlice(s) {
    if (!kw) return true;
    var k = kw.toLowerCase();
    if (s.c.indexOf(kw) >= 0) return true;
    if (s.title.toLowerCase().indexOf(k) >= 0) return true;
    for (var i = 0; i < s.items.length; i++) {
      if (s.items[i].w.toLowerCase().indexOf(k) >= 0) return true;
      if (s.items[i].zh.indexOf(kw) >= 0) return true;
      if (s.items[i].ctx.indexOf(kw) >= 0) return true;
    }
    return false;
  }

  function speak(text) {
    AudioEngine.speakEn(text, Store.settings().rate).then(function (ok) {
      if (!ok) App.notify('发音不可用，请检查系统语音或网络。');
    });
  }

  /* ---------- 异色高亮：词中的词根字母块 ---------- */
  function highlightRoots(word, partsStr) {
    var parts = ROOTS.parseParts(partsStr || '');
    var w = String(word);
    var lower = w.toLowerCase();
    var ranges = [];
    (parts || []).forEach(function (p) {
      var t = p.t.replace(/[-()（）\s]/g, '').toLowerCase();
      if (t.length < 2) return;                       // 单字母不高亮，防误伤
      var idx = lower.indexOf(t);
      if (idx < 0) return;
      ranges.push([idx, idx + t.length]);
    });
    if (!ranges.length) return escapeHtml(w);
    ranges.sort(function (a, b) { return a[0] - b[0]; });
    // 合并重叠区间
    var merged = [ranges[0]];
    for (var i = 1; i < ranges.length; i++) {
      var last = merged[merged.length - 1];
      if (ranges[i][0] < last[1]) last[1] = Math.max(last[1], ranges[i][1]);
      else merged.push(ranges[i]);
    }
    var out = '', pos = 0;
    merged.forEach(function (r) {
      out += escapeHtml(w.slice(pos, r[0])) +
        '<span class="hl-word">' + escapeHtml(w.slice(r[0], r[1])) + '</span>';
      pos = r[1];
    });
    out += escapeHtml(w.slice(pos));
    return out;
  }

  /* ---------- 异色高亮：例句中包含的目标单词 ---------- */
  function highlightInSentence(ctx, word) {
    var safe = escapeHtml(ctx);
    var w = String(word).trim();
    if (!w) return safe;
    var re = new RegExp('\\b(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'i');
    return safe.replace(re, '<span class="hl-word">$1</span>');
  }

  /* ---------- 渲染 · 词根模式 ---------- */
  function renderRoots() {
    el.list.innerHTML = '';
    var shown = 0;
    var totalWords = ROOTS.list.reduce(function (n, r) { return n + r.w.length; }, 0);

    ROOTS.list.forEach(function (root) {
      if (!matchRoot(root)) return;
      shown++;
      var item = document.createElement('div');
      item.className = 'root-item';

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
            '<span class="rw-main">' + highlightRoots(w, partsStr) + '</span>' +
            '<span class="rw-zh">' + escapeHtml(zh) + '</span>';
          row.addEventListener('click', function () { speak(w); });
          wrap.appendChild(row);

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

  /* ---------- 渲染 · 概念切片模式 ---------- */
  function renderSlices() {
    el.list.innerHTML = '';
    var shown = 0;
    var totalPieces = SLICES.list.reduce(function (n, s) { return n + s.items.length; }, 0);

    SLICES.list.forEach(function (s) {
      if (!matchSlice(s)) return;
      shown++;
      var item = document.createElement('div');
      item.className = 'root-item';

      var head = document.createElement('button');
      head.className = 'root-head slice-head';
      head.innerHTML =
        '<span class="root-arrow">' + (expandedSlice[s.c] || kw ? '▾' : '▸') + '</span>' +
        '<span class="slice-c">' + escapeHtml(s.c) + '</span>' +
        '<span class="root-mean">' + escapeHtml(s.title.replace(s.c + ' · ', '')) + '</span>' +
        '<span class="root-meta">' + s.items.length + '片</span>';
      head.addEventListener('click', function () {
        expandedSlice[s.c] = !expandedSlice[s.c];
        render();
      });
      item.appendChild(head);

      if (expandedSlice[s.c] || kw) {
        var body = document.createElement('div');
        body.className = 'root-body';

        var note = document.createElement('div');
        note.className = 'slice-note';
        note.textContent = s.note;
        body.appendChild(note);

        s.items.forEach(function (it) {
          var row = document.createElement('div');
          row.className = 'root-word';
          row.innerHTML =
            '<span class="rw-main">' + escapeHtml(it.w) + '</span>' +
            '<span class="rw-zh">' + escapeHtml(it.zh) + '</span>';
          row.addEventListener('click', function () { speak(it.w); });
          body.appendChild(row);

          var ctx = document.createElement('div');
          ctx.className = 'slice-ctx';
          ctx.innerHTML = '▸ ' + highlightInSentence(it.ctx, it.w);
          body.appendChild(ctx);
        });
        item.appendChild(body);
      }
      el.list.appendChild(item);
    });

    el.empty.classList.toggle('hidden', shown > 0);
    el.count.textContent = '（' + SLICES.list.length + ' 概念 · ' + totalPieces + ' 片）';
  }

  function render() {
    if (mode === 'slices') renderSlices();
    else renderRoots();
  }

  function setMode(next) {
    if (mode === next) return;
    mode = next;
    document.querySelectorAll('.lib-tab').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lib === mode);
    });
    expandedSlice = {};
    render();
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

    document.querySelectorAll('.lib-tab').forEach(function (b) {
      b.addEventListener('click', function () { setMode(b.dataset.lib); });
    });

    var t = null;
    el.search.addEventListener('input', function () {
      clearTimeout(t);
      var v = el.search.value.trim();
      t = setTimeout(function () {
        kw = v;
        render();
      }, 180);
    });

    render();
  }

  function stop() { AudioEngine.stop(); }

  window.Roots = { init: init, stop: stop };
})();

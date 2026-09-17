/* ============================================================
   邪修英语 · 我的 my.js（v2：只管句子导入/备份/统计/设置）
   单词不再接受外部导入——磨耳朵场景词库在版本迭代中更新
   自定义句子（配音稿/话术）导入后进磨耳朵句模式
   ============================================================ */
(function () {
  var el = {};

  function data() { return Store.get(); }

  /* ---------- 中英混排行解析（保留句末标点） ---------- */
  function splitLine(raw) {
    var line = raw.replace(/^[\s﻿]+|[\s﻿]+$/g, '');
    if (!line) return null;

    var m = line.split(/[|\t]/);
    var en = '', zh = '';
    if (m.length >= 2) {
      en = m[0].trim();
      zh = m.slice(1).join(' ').trim();
    } else {
      var cIdx = line.search(/[一-龥]/);
      var eIdx = line.search(/[A-Za-z]/);
      if (cIdx === -1) { en = line; }
      else if (eIdx === -1) { zh = line; }
      else if (eIdx < cIdx) { en = line.slice(0, cIdx).trim(); zh = line.slice(cIdx).trim(); }
      else { zh = line.slice(0, eIdx).trim(); en = line.slice(eIdx).trim(); }
    }
    // 句子保留 .!? 句末标点，只清杂散引号/括号
    en = en.replace(/^[\s"'“”‘’(（]+/g, '').replace(/[\s"'“”‘’)）]+$/g, '').trim();
    return (en || zh) ? { en: en, zh: zh } : null;
  }

  /* 去重键：忽略大小写与句末标点 */
  function normKey(s) {
    return String(s).toLowerCase().replace(/[\s.!?。！？,，;；]+$/g, '').trim();
  }

  /* ---------- 批量导入句子 ---------- */
  function doImport() {
    var text = el.importText.value;
    var lines = text.split(/\r?\n/);
    var added = 0, skipped = 0;
    var sents = data().mySentences;

    lines.forEach(function (raw) {
      var p = splitLine(raw);
      if (!p) return;
      if (!/[A-Za-z]/.test(p.en)) { skipped++; return; } // 纯中文行无法朗读
      var key = normKey(p.en);
      if (sents.some(function (x) { return normKey(x.en) === key; })) { skipped++; return; }
      sents.push({ en: p.en, zh: p.zh || '' });
      added++;
    });

    if (added > 0) {
      Store.save();
      Immersion.refreshPool();
      el.importText.value = '';
    }
    refreshAll();
    App.notify('导入完成：新增 ' + added + ' 句' +
      (skipped ? '，跳过 ' + skipped + ' 条（空行/纯中文/重复）' : ''), 3200);
  }

  function removeSentence(i) {
    data().mySentences.splice(i, 1);
    Store.save();
    Immersion.refreshPool();
    refreshAll();
  }

  /* ---------- 列表 ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function renderList() {
    var box = el.list;
    box.innerHTML = '';
    data().mySentences.forEach(function (item, i) {
      var row = document.createElement('div');
      row.className = 'root-word';
      row.innerHTML =
        '<span class="rw-star"></span>' +
        '<span class="rw-main my-main">' + escapeHtml(item.en) + '</span>' +
        '<span class="rw-zh">' + escapeHtml(item.zh || '') + '</span>' +
        '<button class="rw-sound" aria-label="朗读">🔊</button>' +
        '<button class="rw-del" aria-label="删除">✕</button>';
      row.querySelector('.rw-sound').addEventListener('click', function () {
        AudioEngine.speakEn(item.en, Store.settings().rate).then(function (ok) {
          if (!ok) App.notify('发音不可用，请检查系统语音或网络。');
        });
      });
      row.querySelector('.rw-del').addEventListener('click', function () { removeSentence(i); });
      box.appendChild(row);
    });
    el.empty.classList.toggle('hidden', data().mySentences.length > 0);
    el.tabSentsN.textContent = data().mySentences.length;
  }

  /* ---------- 统计 ---------- */
  function renderStats() {
    var s = data();
    el.stStreak.textContent = s.stats.streak || 0;
    el.stListen.textContent = s.stats.listenWords || 0;
    el.stScenes.textContent = window.IMMERSION ? IMMERSION.total() : 0;
    el.stMysents.textContent = s.mySentences.length;
  }

  function refreshAll() { renderStats(); renderList(); }

  /* ---------- 备份 ---------- */
  function doExport() {
    var json = Store.exportJSON();
    el.backupText.value = json;
    el.panelBackup.classList.remove('hidden');
    var fname = 'xiexiu-en-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    try {
      var blob = new Blob([json], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = fname;
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 2000);
      App.notify('备份已开始下载；若未弹出，可从展开的文本框手动复制。', 3600);
    } catch (e) {
      App.notify('浏览器阻止了下载，请从文本框全选复制保存。', 4000);
    }
  }
  function doRestoreFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        Store.importJSON(String(reader.result));
        App.notify('恢复成功，即将刷新页面…', 1600);
        setTimeout(function () { location.reload(); }, 1200);
      } catch (e) {
        App.notify('文件不是有效的备份：' + e.message);
      }
    };
    reader.readAsText(file);
  }

  function togglePanel(p) {
    [el.panelImport, el.panelBackup].forEach(function (x) {
      if (x !== p) x.classList.add('hidden');
    });
    p.classList.toggle('hidden');
  }

  /* ---------- 初始化 ---------- */
  function init() {
    el = {
      stStreak: document.getElementById('st-streak'),
      stListen: document.getElementById('st-listen'),
      stScenes: document.getElementById('st-scenes'),
      stMysents: document.getElementById('st-mysents'),
      btnImport: document.getElementById('btn-import'),
      btnExport: document.getElementById('btn-export'),
      btnImportFile: document.getElementById('btn-importfile'),
      restoreFile: document.getElementById('restore-file'),
      panelImport: document.getElementById('panel-import'),
      panelBackup: document.getElementById('panel-backup'),
      importText: document.getElementById('import-text'),
      importSents: document.getElementById('import-assents'),
      backupText: document.getElementById('backup-text'),
      list: document.getElementById('my-list'),
      empty: document.getElementById('my-empty'),
      tabSentsN: document.getElementById('tab-sents-n'),
      setAccent: document.getElementById('set-accent'),
      setLetters: document.getElementById('set-letters')
    };

    el.btnImport.addEventListener('click', function () { togglePanel(el.panelImport); });
    el.btnExport.addEventListener('click', doExport);
    el.btnImportFile.addEventListener('click', function () { el.restoreFile.click(); });
    el.restoreFile.addEventListener('change', function () {
      if (el.restoreFile.files[0]) doRestoreFile(el.restoreFile.files[0]);
      el.restoreFile.value = '';
    });
    el.importSents.addEventListener('click', doImport);

    el.setAccent.value = Store.settings().accent;
    el.setLetters.checked = !!Store.settings().lettersStage;
    el.setAccent.addEventListener('change', function () {
      Store.settings({ accent: el.setAccent.value });
      AudioEngine.setAccent(el.setAccent.value);
    });
    el.setLetters.addEventListener('change', function () {
      Store.settings({ lettersStage: el.setLetters.checked });
      App.notify(el.setLetters.checked ? '熟读将包含字母阶段，8 天一轮。' : '已恢复 7 天一轮。', 2200);
      location.reload(); // 轮转天数变化，重载最稳
    });

    refreshAll();
  }

  function onShow() { if (el.stStreak) refreshAll(); }

  window.My = { init: init, onShow: onShow };
})();

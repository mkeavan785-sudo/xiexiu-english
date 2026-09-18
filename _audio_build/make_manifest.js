/* ============================================================
   邪修英语 · 音频清单生成器 make_manifest.js
   作用：从 4 个数据文件抽取全部待发声文本 → 按规则
        md5(lang|text) 前12位 .mp3 校验音频文件存在
        → 生成 assets/js/audio-manifest.js（window.AUDIO_MANIFEST）
   以后词库/句库更新后，重新运行本脚本即可补齐新词条音频映射。
   运行：node make_manifest.js（在本目录执行）
   生成新词条音频：python gen_tts.py（需先重新抽取 texts.json）
   ============================================================ */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JS = path.join(ROOT, 'assets', 'js');
const AUDIO = path.join(ROOT, 'assets', 'audio');

/* 与 audio.js 的 norm 保持一致：去首尾空格 + 压缩连续空格 */
function norm(s) {
  return String(s == null ? '' : s).trim().replace(/\s+/g, ' ');
}
function md12(lang, text) {
  return crypto.createHash('md5').update(lang + '|' + text).digest('hex').slice(0, 12);
}

/* ---- 加载数据文件（模拟浏览器 window 环境） ---- */
global.window = {};
function load(file) {
  const code = fs.readFileSync(path.join(JS, file), 'utf8');
  new Function('window', code)(global.window);
}
load('data-phonics.js');
load('data-roots.js');
load('data-sentences.js');
load('data-immersion.js');
const W = global.window;

/* ---- 抽取全部待发声文本 ---- */
const en = new Set();
const zh = new Set();

// 磨耳朵场景词：英文 w + 中文 zh
W.IMMERSION.scenes.forEach(sc => sc.items.forEach(it => {
  if (it.w) en.add(norm(it.w));
  if (it.zh) zh.add(norm(it.zh));
}));

// 现场话术：英文 en + 中文 zh
W.SENTENCES.list.forEach(it => {
  if (it.en) en.add(norm(it.en));
  if (it.zh) zh.add(norm(it.zh));
});

// 自然拼读：全部阶段词 + 不规则高频词（均读英文）
W.PHONICS.stages.forEach(st => st.groups.forEach(g =>
  (g.words || []).forEach(w => { if (w.w) en.add(norm(w.w)); })));
(W.PHONICS.tricky || []).forEach(t => { if (t.w) en.add(norm(t.w)); });

// 词根库：整词发音（拆解段仅展示不发声）
W.ROOTS.list.forEach(r => (r.w || []).forEach(it => {
  if (it && it[0]) en.add(norm(it[0]));
}));

/* ---- 校验音频文件并生成映射 ---- */
function build(lang, set) {
  const map = {};
  const missing = [];
  set.forEach(t => {
    const file = md12(lang, t) + '.mp3';
    const p = path.join(AUDIO, lang, file);
    if (fs.existsSync(p)) map[t] = 'assets/audio/' + lang + '/' + file;
    else missing.push(t);
  });
  return { map, missing };
}

/* ---- 同步写出 texts.json（gen_tts.py 的输入，单一数据源） ---- */
fs.writeFileSync(path.join(__dirname, 'texts.json'),
  JSON.stringify({ en: [...en].sort(), zh: [...zh].sort() }, null, 0), 'utf8');

const enRes = build('en', en);
const zhRes = build('zh', zh);

/* ---- 写出清单（键按字典序；值为md5前12位，路径由 audio.js 运行时拼接，省40%体积） ---- */
function sortKeys(o) {
  return Object.keys(o).sort().reduce((acc, k) => (acc[k] = o[k], acc), {});
}
function toHashes(map) {
  const out = {};
  Object.keys(map).forEach(k => { out[k] = path.basename(map[k], '.mp3'); });
  return sortKeys(out);
}
const out =
  '/* 自动生成：_audio_build/make_manifest.js —— 请勿手工编辑\n' +
  '   文本→MP3哈希（md5(lang|text) 前12位），路径 audio.js 运行时拼，覆盖 ' +
  Object.keys(enRes.map).length + ' 英 + ' + Object.keys(zhRes.map).length + ' 中 */\n' +
  'window.AUDIO_MANIFEST = ' +
  JSON.stringify({ en: toHashes(enRes.map), zh: toHashes(zhRes.map) }, null, 0) + ';\n';

const outFile = path.join(JS, 'audio-manifest.js');
fs.writeFileSync(outFile, out, 'utf8');

/* ---- 报告 ---- */
console.log('英文词条: ' + en.size + '，命中 ' + Object.keys(enRes.map).length +
  '，缺失 ' + enRes.missing.length);
console.log('中文词条: ' + zh.size + '，命中 ' + Object.keys(zhRes.map).length +
  '，缺失 ' + zhRes.missing.length);
if (enRes.missing.length) console.log('缺英文音频: ' + JSON.stringify(enRes.missing.slice(0, 20)));
if (zhRes.missing.length) console.log('缺中文音频: ' + JSON.stringify(zhRes.missing.slice(0, 20)));
console.log('清单已写出: ' + outFile + '（' + (fs.statSync(outFile).size / 1024).toFixed(1) + ' KB）');

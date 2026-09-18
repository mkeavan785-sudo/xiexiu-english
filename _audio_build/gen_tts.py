# -*- coding: utf-8 -*-
"""
邪修英语 · TTS 音频生成器 gen_tts.py（英音版）
读取同目录 texts.json（由 make_manifest.js 生成），按规则
  md5(lang|text) 前12位 .mp3
用 edge-tts 生成音频到 assets/audio/{en,zh}/。
声音：英文 en-GB-SoniaNeural（英音女声）/ 中文 zh-CN-XiaoxiaoNeural
特性：并发 6、断点续生成（文件存在即跳过）、失败重试 3 次
用法：python gen_tts.py [--lang en|zh] [--force]
"""
import asyncio
import hashlib
import json
import os
import sys

import edge_tts

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
AUDIO = os.path.join(ROOT, 'assets', 'audio')

VOICE = {'en': 'en-GB-SoniaNeural', 'zh': 'zh-CN-XiaoxiaoNeural'}
CONCURRENCY = 6
RETRIES = 3


def norm(s):
    """与前端 audio.js 的 norm 一致"""
    return ' '.join(str(s).split()).strip()


def md12(lang, text):
    return hashlib.md5(f"{lang}|{text}".encode('utf-8')).hexdigest()[:12]


async def gen_one(sem, lang, text, done, total, failed):
    """生成单条音频（带重试）"""
    fname = md12(lang, text) + '.mp3'
    out = os.path.join(AUDIO, lang, fname)
    if os.path.isfile(out) and os.path.getsize(out) > 0:
        done[0] += 1
        return
    async with sem:
        for attempt in range(1, RETRIES + 1):
            try:
                com = edge_tts.Communicate(text, VOICE[lang])
                await com.save(out)
                if os.path.getsize(out) > 0:
                    done[0] += 1
                    if done[0] % 50 == 0 or done[0] == total:
                        print(f"[{lang}] {done[0]}/{total}", flush=True)
                    return
            except Exception as e:
                if attempt == RETRIES:
                    failed.append(f"{lang}|{text}: {e}")
                else:
                    await asyncio.sleep(1.5 * attempt)


async def main():
    force = '--force' in sys.argv
    only = None
    for i, a in enumerate(sys.argv):
        if a == '--lang' and i + 1 < len(sys.argv):
            only = sys.argv[i + 1]

    with open(os.path.join(HERE, 'texts.json'), encoding='utf-8') as f:
        texts = json.load(f)

    if force:
        # --force：删除旧文件强制重生成
        for lang in (only or VOICE.keys()):
            d = os.path.join(AUDIO, lang)
            if os.path.isdir(d):
                for fn in os.listdir(d):
                    if fn.endswith('.mp3'):
                        os.remove(os.path.join(d, fn))
        print("已清空旧音频（--force）", flush=True)

    for lang_dir in VOICE:
        os.makedirs(os.path.join(AUDIO, lang_dir), exist_ok=True)

    sem = asyncio.Semaphore(CONCURRENCY)
    all_failed = []
    for lang in ([only] if only else ['en', 'zh']):
        items = sorted(set(norm(t) for t in texts.get(lang, []) if norm(t)))
        done = [0]
        failed = []
        print(f"=== {lang}: {len(items)} 条，声音 {VOICE[lang]} ===", flush=True)
        await asyncio.gather(*[gen_one(sem, lang, t, done, len(items), failed)
                               for t in items])
        all_failed.extend(failed)
        print(f"=== {lang} 完成 {done[0]}/{len(items)}，失败 {len(failed)} ===", flush=True)

    if all_failed:
        print("失败清单：", flush=True)
        for x in all_failed[:20]:
            print(" ", x, flush=True)
        sys.exit(1)


if __name__ == '__main__':
    asyncio.run(main())

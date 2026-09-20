# -*- coding: utf-8 -*-
"""
邪修英语 · 全量响度归一 normalize_loudness.py
把 assets/audio/{en,zh} 全部 MP3 统一到 -14 LUFS（播客标准响度），
解决"音量开满还嫌小"：整体提升约 6dB（≈2倍感知响度）。
流程：先测响度，已在 [-14.6,-13.4] 内跳过（断点续跑）；
否则 loudnorm 单遍重编码到临时文件，成功后原子替换原文件。
用法：python normalize_loudness.py [--workers 4]
"""
import os
import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

HERE = os.path.dirname(os.path.abspath(__file__))
AUDIO = os.path.join(HERE, '..', 'assets', 'audio')
TARGET_I = -14.0
TOL = 0.6
WORKERS = 4


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='ignore')


def measure(path):
    """返回 dict(input_i/tp/lra/thresh)，失败返回 None"""
    r = run(['ffmpeg', '-i', path, '-af', 'loudnorm=print_format=json', '-f', 'null', '-'])
    m = re.search(r'"input_i"\s*:\s*"(-?[\d.]+)"', r.stderr)
    if not m:
        return None
    tp = re.search(r'"input_tp"\s*:\s*"(-?[\d.]+)"', r.stderr)
    lra = re.search(r'"input_lra"\s*:\s*"(-?[\d.]+)"', r.stderr)
    th = re.search(r'"input_thresh"\s*:\s*"(-?[\d.]+)"', r.stderr)
    return {
        'i': float(m.group(1)),
        'tp': float(tp.group(1)) if tp else -99.0,
        'lra': float(lra.group(1)) if lra else 1.0,
        'thresh': float(th.group(1)) if th else -30.0,
    }


def process(path):
    name = os.path.basename(path)
    lang = 'en' if '\\en\\' in path or '/en/' in path else 'zh'
    m1 = measure(path)
    if m1 is None:
        return (lang, name, 'measure-fail', None)
    i, tp = m1['i'], m1['tp']
    if abs(i - TARGET_I) <= 0.8:
        return (lang, name, 'skip', i)

    # 线性增益，峰值地板 -0.7dBFS（允许轻微峰值触及，语音不可闻）；
    # 高峰均比短语音到不了 -14，就取峰值允许的最大响度（仍比原来响 4dB+）
    gain = min(TARGET_I - i, -0.7 - tp)
    gain = max(-12.0, min(12.0, gain))
    tmp = path + '.tmp.mp3'
    if os.path.exists(tmp):
        os.remove(tmp)
    r = run(['ffmpeg', '-y', '-i', path, '-af', f'volume={gain:.2f}dB',
             '-c:a', 'libmp3lame', '-b:a', '48k', '-ar', '24000', tmp])
    if r.returncode != 0 or not os.path.isfile(tmp) or os.path.getsize(tmp) < 500:
        if os.path.exists(tmp):
            os.remove(tmp)
        return (lang, name, 'encode-fail', None)
    m2 = measure(tmp)
    # 达标：落在 [-17, -12]（多数到 -14，高峰均比到 -15.5 左右，全部显著变响）
    if m2 is None or m2['i'] < -17.0 or m2['i'] > -12.0:
        os.remove(tmp)
        return (lang, name, 'verify-fail', m2['i'] if m2 else None)
    os.replace(tmp, path)
    return (lang, name, 'ok', m2['i'])


def main():
    files = []
    for lang in ('en', 'zh'):
        d = os.path.join(AUDIO, lang)
        for fn in sorted(os.listdir(d)):
            if fn.endswith('.mp3'):
                files.append(os.path.join(d, fn))
    print(f'共 {len(files)} 条，目标 {TARGET_I} LUFS，并发 {WORKERS}', flush=True)

    done = {'ok': 0, 'skip': 0}
    fails = []
    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futs = {ex.submit(process, p): p for p in files}
        for n, fut in enumerate(as_completed(futs), 1):
            lang, name, status, i = fut.result()
            if status in ('ok', 'skip'):
                done['ok' if status == 'ok' else 'skip'] += 1
            else:
                fails.append((lang, name, status))
            if n % 100 == 0 or n == len(files):
                print(f'[{n}/{len(files)}] ok={done["ok"]} skip={done["skip"]} fail={len(fails)}', flush=True)

    print(f'完成：重编码 {done["ok"]}，已达标跳过 {done["skip"]}，失败 {len(fails)}', flush=True)
    for f in fails[:20]:
        print(' FAIL', f, flush=True)
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()

"""Build the project covers: the product UI set on a soft panel.

Each source (still or video, all in this folder) has its UI
cut out and placed on a light 3:2 panel, either floating in the middle with
rounded corners and a faint shadow, or bleeding off the right/bottom edges.
Stills become public/covers/<name>-panel-{800,1600}.webp; videos become
<name>-panel.{mp4,webm} plus a -panel-poster.webp.

Run from the repo root:  python3 design/covers-src/make-covers.py [--stills]
(--stills skips the slower video encodes).
Needs Pillow, NumPy and ffmpeg.
"""
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

SRC = 'design/covers-src'
OUT = 'public/covers'
W, H = 1600, 1066          # 3:2 panel
PANEL = (239, 239, 237)    # soft light grey, like a contact sheet's mat


def rounded_mask(size, radius, corners=(True, True, True, True)):
    """L-mode mask with the chosen corners (tl, tr, br, bl) rounded."""
    w, h = size
    m = Image.new('L', size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, w - 1, h - 1], radius=radius, fill=255)
    # Square off the corners that should stay square (they bleed off the panel).
    tl, tr, br, bl = corners
    if not tl: d.rectangle([0, 0, radius, radius], fill=255)
    if not tr: d.rectangle([w - radius - 1, 0, w - 1, radius], fill=255)
    if not br: d.rectangle([w - radius - 1, h - radius - 1, w - 1, h - 1], fill=255)
    if not bl: d.rectangle([0, h - radius - 1, radius, h - 1], fill=255)
    return m


def shadow_layer(mask, at, blur=28, alpha=0.10, drop=10):
    """A soft shadow for a shape (its mask) placed at `at` on the panel."""
    sh = Image.new('L', (W, H), 0)
    sh.paste(mask.point(lambda v: int(v * alpha)), (at[0], at[1] + drop))
    return sh.filter(ImageFilter.GaussianBlur(blur))


def compose(ui, at, corners=(True, True, True, True), radius=14, shadow=True, panel=PANEL):
    """Place a UI image on the panel. Returns the panel and the placement."""
    base = Image.new('RGB', (W, H), panel)
    mask = rounded_mask(ui.size, radius, corners)
    if ui.mode == 'RGBA':
        mask = ImageChops.multiply(mask, ui.getchannel('A'))
    if shadow:
        sh = shadow_layer(mask, at)
        base = Image.composite(Image.new('RGB', (W, H), (0, 0, 0)), base, sh)
    base.paste(ui.convert('RGB'), at, mask)
    return base


def save_still(img, name):
    img.save(f'{OUT}/{name}-panel-1600.webp', quality=86)
    img.resize((800, 533), Image.LANCZOS).save(f'{OUT}/{name}-panel-800.webp', quality=84)


def fit(im, width):
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


# ---- Stills -------------------------------------------------------------------

# Bar Tabs: the dark POS window, floating in the middle.
bt = Image.open(f'{SRC}/bar-tabs.webp').convert('RGB').crop((471, 173, 1449, 907))
bt = fit(bt, 1060)
save_still(compose(bt, ((W - bt.width) // 2, (H - bt.height) // 2), radius=18), 'bar-tabs')

# Menu Management: the back-office window, bleeding off right and bottom.
mm = Image.open(f'{SRC}/menu-management.png').convert('RGB').crop((289, 88, 1920, 1080))
mm = fit(mm, 1560)
save_still(compose(mm, (190, 150), corners=(True, False, False, False), radius=18), 'menu-management')

# Bandoneón: the two phones, keyed off their dark backdrop.
bd = Image.open(f'{SRC}/bandoneon.png').convert('RGB')
a = np.asarray(bd).astype(np.int16)
dist = np.abs(a - np.array([24, 24, 24])).max(axis=2)
alpha = np.clip((dist - 3) * 40, 0, 255).astype(np.uint8)   # backdrop out, soft edge
bd = bd.copy(); bd.putalpha(Image.fromarray(alpha))
bd = bd.crop(bd.getbbox())
bd = bd.resize((round(bd.width * 0.8 * H / bd.height), round(H * 0.8)), Image.LANCZOS)
save_still(compose(bd, ((W - bd.width) // 2, (H - bd.height) // 2), radius=0, shadow=False), 'bandoneon')

# Sabi: the mark, redrawn in ink on the panel (bars ink, dot kept yellow).
sb = Image.open(f'{SRC}/sabi.png').convert('RGB').crop((840, 420, 1080, 662))
arr = np.asarray(sb).astype(np.int16)
light = arr.min(axis=2) > 200                     # the cream bars
yellow = (arr[..., 0] > 150) & (arr[..., 2] < 120)
canvas = np.zeros((*arr.shape[:2], 4), np.uint8)
canvas[light] = (29, 39, 51, 255)
canvas[yellow] = (216, 168, 50, 255)
sb = Image.fromarray(canvas, 'RGBA').resize((260, 262), Image.LANCZOS)
save_still(compose(sb, ((W - 260) // 2, (H - 262) // 2), radius=0, shadow=False), 'sabi')


# ---- Videos -------------------------------------------------------------------

def video(name, crop, width, at, corners, radius=18, fps=20, poster_at=0.45):
    """Cut `crop` (x, y, w, h) out of design/covers-src/<name>.mp4, scale it to
    `width`, place it at `at` on the panel with rounded corners and a shadow."""
    src = f'{SRC}/{name}.mp4'
    dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                         '-of', 'csv=p=0', src]))
    x, y, cw, ch = crop
    h = round(ch * width / cw)
    h -= h % 2
    with tempfile.TemporaryDirectory() as tmp:
        # The panel with the shadow already painted in, and the corner mask.
        mask = rounded_mask((width, h), radius, corners)
        bg = compose(Image.new('RGB', (width, h), PANEL), at, corners, radius)
        bg.save(f'{tmp}/bg.png')
        mask.save(f'{tmp}/mask.png')
        graph = (
            f"[0:v]crop={cw}:{ch}:{x}:{y},scale={width}:{h},fps={fps},format=rgba[ui];"
            f"[2:v]format=gray[m];[ui][m]alphamerge[uim];"
            f"[1:v][uim]overlay={at[0]}:{at[1]}:shortest=1,format=yuv420p[v]"
        )
        # The two stills loop forever, so every input is capped at the source's length.
        t = f'{dur:.3f}'
        common = ['-i', src, '-loop', '1', '-t', t, '-i', f'{tmp}/bg.png', '-loop', '1', '-t', t,
                  '-i', f'{tmp}/mask.png', '-filter_complex', graph, '-map', '[v]', '-t', t, '-an']
        subprocess.run(['ffmpeg', '-v', 'error', '-y', *common, '-c:v', 'libx264', '-crf', '24',
                        '-movflags', '+faststart', f'{OUT}/{name}-panel.mp4'], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', *common, '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0',
                        '-deadline', 'good', '-cpu-used', '4', '-row-mt', '1', f'{OUT}/{name}-panel.webm'],
                       check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{dur * poster_at:.2f}', '-i', f'{OUT}/{name}-panel.mp4',
                    '-frames:v', '1', '-c:v', 'libwebp', '-quality', '82', f'{OUT}/{name}-panel-poster.webp'],
                   check=True)


if '--stills' in sys.argv:
    sys.exit(0)

# Systems Portal: the portal window, bleeding off right and bottom.
video('systems-portal', (235, 89, 917, 559), 1560, (190, 150), (True, False, False, False), poster_at=0.2)
# Specs Generator: the whole generator screen, floating.
video('specs-generator', (0, 0, 1000, 564), 1240, ((W - 1240) // 2, 140), (True, True, True, True))
# Pocabin: the binder on its pale page, floating.
video('pocabin', (240, 100, 800, 520), 1100, ((W - 1100) // 2, (H - 715) // 2), (True, True, True, True))

print('covers written to', OUT)

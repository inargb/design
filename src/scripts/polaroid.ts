// The polaroid (see components/Polaroid.astro): flash, a dog selfie develops,
// write on it, pick a frame, then save it.
import { motionOn } from './prefs';

interface Dog { src: string; by: string; license: string; href: string; }
interface Frame { id: string; hex: string; ink: string; }
interface Data { dogs: Dog[]; frames: Frame[]; photo: string; saved: string; }

const dialog = document.querySelector<HTMLDialogElement>('[data-polaroid]');
const data: Data | null = dialog ? JSON.parse(dialog.dataset.polaroid!) : null;

let current = -1;
// Said inside the dialog: the page's toast sits under the modal.
const say = (text: string) => {
  const el = dialog?.querySelector<HTMLElement>('[data-polaroid-status]');
  if (!el) return;
  el.textContent = text;
  window.clearTimeout(Number(el.dataset.timer));
  el.dataset.timer = String(window.setTimeout(() => { el.textContent = ''; }, 4000));
};

/** Flash, then a new dog selfie in the polaroid. */
export function takePicture() {
  if (!dialog || !data) return;
  flash();
  const open = () => { shoot(); if (!dialog.open) dialog.showModal(); };
  if (motionOn()) window.setTimeout(open, 180); else open();
}

function flash() {
  if (!motionOn()) return;
  const el = document.createElement('div');
  el.className = 'shutter';
  el.setAttribute('aria-hidden', 'true');
  document.body.append(el);
  el.addEventListener('animationend', () => el.remove());
}

// A different dog each time, never the same one twice in a row.
function nextDog(): number {
  const n = data!.dogs.length;
  let i = Math.floor(Math.random() * n);
  if (n > 1 && i === current) i = (i + 1) % n;
  return i;
}

const $ = <T extends Element>(s: string) => dialog!.querySelector<T>(s)!;

function shoot() {
  current = nextDog();
  const dog = data!.dogs[current];
  const img = $<HTMLImageElement>('[data-polaroid-img]');
  const credit = $<HTMLAnchorElement>('[data-polaroid-credit]');
  dialog!.classList.remove('is-developed');
  dialog!.classList.add('is-developing');
  img.onload = () => requestAnimationFrame(() => requestAnimationFrame(() => {
    dialog!.classList.add('is-developed');
    dialog!.classList.remove('is-developing');
  }));
  img.src = dog.src;
  credit.href = dog.href;
  credit.textContent = `${data!.photo}: ${dog.by} · ${dog.license}`;
}

function frame(): Frame {
  const id = dialog!.querySelector<HTMLInputElement>('[data-polaroid-frame]:checked')?.value;
  return data!.frames.find((f) => f.id === id) ?? data!.frames[0];
}

// ---- The print, as a PNG --------------------------------------------------
async function render(): Promise<Blob | null> {
  const dog = data!.dogs[current];
  const f = frame();
  const caption = $<HTMLInputElement>('[data-polaroid-caption]').value.trim();
  const W = 1080, H = 1320, M = 60, P = W - 2 * M;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const c = canvas.getContext('2d')!;
  c.fillStyle = f.hex;
  c.fillRect(0, 0, W, H);
  const img = new Image();
  img.src = dog.src;
  await img.decode();
  c.drawImage(img, M, M, P, P);
  if (caption) {
    try { await document.fonts.load('500 84px Caveat'); } catch { /* fall back */ }
    let size = 84;
    c.font = `500 ${size}px Caveat, cursive`;
    while (c.measureText(caption).width > P && size > 40) { size -= 4; c.font = `500 ${size}px Caveat, cursive`; }
    c.fillStyle = f.ink;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(caption, W / 2, M + P + (H - M - P) / 2 - 16);
  }
  c.globalAlpha = 0.55;
  c.fillStyle = f.ink;
  c.font = '20px "IBM Plex Mono", monospace';
  c.textAlign = 'left';
  c.textBaseline = 'alphabetic';
  c.fillText(`${data!.photo}: ${dog.by} · ${dog.license}`, M, H - 28);
  c.textAlign = 'right';
  c.fillText('inargb.github.io/portfolio', W - M, H - 28);
  return new Promise((res) => canvas.toBlob(res, 'image/png'));
}

async function save() {
  const blob = await render();
  if (!blob) return;
  const file = new File([blob], 'polaroid.png', { type: 'image/png' });
  // Phones: the share sheet has "Save image". Elsewhere: a download.
  if (matchMedia('(pointer: coarse)').matches && navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file] }); return; }
    catch (err) { if ((err as Error).name === 'AbortError') return; }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'polaroid.png';
  document.body.append(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  say(data!.saved);
}

if (dialog && data) {
  const card = $<HTMLElement>('[data-polaroid-card]');
  dialog.querySelectorAll<HTMLInputElement>('[data-polaroid-frame]').forEach((input) => {
    input.addEventListener('change', () => {
      const f = frame();
      card.style.setProperty('--frame', f.hex);
      card.style.setProperty('--frame-ink', f.ink);
    });
  });
  $('[data-polaroid-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  $('[data-polaroid-save]').addEventListener('click', () => { save(); });
}

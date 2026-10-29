// Spec mode: the site shows its own redlines, the way the Responsive Specs
// Generator documents a Figma frame: sizes in px and vw, the type token,
// and live WCAG contrast for text. Toggle with "S" or the ruler in the footer.
import { register } from './registry';
import { onKey } from './keys';

const TARGETS = [
  '[data-spec-label]',
  'main h1',
  'main h2',
  '.pill',
  '.btn',
  '.frame-card__cover',
].join(',');

type RGBA = [number, number, number, number];

function parse(c: string): RGBA | null {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return [p[0], p[1], p[2], p[3] ?? 1];
}
function lum([r, g, b]: RGBA) {
  const f = (v: number) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function backgroundOf(el: Element | null): RGBA {
  while (el) {
    const bg = parse(getComputedStyle(el).backgroundColor);
    if (bg && bg[3] > 0.5) return bg;
    el = el.parentElement;
  }
  return parse(getComputedStyle(document.body).backgroundColor) ?? [255, 255, 255, 1];
}
function contrast(el: Element): number | null {
  const fg = parse(getComputedStyle(el).color);
  if (!fg) return null;
  const a = lum(fg), b = lum(backgroundOf(el));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

let layer: HTMLElement | null = null;

function draw() {
  layer?.remove();
  layer = document.createElement('div');
  layer.className = 'spec-layer';
  layer.setAttribute('aria-hidden', 'true');
  const vw = window.innerWidth;
  const sy = window.scrollY;

  document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || r.bottom + sy < sy - 200) return;
    const box = document.createElement('div');
    box.className = 'spec-box';
    Object.assign(box.style, {
      left: `${r.left}px`, top: `${r.top + sy}px`, width: `${r.width}px`, height: `${r.height}px`,
    });
    const cs = getComputedStyle(el);
    const w = Math.round(r.width);
    const parts = [el.dataset.specLabel ?? `${w}px · ${((r.width / vw) * 100).toFixed(2)}vw`];
    if (/^H\d$/.test(el.tagName) || el.classList.contains('pill') || el.classList.contains('btn')) {
      parts.push(`${parseFloat(cs.fontSize).toFixed(1)}px`);
      const c = contrast(el);
      if (c) parts.push(`${c.toFixed(1)}:1 ${c >= 7 ? 'AAA' : c >= 4.5 ? 'AA' : c >= 3 ? 'AA large' : 'fail'}`);
    }
    const tag = document.createElement('span');
    tag.className = 'spec-tag';
    tag.textContent = parts.join(' · ');
    box.append(tag);
    layer!.append(box);
  });

  const grid = document.createElement('div');
  grid.className = 'spec-grid container';
  grid.innerHTML = Array.from({ length: 12 }, () => '<i></i>').join('');
  layer.append(grid);
  const ruler = document.createElement('div');
  ruler.className = 'spec-ruler';
  ruler.textContent = `viewport ${vw}px · 1vw = ${(vw / 100).toFixed(2)}px`;
  layer.append(ruler);
  document.body.append(layer);
}

function setOn(on: boolean) {
  document.documentElement.toggleAttribute('data-spec', on);
  document.querySelectorAll('[data-spec-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(on)));
  if (on) draw(); else { layer?.remove(); layer = null; }
}

register({
  id: 'spec',
  init(ctx) {
    const toggle = () => {
      const on = !document.documentElement.hasAttribute('data-spec');
      setOn(on);
      if (on) {
        ctx.found('spec');
        ctx.say({ en: 'spec mode on. every frame, measured.', pt: 'modo spec ligado. cada frame, medido.' });
      }
    };
    onKey('s', toggle);
    document.addEventListener('click', (e) => {
      if ((e.target as Element).closest('[data-spec-toggle]')) toggle();
    });
    let t = 0;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = window.setTimeout(() => { if (layer) draw(); }, 150);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && layer) setOn(false); });
  },
});

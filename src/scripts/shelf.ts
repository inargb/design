// The shelf on the playground page. Every object is a real <button>:
//   pointer  → drag anywhere; drop on the shelf to snap into a free spot
//   click / tap / Enter without dragging → opens the object (an overlay, a
//              link or its note) via an `ina:shelf-open` event
//   hover / focus → shows the object's note
// "tidy up for me" puts everything in its place. The arrangement is
// remembered, so the shelf is how you left it.
import { motionOn } from './prefs';

type Where = { kind: 'pile' } | { kind: 'slot'; slot: number } | { kind: 'free'; fx: number; fy: number };
export type ShelfOpen = { id: string; action: { kind: string; href?: string } };

const root = document.querySelector<HTMLElement>('[data-shelf]');
if (root) init(root);

function init(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const img = root.querySelector<HTMLImageElement>('[data-shelf-img]')!;
  const pile = root.querySelector<HTMLElement>('[data-pile]')!;
  const live = root.querySelector<HTMLElement>('[data-shelf-live]')!;
  const sayEl = root.querySelector<HTMLElement>('[data-say]')!;
  const bubble = root.querySelector<HTMLElement>('[data-note-bubble]')!;
  const countEl = root.querySelector<HTMLElement>('[data-count]')!;
  const tidyBtn = root.querySelector<HTMLButtonElement>('[data-tidy]')!;
  const messBtn = root.querySelector<HTMLButtonElement>('[data-mess]')!;
  const slots: [number, number][] = JSON.parse(root.dataset.slots!);
  const s: Record<string, string> = JSON.parse(root.dataset.strings!);
  const items = Array.from(root.querySelectorAll<HTMLElement>('.shelf__item'));
  const KEY = 'ina:shelf';

  const state = new Map<HTMLElement, Where>();
  let saved: Record<string, Where> = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) ?? '{}'); } catch { /* ignore */ }
  items.forEach((it) => {
    const w = saved[it.dataset.id!];
    state.set(it, w && (w.kind !== 'slot' || w.slot < slots.length) ? w : { kind: 'pile' });
  });

  // First placement happens out of sight (no gliding in from the corner);
  // then the objects just fade in. See .is-settling in Shelf.astro.
  root.classList.add('is-live', 'is-settling');

  let sayTimer = 0;
  function say(text: string) {
    sayEl.textContent = text;
    clearTimeout(sayTimer);
    sayTimer = window.setTimeout(() => (sayEl.textContent = ''), 4500);
  }

  const occupied = (except?: HTMLElement) =>
    new Set(items.filter((i) => i !== except).map((i) => state.get(i)!).filter((w): w is { kind: 'slot'; slot: number } => w.kind === 'slot').map((w) => w.slot));

  function anchorFor(it: HTMLElement, where: Where): { x: number; y: number; r: number } {
    const st = stage.getBoundingClientRect();
    if (where.kind === 'slot') {
      const ir = img.getBoundingClientRect();
      const [sx, sy] = slots[where.slot];
      const wobble = ((where.slot * 37) % 5) - 2; // tiny, stable tilt
      return { x: ir.left - st.left + sx * ir.width, y: ir.top - st.top + sy * ir.height, r: wobble * 0.6 };
    }
    if (where.kind === 'free') return { x: where.fx * st.width, y: where.fy * st.height, r: 0 };
    const pr = pile.getBoundingClientRect();
    const [px, py, rot] = JSON.parse(it.dataset.pile!) as [number, number, number];
    return { x: pr.left - st.left + px * pr.width, y: pr.top - st.top + py * pr.height, r: rot };
  }

  function sizeOf(it: HTMLElement) {
    const w = Number(it.dataset.size) * img.getBoundingClientRect().width;
    return { w, h: w * Number(it.dataset.ratio) };
  }

  function place(it: HTMLElement) {
    const { w, h } = sizeOf(it);
    const a = anchorFor(it, state.get(it)!);
    const btn = it.firstElementChild as HTMLElement;
    btn.style.setProperty('--w', `${w}px`);
    btn.style.setProperty('--x', `${a.x - w / 2}px`);
    btn.style.setProperty('--y', `${a.y - h}px`);
    btn.style.setProperty('--r', `${a.r}deg`);
  }
  const layout = () => items.forEach(place);

  function save() {
    const out: Record<string, Where> = {};
    items.forEach((it) => (out[it.dataset.id!] = state.get(it)!));
    try { localStorage.setItem(KEY, JSON.stringify(out)); } catch { /* ignore */ }
  }

  const putAwayCount = () => items.filter((i) => state.get(i)!.kind === 'slot').length;

  function refresh(announce?: string, byHand = true) {
    const n = putAwayCount();
    countEl.textContent = String(n);
    const done = n === items.length;
    root.classList.toggle('is-tidy', done);
    tidyBtn.hidden = done;
    messBtn.hidden = !done;
    if (announce) live.textContent = announce;
    save();
    if (done && byHand) say(s.done);
  }

  const nameOf = (it: HTMLElement) => (it.firstElementChild as HTMLElement).getAttribute('aria-label') ?? '';
  const fill = (tpl: string, vars: Record<string, string | number>) => tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k]));

  // ---- notes ------------------------------------------------------------
  function showNote(it: HTMLElement) {
    const btn = it.firstElementChild as HTMLElement;
    const st = stage.getBoundingClientRect();
    const r = btn.getBoundingClientRect();
    bubble.textContent = btn.dataset.note ?? '';
    bubble.style.left = `${r.left - st.left + r.width / 2}px`;
    bubble.style.top = `${r.top - st.top - 6}px`;
    bubble.classList.add('is-on');
  }
  const hideNote = () => bubble.classList.remove('is-on');

  // ---- opening an object ------------------------------------------------
  function open(it: HTMLElement) {
    const btn = it.firstElementChild as HTMLElement;
    const action = JSON.parse(btn.dataset.action ?? '{"kind":"note"}');
    if (action.kind === 'link' && action.href) window.open(action.href, '_blank', 'noopener');
    if (action.kind === 'note') showNote(it);
    window.dispatchEvent(new CustomEvent<ShelfOpen>('ina:shelf-open', { detail: { id: it.dataset.id!, action } }));
  }

  // ---- pointer drag -----------------------------------------------------
  items.forEach((it) => {
    const btn = it.firstElementChild as HTMLButtonElement;
    let startX = 0, startY = 0, moved = false, dragging = false, offX = 0, offY = 0;

    btn.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const r = btn.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY;
      offX = e.clientX - r.left; offY = e.clientY - r.top;
      moved = false; dragging = true;
      btn.setPointerCapture(e.pointerId);
    });
    btn.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      if (!moved && Math.hypot(e.clientX - startX, e.clientY - startY) < 5) return;
      if (!moved) { moved = true; it.classList.add('is-dragging'); hideNote(); }
      const st = stage.getBoundingClientRect();
      btn.style.setProperty('--x', `${e.clientX - st.left - offX}px`);
      btn.style.setProperty('--y', `${e.clientY - st.top - offY}px`);
      btn.style.setProperty('--r', '-3deg');
    });
    const end = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      it.classList.remove('is-dragging');
      if (!moved) return;
      const st = stage.getBoundingClientRect();
      const ir = img.getBoundingClientRect();
      const { w, h } = sizeOf(it);
      const r = btn.getBoundingClientRect();
      const cx = r.left + w / 2, by = r.top + h;
      const overShelf = e.clientX >= ir.left && e.clientX <= ir.right && e.clientY >= ir.top - h && e.clientY <= ir.bottom;
      if (overShelf) {
        const taken = occupied(it);
        let best = -1, bestD = Infinity;
        slots.forEach(([sx, sy], i) => {
          if (taken.has(i)) return;
          const d = Math.hypot(ir.left + sx * ir.width - cx, ir.top + sy * ir.height - by);
          if (d < bestD) { bestD = d; best = i; }
        });
        if (best >= 0) {
          state.set(it, { kind: 'slot', slot: best });
          place(it);
          refresh(fill(s.placed, { name: nameOf(it), n: putAwayCount(), total: items.length }));
          return;
        }
      }
      const wasSlot = state.get(it)!.kind === 'slot';
      state.set(it, { kind: 'free', fx: (cx - st.left) / st.width, fy: Math.min(1, (by - st.top) / st.height) });
      place(it);
      refresh(wasSlot ? fill(s.removed, { name: nameOf(it) }) : undefined);
    };
    btn.addEventListener('pointerup', end);
    btn.addEventListener('pointercancel', end);

    // A click that wasn't the end of a drag (and Enter / Space) opens it.
    btn.addEventListener('click', () => { if (!moved) open(it); moved = false; });
    btn.addEventListener('focus', () => showNote(it));
    btn.addEventListener('blur', hideNote);
    btn.addEventListener('mouseenter', () => showNote(it));
    btn.addEventListener('mouseleave', () => { if (document.activeElement !== btn) hideNote(); });
  });

  // Tidy puts everything in its own place (data-home), including things
  // already put away somewhere else, then settles them one by one.
  tidyBtn.addEventListener('click', () => {
    const moving = items.filter((it) => {
      const w = state.get(it)!;
      return !(w.kind === 'slot' && w.slot === Number(it.dataset.home));
    });
    moving.forEach((it) => state.set(it, { kind: 'slot', slot: Number(it.dataset.home) }));
    moving.forEach((it, i) => {
      window.setTimeout(() => {
        place(it);
        if (i === moving.length - 1) {
          refresh(undefined, false);
          say(s.lazy);
          messBtn.focus();
        }
      }, motionOn() ? i * 140 : 0);
    });
  });
  messBtn.addEventListener('click', () => {
    items.forEach((it) => state.set(it, { kind: 'pile' }));
    layout();
    refresh();
    tidyBtn.focus();
  });

  const ro = new ResizeObserver(layout);
  ro.observe(stage);
  const settle = () => requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('is-settling')));
  layout();
  if (img.complete) settle();
  else {
    img.addEventListener('load', () => { layout(); settle(); }, { once: true });
    window.setTimeout(settle, 2500); // never stay hidden if the image fails
  }
  refresh(undefined, false);
}

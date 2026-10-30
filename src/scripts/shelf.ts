// The shelf on the playground page. Every object is a real <button>:
//   pointer  → drag anywhere; drop on the shelf to snap into a free spot
//   click / tap / Enter without dragging → opens the object (an overlay, a
//              link or its note) via an `ina:shelf-open` event
//   hover / focus → shows the object's note
// Every visit starts with the things scattered around the shelf, waiting
// to be put away; where there's no room for that beside the shelf (phones
// and other narrow screens) it's always tidy and the things don't move.

import { motionOn } from './prefs';

type Where = { kind: 'pile' } | { kind: 'slot'; slot: number } | { kind: 'free'; fx: number; fy: number };
export type ShelfOpen = { id: string; action: { kind: string; href?: string } };

const root = document.querySelector<HTMLElement>('[data-shelf]');
if (root) init(root);

function init(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const img = root.querySelector<HTMLImageElement>('[data-shelf-img]')!;
  const live = root.querySelector<HTMLElement>('[data-shelf-live]')!;
  const bubble = root.querySelector<HTMLElement>('[data-note-bubble]')!;
  const slots: [number, number][] = JSON.parse(root.dataset.slots!);
  const s: Record<string, string> = JSON.parse(root.dataset.strings!);
  const items = Array.from(root.querySelectorAll<HTMLElement>('.shelf__item'));

  const state = new Map<HTMLElement, Where>();
  // Two modes. "Organize": the things start scattered in the free space
  // beside the shelf, to be dragged onto it. "Look" (phones, and any screen
  // too narrow for every scattered thing to sit clear of the shelf): always
  // tidy and centred, no dragging, no tidy switch, a different ask.
  const EDGE = 16, GAP = 14; // px from the screen edge / from the shelf
  const tidyAll = () => items.forEach((it) => state.set(it, { kind: 'slot', slot: Number(it.dataset.home) }));
  // Free space either side of the shelf, in stage coordinates (the page
  // doesn't clip, so it runs to the screen edges).
  function sides() {
    const st = stage.getBoundingClientRect();
    const shelfL = img.offsetLeft, shelfR = img.offsetLeft + img.offsetWidth;
    return { L: EDGE - st.left, shelfL, shelfR, R: document.documentElement.clientWidth - EDGE - st.left };
  }
  function roomy() {
    if (window.matchMedia('(max-width: 40rem)').matches) return false;
    const { L, shelfL, shelfR, R } = sides();
    return items.every((it) => {
      const px = (JSON.parse(it.dataset.pile!) as number[])[0];
      const w = sizeOf(it).w;
      return px < 0.5 ? shelfL - GAP - L >= w : R - (shelfR + GAP) >= w;
    });
  }
  let look = !roomy();
  function applyMode() {
    document.documentElement.classList.toggle('shelf-look', look);
  }
  items.forEach((it) => state.set(it, look ? { kind: 'slot', slot: Number(it.dataset.home) } : { kind: 'pile' }));
  applyMode();

  // First placement happens out of sight (no gliding in from the corner);
  // then the objects just fade in. See .is-settling in Shelf.astro.
  root.classList.add('is-live', 'is-settling');


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
    // Scattered: left-hand things (px < 0.5) in the space left of the shelf,
    // the rest to its right, spread across that space but never over it.
    const [px, py, rot] = JSON.parse(it.dataset.pile!) as [number, number, number];
    const { L, shelfL, shelfR, R } = sides();
    const half = sizeOf(it).w / 2;
    const lerp = (a: number, b: number, t: number) => (b < a ? (a + b) / 2 : a + (b - a) * t);
    const x = px < 0.5
      ? lerp(L + half, shelfL - GAP - half, px / 0.5)
      : lerp(shelfR + GAP + half, R - half, (px - 0.5) / 0.5);
    return { x, y: py * st.height, r: rot };
  }

  function sizeOf(it: HTMLElement) {
    const w = Number(it.dataset.size) * img.offsetWidth;
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
  // On resize: re-check the mode; going into "look" puts everything away.
  const layout = () => {
    const was = look;
    look = !roomy();
    if (look && !was) { tidyAll(); refresh(); }
    if (look !== was) applyMode();
    items.forEach(place);
  };

  const putAwayCount = () => items.filter((i) => state.get(i)!.kind === 'slot').length;
  // The switch under the shelf reads "tidy up" until everything is in its
  // own place, then "mess it up again".
  const tidyBtn = root.querySelector<HTMLButtonElement>('[data-tidy]')!;
  const tidyText = tidyBtn.querySelector<HTMLElement>('[data-tidy-text]')!;
  // A toast at the bottom of the screen, for a few seconds.
  const toast = root.querySelector<HTMLElement>('[data-shelf-toast]')!;
  let toastTimer = 0;
  function say(text: string) {
    toast.textContent = text;
    requestAnimationFrame(() => toast.classList.add('is-on'));
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-on'), 3200);
  }
  const isTidy = () => items.every((i) => { const w = state.get(i)!; return w.kind === 'slot' && w.slot === Number(i.dataset.home); });
  const refresh = (announce?: string) => {
    if (announce) live.textContent = announce;
    tidyText.textContent = isTidy() ? tidyBtn.dataset.messLabel! : tidyBtn.dataset.tidyLabel!;
  };
  tidyBtn.addEventListener('click', () => {
    const tidy = !isTidy();
    // One by one, so it reads as someone putting things away (or not).
    items.forEach((it, i) => {
      state.set(it, tidy ? { kind: 'slot', slot: Number(it.dataset.home) } : { kind: 'pile' });
      window.setTimeout(() => place(it), motionOn() ? i * 110 : 0);
    });
    refresh();
    if (tidy) window.setTimeout(() => say(s.lazy), motionOn() ? items.length * 110 : 0);
  });

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
      if (e.button !== 0 || look) return;
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
          // Everything put away by hand: a thank-you.
          if (putAwayCount() === items.length) say(s.done);
          return;
        }
      }
      const wasSlot = state.get(it)!.kind === 'slot';
      state.set(it, { kind: 'free', fx: (cx - st.left) / st.width, fy: (by - st.top) / st.height });
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

  refresh();
  const ro = new ResizeObserver(layout);
  ro.observe(stage);
  const settle = () => requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('is-settling')));
  layout();
  if (img.complete) settle();
  else {
    img.addEventListener('load', () => { layout(); settle(); }, { once: true });
    window.setTimeout(settle, 2500); // never stay hidden if the image fails
  }
}

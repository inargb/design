// The doodles are Inaiá's own drawings, and purely decorative. They notice you:
//   · they turn slightly toward the pointer (fine pointers, motion on)
//   · leave the page idle and they doze off
//   · [data-doodle-drag] ones can be picked up and moved around the page
//     (mouse, touch or pen); they stay inside the page
import { register } from './registry';

register({
  id: 'doodle',
  init(ctx) {
    const doodles = Array.from(document.querySelectorAll<HTMLElement>('[data-doodle]'));
    if (!doodles.length) return;

    // Look toward the pointer.
    let raf = 0;
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || !ctx.motion()) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        for (const d of doodles) {
          const r = d.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
          const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
          d.style.setProperty('--look-x', `${(dx * 14).toFixed(2)}px`);
          d.style.setProperty('--look-y', `${(dy * 10).toFixed(2)}px`);
          d.style.setProperty('--look-r', `${(dx * 8).toFixed(2)}deg`);
        }
      });
    }, { passive: true });

    // Pick up and move.
    document.querySelectorAll<HTMLElement>('[data-doodle-drag]').forEach(draggable);

    // Idle → sleepy.
    let idle = 0;
    const sleep = () => doodles.forEach((d) => d.classList.add('is-sleepy'));
    const wake = () => {
      doodles.forEach((d) => d.classList.remove('is-sleepy'));
      clearTimeout(idle);
      idle = window.setTimeout(sleep, 45000);
    };
    ['pointermove', 'keydown', 'scroll', 'touchstart'].forEach((ev) => window.addEventListener(ev, wake, { passive: true }));
    wake();
  },
});

function draggable(el: HTMLElement) {
  let dx = 0, dy = 0;          // current offset from where the layout put it
  let sx = 0, sy = 0;          // pointer start
  let ox = 0, oy = 0;          // offset at start
  let held = false;
  let pageH = 0;               // page height before the drag, so it can't grow

  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    held = true;
    sx = e.clientX; sy = e.clientY; ox = dx; oy = dy;
    pageH = document.documentElement.scrollHeight;
    el.setPointerCapture(e.pointerId);
    el.classList.add('is-held');
  });
  el.addEventListener('pointermove', (e) => {
    if (!held) return;
    let nx = ox + e.clientX - sx;
    let ny = oy + e.clientY - sy;
    // Keep it on the page: inside the viewport's width and the page's height.
    const r = el.getBoundingClientRect();
    const left = r.left - dx, top = r.top + window.scrollY - dy;  // un-dragged box
    const maxX = document.documentElement.clientWidth - r.width - left - 2;
    nx = Math.min(Math.max(nx, -left), maxX);
    ny = Math.min(Math.max(ny, -top), pageH - r.height - top);
    dx = nx; dy = ny;
    el.style.setProperty('--drag-x', `${dx}px`);
    el.style.setProperty('--drag-y', `${dy}px`);
  });
  const drop = () => { held = false; el.classList.remove('is-held'); };
  el.addEventListener('pointerup', drop);
  el.addEventListener('pointercancel', drop);
}

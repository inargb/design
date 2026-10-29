// Visitor preferences. The site is light only. Motion is always on,
// except when the visitor's system asks to reduce it.

const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

export function motionOn(): boolean {
  return !mqReduce.matches;
}

function emit() {
  window.dispatchEvent(new CustomEvent('ina:prefs', { detail: { motion: motionOn() } }));
}

mqReduce.addEventListener('change', emit);

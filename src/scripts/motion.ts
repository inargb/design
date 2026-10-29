// Scroll reveals. One observer for the whole page.
//   [data-reveal]  → fades/settles in
//   [data-develop] → image develops from a pale print to full tone
//   [data-stagger] → children reveal in sequence (stagger + a little jitter,
//                    so a row never moves like a machine)
import { motionOn } from './prefs';

const root = document.documentElement;

function token(name: string): number {
  return parseFloat(getComputedStyle(root).getPropertyValue(name)) || 0;
}

export function initReveals(scope: ParentNode = document) {
  const targets = scope.querySelectorAll<HTMLElement>('[data-reveal], [data-develop]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window) || !motionOn()) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const step = token('--stagger-step');
  const jitter = token('--jitter');

  scope.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    Array.from(group.querySelectorAll<HTMLElement>('[data-reveal], [data-develop]')).forEach((el, i) => {
      const delay = i * step + Math.round(Math.random() * jitter);
      el.style.setProperty('--reveal-delay', `${delay}ms`);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    },
    // Start as soon as a sliver is on screen, so a peek below the fold isn't blank.
    { rootMargin: '0px', threshold: 0.02 },
  );
  targets.forEach((el) => io.observe(el));
}

initReveals();

// If motion is switched off mid-visit, show everything that is still waiting.
window.addEventListener('ina:prefs', () => {
  if (!motionOn()) document.querySelectorAll('[data-reveal], [data-develop]').forEach((el) => el.classList.add('is-revealed'));
});

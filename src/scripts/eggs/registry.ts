// Easter-egg system.
//   catalog.ts  → what exists (id, name, hint), identical on every page
//   <egg>.ts    → behaviour; calls register({ id, init })
// init() receives helpers and must be safe on any page (no-op if its
// elements aren't there). Eggs never block content, and every effect has a
// reduced-motion path. Found state is per browser.
import type { L10n, Locale } from '../../i18n/config';
import { motionOn } from '../prefs';
import { catalog } from './catalog';

export interface EggContext {
  locale: Locale;
  motion: () => boolean;
  found: (id: string) => void;
  say: (message: L10n | string) => void;
  t: (value: L10n) => string;
}

const KEY = 'ina:eggs';

export function foundEggs(): string[] {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(list) ? list.filter((id) => catalog.some((e) => e.id === id)) : [];
  } catch { return []; }
}

export const locale: Locale = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en';
const t = (v: L10n) => v[locale];

function toast(text: string) {
  let region = document.querySelector<HTMLElement>('[data-egg-toast]');
  if (!region) {
    region = document.createElement('div');
    region.dataset.eggToast = '';
    region.className = 'egg-toast';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
  }
  const r = region;
  r.textContent = '';
  requestAnimationFrame(() => {
    r.textContent = text;
    r.classList.add('is-on');
    clearTimeout(Number(r.dataset.timer));
    r.dataset.timer = String(window.setTimeout(() => r.classList.remove('is-on'), 4200));
  });
}

export const ctx: EggContext = {
  locale,
  motion: motionOn,
  t,
  say: (m) => toast(typeof m === 'string' ? m : t(m)),
  found: (id) => {
    const list = foundEggs();
    if (list.includes(id)) return;
    list.push(id);
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent('ina:egg-found', { detail: { id, count: list.length, total: catalog.length } }));
  },
};

export function register(egg: { id: string; init: (ctx: EggContext) => void }) {
  try { egg.init(ctx); } catch (err) { console.warn(`[egg:${egg.id}]`, err); }
}

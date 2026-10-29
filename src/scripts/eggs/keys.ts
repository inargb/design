// Shared keyboard plumbing for eggs: single-key shortcuts and typed words.
// Ignores keystrokes while typing in fields or with modifier keys.

type Handler = () => void;
const single = new Map<string, Handler>();
const words = new Map<string, Handler>();
let buffer = '';

function typing(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null;
  return !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
}

document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || typing(e)) return;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;

  clearTimeout(pending);
  if (/^[a-z]$/.test(k)) {
    buffer = (buffer + k).slice(-16);
    for (const [word, fn] of words) {
      if (buffer.endsWith(word)) { buffer = ''; fn(); return; }
    }
  }
  const fn = single.get(e.key === '?' ? '?' : k);
  if (!fn) return;
  e.preventDefault();
  // Letters wait a beat, so typing a secret word doesn't fire its letters.
  if (/^[a-z]$/.test(k)) pending = window.setTimeout(fn, 380);
  else fn();
});
let pending = 0;

export function onKey(key: string, fn: Handler) { single.set(key, fn); }
export function onWord(word: string, fn: Handler) { words.set(word.toLowerCase(), fn); }

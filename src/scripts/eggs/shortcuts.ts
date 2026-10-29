// "?" opens the keyboard sheet.
// Secrets are listed, but only named once found.
import { ctx, foundEggs } from './registry';
import { catalog } from './catalog';
import { onKey } from './keys';

const dialog = document.querySelector<HTMLDialogElement>('[data-shortcuts]');

function fill() {
  const list = dialog?.querySelector<HTMLElement>('[data-egg-list]');
  if (!list) return;
  const found = foundEggs();
  list.innerHTML = '';
  for (const egg of catalog) {
    const li = document.createElement('li');
    const on = found.includes(egg.id);
    li.className = on ? 'is-found' : '';
    const name = document.createElement('span');
    name.className = 'egg-name';
    name.textContent = on ? ctx.t(egg.name) : '???';
    const hint = document.createElement('span');
    hint.className = 'egg-hint';
    hint.textContent = on ? ctx.t(egg.hint) : (list.dataset.unknown ?? '');
    li.append(name, hint);
    list.append(li);
  }
}

function open() {
  if (!dialog) return;
  if (dialog.open) { dialog.close(); return; }
  fill();
  dialog.showModal();
}

onKey('?', open);

document.addEventListener('click', (e) => {
  const t = e.target as Element;
  if (t.closest('[data-shortcuts-open]')) open();
  if (t.closest('[data-shortcuts-close]')) dialog?.close();
});
// Click on the backdrop closes it.
dialog?.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

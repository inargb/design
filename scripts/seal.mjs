// Seal protected case studies.
//
//   CASE_PASSWORD='…' npm run seal
//
// Needs private/<slug>/case.ts (gitignored). Builds the site, takes each
// protected case's rendered body from dist/sealing/<slug>/<locale>/, and
// writes, encrypted with a key derived from the password:
//   src/content/cases/sealed/<slug>.json   header facts (public) + body (AES-GCM)
//   public/sealed/<slug>/<id>.bin          each image/video it uses
// Only these ciphertext files are committed. The password is never stored.
// Then dist/sealing is deleted so plain HTML can't ship by accident.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createHash, webcrypto as wc } from 'node:crypto';
import { execSync } from 'node:child_process';

const password = process.env.CASE_PASSWORD;
if (!password) { console.error('Set CASE_PASSWORD.'); process.exit(1); }
const ITER = 310_000;
const base = (process.env.BASE_PATH ?? '/').replace(/\/$/, '') + '/';
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.avif': 'image/avif', '.mp4': 'video/mp4', '.webm': 'video/webm', '.svg': 'image/svg+xml' };
const b64 = (u8) => Buffer.from(u8).toString('base64');

if (!process.argv.includes('--no-build')) execSync('npx astro build', { stdio: 'inherit' });
const sealDir = 'dist/sealing';
if (!existsSync(sealDir)) { console.error('No protected cases found (private/<slug>/case.ts).'); process.exit(1); }

async function keyFor(salt) {
  const raw = await wc.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return wc.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITER }, raw, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function seal(key, bytes) {
  const iv = wc.getRandomValues(new Uint8Array(12));
  const data = new Uint8Array(await wc.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes));
  return { iv, data };
}
const between = (html, part) => {
  const a = html.indexOf(`<i data-seal-start="${part}"></i>`);
  const b = html.indexOf(`<i data-seal-end="${part}"></i>`);
  if (a < 0 || b < 0) throw new Error(`marker ${part} missing`);
  return html.slice(a + `<i data-seal-start="${part}"></i>`.length, b);
};
// One image per <img>: keep the largest srcset entry ≤ 1600w as src.
function simplifyImages(html) {
  html = html.replace(/<source\b[^>]*>/g, '');
  return html.replace(/<img\b[^>]*>/g, (tag) => {
    const set = tag.match(/\bsrcset="([^"]*)"/);
    if (set) {
      const entries = set[1].split(',').map((x) => x.trim().split(/\s+/)).map(([u, w]) => [u, parseInt(w) || 0]);
      const pick = entries.filter(([, w]) => w <= 1600).sort((a, b) => b[1] - a[1])[0] ?? entries.sort((a, b) => a[1] - b[1])[0];
      tag = tag.replace(/\ssrcset="[^"]*"/, '').replace(/\ssizes="[^"]*"/, '').replace(/\bsrc="[^"]*"/, `src="${pick[0]}"`);
    }
    return tag;
  });
}

for (const slug of readdirSync(sealDir)) {
  const salt = wc.getRandomValues(new Uint8Array(16));
  const key = await keyFor(salt);
  const outMedia = join('public/sealed', slug);
  rmSync(outMedia, { recursive: true, force: true });
  mkdirSync(outMedia, { recursive: true });
  const media = {};
  const assetRe = new RegExp(`${base.replace(/[/.]/g, '\\$&')}_astro/[^"'\\s,)]+`, 'g');
  const body = {};
  let pub;
  for (const locale of ['en', 'pt']) {
    const html = readFileSync(join(sealDir, slug, locale, 'index.html'), 'utf8');
    pub ??= JSON.parse(html.match(/<script type="application\/json" data-seal-public>([\s\S]*?)<\/script>/)[1]);
    const parts = { index: between(html, 'index'), sections: simplifyImages(between(html, 'sections')) };
    for (const k of Object.keys(parts)) {
      parts[k] = parts[k].replace(assetRe, (url) => {
        const file = join('dist', url.slice(base.length));
        const bytes = readFileSync(file);
        const id = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
        if (!media[id]) {
          media[id] = MIME[extname(file).toLowerCase()] ?? 'application/octet-stream';
          media[`__file_${id}`] = file;
        }
        return `sealed:${id}`;
      });
    }
    const { iv, data } = await seal(key, new TextEncoder().encode(JSON.stringify(parts)));
    body[locale] = { iv: b64(iv), data: b64(data) };
  }
  for (const [k, file] of Object.entries(media)) {
    if (!k.startsWith('__file_')) continue;
    const id = k.slice(7);
    const { iv, data } = await seal(key, readFileSync(file));
    writeFileSync(join(outMedia, `${id}.bin`), Buffer.concat([Buffer.from(iv), Buffer.from(data)]));
    delete media[k];
  }
  const out = { slug, tools: pub.tools, facts: pub.facts, crypto: { v: 1, kdf: 'PBKDF2-SHA256', iter: ITER, salt: b64(salt) }, body, media };
  mkdirSync('src/content/cases/sealed', { recursive: true });
  writeFileSync(`src/content/cases/sealed/${slug}.json`, JSON.stringify(out) + '\n');
  console.log(`sealed ${slug}: ${Object.keys(media).length} media files`);
}
rmSync(sealDir, { recursive: true, force: true });
console.log('Done. Rebuild (npm run build) to ship the sealed version.');

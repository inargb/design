// Opening a sealed case in the browser: PBKDF2 turns the password into an
// AES-GCM key; the body (index + sections HTML) and each media file are
// decrypted, and media become blob: URLs. Wrong password → null.
// A portfolio-level gate for client confidentiality, not real security.

interface Payload {
  v: 1; iter: number; salt: string;
  body: { iv: string; data: string };
  media: Record<string, string>;
  slug: string; base: string;
}

const b64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function keyFor(password: string, salt: string, iter: number) {
  const raw = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: b64(salt), iterations: iter },
    raw, { name: 'AES-GCM', length: 256 }, false, ['decrypt'],
  );
}

export async function unseal(p: Payload, password: string): Promise<{ index: string; sections: string } | null> {
  const key = await keyFor(password, p.salt, p.iter);
  let plain: ArrayBuffer;
  try {
    plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(p.body.iv) }, key, b64(p.body.data));
  } catch {
    return null; // wrong password
  }
  const body = JSON.parse(new TextDecoder().decode(plain)) as { index: string; sections: string };

  // Media: each file is iv (12 bytes) + ciphertext at <base>sealed/<slug>/<id>.bin
  const ids = new Set<string>();
  const re = /sealed:([a-f0-9]{16})/g;
  for (const part of [body.index, body.sections]) for (const m of part.matchAll(re)) ids.add(m[1]);
  const urls = new Map<string, string>();
  await Promise.all([...ids].map(async (id) => {
    const res = await fetch(`${p.base.replace(/\/$/, "")}/sealed/${p.slug}/${id}.bin`);
    if (!res.ok) throw new Error(`media ${id}`);
    const buf = new Uint8Array(await res.arrayBuffer());
    const data = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, key, buf.slice(12));
    urls.set(id, URL.createObjectURL(new Blob([data], { type: p.media[id] ?? 'application/octet-stream' })));
  }));
  const swap = (html: string) => html.replace(re, (_, id) => urls.get(id) ?? '');
  return { index: swap(body.index), sections: swap(body.sections) };
}

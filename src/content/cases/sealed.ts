// Protected cases, as committed: public facts + encrypted body (see
// scripts/seal.mjs). The plain source lives in private/<slug>/case.ts,
// which is gitignored; it's only read locally, when sealing.
import type { CaseStudy, SealedCase } from './types';

const files = import.meta.glob<{ default: SealedCase }>('./sealed/*.json', { eager: true });
export const sealedCases: Record<string, SealedCase> = Object.fromEntries(
  Object.values(files).map((m) => [m.default.slug, m.default]),
);

/** What the page needs before unlocking: only the public header facts. */
export function publicStudy(s: SealedCase): CaseStudy {
  return { slug: s.slug, tools: s.tools, facts: s.facts, sections: [] };
}

// Plain sources, present only on the machine that seals.
const sources = import.meta.glob<{ default: CaseStudy }>('/private/*/case.ts', { eager: true });
export const privateCases: Record<string, CaseStudy> = Object.fromEntries(
  Object.values(sources).map((m) => [m.default.slug, m.default]),
);

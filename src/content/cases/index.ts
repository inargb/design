// Every built case study, by slug. Projects without one keep the
// placeholder case page until they're written up.
import type { CaseStudy } from './types';
import { systemsPortal } from './systems-portal';
import { specsGenerator } from './specs-generator';
import { bandoneon } from './bandoneon';

export const cases: Record<string, CaseStudy> = {
  [systemsPortal.slug]: systemsPortal,
  [specsGenerator.slug]: specsGenerator,
  [bandoneon.slug]: bandoneon,
};

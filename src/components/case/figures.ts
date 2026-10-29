// How many numbered figures a block holds (figure numbers run through the
// whole case, image slots included, so filling a slot never renumbers).
import type { CaseBlock } from '../../content/cases/types';

export function figures(b: CaseBlock): number {
  if (b.type === 'figure') return 1;
  if (b.type === 'gallery') return b.images.length;
  if (b.type === 'slots') return b.items.length;
  return 0;
}

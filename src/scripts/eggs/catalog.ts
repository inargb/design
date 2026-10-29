// The catalog of secrets: metadata only, shared by every page so the
// footer and the "?" sheet can count them even where an egg doesn't live.
// Behaviour lives in the matching module and registers by id.
import type { L10n } from '../../i18n/config';

export interface EggMeta { id: string; name: L10n; hint: L10n; }

export const catalog: EggMeta[] = [
  { id: 'frames', name: { en: 'Three kinds of frames', pt: 'Três tipos de frame' }, hint: { en: 'play with the word “frames” on the home page', pt: 'brinque com a palavra “frames” na home' } },
  { id: 'spec', name: { en: 'Spec mode', pt: 'Modo spec' }, hint: { en: 'press S, or the ruler in the footer', pt: 'aperte S, ou a régua no rodapé' } },
  { id: 'shelf', name: { en: 'A tidy shelf', pt: 'Uma estante arrumada' }, hint: { en: 'organize the shelf on the about page', pt: 'arrume a estante na página sobre' } },
  { id: 'stars', name: { en: 'City of stars', pt: 'Cidade das estrelas' }, hint: { en: 'a certain DVD on the shelf', pt: 'um certo DVD na estante' } },
  { id: 'yashica', name: { en: 'Dad’s Yashica', pt: 'A Yashica do meu pai' }, hint: { en: 'a little camera hides at the bottom of every page (or type its name)', pt: 'uma camerazinha se esconde no pé de toda página (ou digite o nome dela)' } },
];

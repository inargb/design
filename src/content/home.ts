// Home page copy. The headline is the site description in Inaiá's words;
// "currently" and "previously" come from the experience on the About page.
import type { L10n } from '../i18n/config';

export const home = {
  headline: {
    en: 'Inaiá Silva is a product designer who builds systems, specs and interfaces for every screen size.',
    pt: 'Inaiá Silva é product designer e cria sistemas, specs e interfaces para todos os tamanhos de tela.',
  } as L10n,

  now: [
    {
      label: { en: 'Currently', pt: 'Atualmente' } as L10n,
      body: { en: 'UX/UI Designer at Volanté Systems, designing POS and back-office tools for restaurants and bars.', pt: 'UX/UI Designer na Volanté Systems, desenhando ferramentas de PDV e back-office para bares e restaurantes.' } as L10n,
    },
    {
      label: { en: 'Previously', pt: 'Antes' } as L10n,
      body: { en: 'Visual Designer at FNDE and UX/UI Designer Intern at the Ministry of Agriculture and Livestock.', pt: 'Designer Visual no FNDE e estagiária de UX/UI no Ministério da Agricultura e Pecuária.' } as L10n,
    },
  ],

  workLabel: { en: 'Selected work', pt: 'Projetos selecionados' } as L10n,
};

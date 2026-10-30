import type { L10n } from '../i18n/config';

export const site = {
  name: 'Inaiá Silva',
  title: { en: 'Inaiá Silva — product designer', pt: 'Inaiá Silva — product designer' } as L10n,
  description: {
    en: 'Inaiá Silva is a product designer who builds systems, specs and interfaces for every screen size, with an absurd number of frames.',
    pt: 'Inaiá Silva é product designer e cria sistemas, specs e interfaces para todos os tamanhos de tela, com um número absurdo de frames.',
  } as L10n,
  links: {
    // Each language opens its own resume, kept on Google Drive (edit it
    // there and the site follows).
    resume: {
      en: 'https://drive.google.com/file/d/1miBuwR-TKOShBivabfqMsKO-y2s6D1Km/view',
      pt: 'https://drive.google.com/file/d/1gXMu1hnaAE2WaqIbyM6UyTFFYaD0Hi7i/view',
    } as L10n,
    linkedin: 'https://www.linkedin.com/in/inaia-silva/',
    instagram: 'https://www.instagram.com/inaimg/',
    design: 'https://inasilva.myportfolio.com/work',
  },
};

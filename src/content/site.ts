import { withBase, type L10n } from '../i18n/config';

export const site = {
  name: 'Inaiá Silva',
  title: { en: 'Inaiá Silva — product designer', pt: 'Inaiá Silva — product designer' } as L10n,
  description: {
    en: 'Inaiá Silva is a product designer who builds systems, specs and interfaces for every screen size, with an absurd number of frames.',
    pt: 'Inaiá Silva é product designer e cria sistemas, specs e interfaces para todos os tamanhos de tela, com um número absurdo de frames.',
  } as L10n,
  links: {
    // Each language opens its own resume, a PDF in public/resume/.
    resume: {
      en: withBase('/resume/inaia-silva-resume.pdf'),
      pt: withBase('/resume/inaia-silva-curriculo.pdf'),
    } as L10n,
    linkedin: 'https://www.linkedin.com/in/inaia-silva/',
    instagram: 'https://www.instagram.com/inaimg/',
    design: 'https://inasilva.myportfolio.com/work',
  },
};

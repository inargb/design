// Project index: the data behind the work grid, covers and case routes.
// Facts here come only from the current portfolio (public pages) and the
// Menu Management brief. Nothing is invented; unknowns are left out.
import type { L10n } from '../i18n/config';

export type ProjectState = 'open' | 'locked' | 'soon';

// Status shape works without colour: ● live / in use · ◐ prototype tested
// · lock = protected · ○ developing.
export type StatusKind = 'live' | 'prototype' | 'locked' | 'developing';

// Every card answers the same questions in the same place:
// cover · title · period · context · role · status.
export interface Project {
  slug: string;
  frame: string;              // frame number
  state: ProjectState;        // open (linked) · locked (password) · soon (no link)
  title: L10n;
  line: L10n;                 // description, 15+ words (card + case page)
  context: L10n;              // client / setting
  role: L10n;                 // '—' until known
  period: L10n;               // always a year range, '—' until known
  duration?: L10n;            // lives on the case page, never on the card
  status: L10n;
  statusKind: StatusKind;
  tags: L10n[];
  media: CoverMedia;          // uploaded cover image or video
  liveUrl?: string;           // current case on inasilva.com (until rebuilt)
}

// Uploaded covers live in public/covers/ (paths without the base, e.g.
// 'covers/pocabin.mp4'). Sources are 16:9; the card frame changes shape per
// breakpoint (16:10 desktop, 4:3 tablet and phone), so each cover says where
// its subject is (`focus`, an object-position) and how far to zoom into it.
// Animated covers are MP4/WebM (GIFs converted: same look, ~10× lighter)
// with a still poster for loading and reduced motion. GIF sources are kept
// in design/covers-src/.
export interface CoverMedia {
  image?: { src: string; small: string };   // 1600w + 800w stills
  video?: { mp4: string; webm: string };
  poster?: string;                          // still frame for a video
  alt: L10n;                                // describes the product, not the animation
  focus?: string;                           // e.g. '30% 50%'
  zoom?: number;                            // 1 = fit, >1 crops tighter around focus
}


const tag = (en: string, pt: string): L10n => ({ en, pt });
const unknown: L10n = { en: '—', pt: '—' };

export const projects: Project[] = [
  {
    slug: 'bar-tabs-system',
    frame: '01',
    state: 'locked',
    title: { en: 'Bar Tabs System', pt: 'Sistema de Comandas' },
    line: {
      en: 'A bar-tab product for hospitality and food service businesses across North America, designed within an established point-of-sale platform and its design system.',
      pt: 'Um produto de comandas para bares e restaurantes na América do Norte, criado dentro de uma plataforma de PDV já estabelecida e do seu design system.',
    },
    context: { en: 'POS · Hospitality', pt: 'PDV · Hospitalidade' },
    role: { en: 'UX/UI designer', pt: 'UX/UI designer' },
    period: { en: '2024 — 2026', pt: '2024 — 2026' },
    status: { en: 'protected case', pt: 'case protegido' },
    statusKind: 'locked',
    tags: [tag('POS', 'PDV'), tag('Design systems', 'Design systems')],
    media: {
      image: { src: 'covers/bar-tabs-1600.webp', small: 'covers/bar-tabs-800.webp' },
      alt: { en: 'The Bar Tabs screen in dark mode: a selected tab’s details on the left and open tabs as colour-coded cards.', pt: 'A tela de comandas no modo escuro: os detalhes de uma comanda à esquerda e as comandas abertas como cards coloridos.' },
      focus: '50% 50%',
      zoom: 1.2,
    },
  },
  {
    slug: 'menu-management',
    frame: '02',
    state: 'locked',
    title: { en: 'Menu Management', pt: 'Gestão de Cardápios' },
    line: {
      en: 'A year-long redesign of the back-office module behind every POS and kiosk menu, rethinking the information architecture of an enterprise tool.',
      pt: 'Um ano redesenhando o módulo de back-office por trás de cada cardápio de PDV e totem, repensando a arquitetura da informação de uma ferramenta enterprise.',
    },
    context: { en: 'Enterprise · Back office', pt: 'Enterprise · Back office' },
    role: { en: 'UX/UI designer', pt: 'UX/UI designer' },
    period: { en: '2025 — ongoing', pt: '2025 — em andamento' },
    status: { en: 'protected case', pt: 'case protegido' },
    statusKind: 'locked',
    tags: [
      tag('Enterprise software', 'Software enterprise'),
      tag('Information architecture', 'Arquitetura da informação'),
    ],
    media: {
      image: { src: 'covers/menu-management-1600.webp', small: 'covers/menu-management-800.webp' },
      alt: { en: 'The Menu Management workspace: a menu tree on the left and a list of items with prices beside it. Brand and staff names are blurred.', pt: 'O espaço de trabalho de Gestão de Cardápios: a árvore do cardápio à esquerda e a lista de itens com preços ao lado. Marca e nomes de pessoas estão desfocados.' },
      focus: '22% 40%',
    },
  },
  {
    slug: 'responsive-specs-and-accessibility-generator',
    frame: '03',
    state: 'open',
    title: {
      en: 'Responsive Specs & Accessibility Generator',
      pt: 'Gerador de Specs Responsivas & Acessibilidade',
    },
    line: {
      en: 'A Figma Make tool that turned a week of handoff documentation into two days, generating responsive specs and accessibility notes every sprint.',
      pt: 'Uma ferramenta no Figma Make que transformou uma semana de documentação de handoff em dois dias, gerando specs responsivas e notas de acessibilidade a cada sprint.',
    },
    context: { en: 'Internal tool · Handoff', pt: 'Ferramenta interna · Handoff' },
    role: { en: 'Design lead', pt: 'Líder de design' },
    period: { en: '2025', pt: '2025' },
    duration: { en: '2 months', pt: '2 meses' },
    status: { en: 'in use every sprint', pt: 'em uso a cada sprint' },
    statusKind: 'live',
    tags: [tag('AI-driven', 'IA'), tag('Documentation', 'Documentação'), tag('Design systems', 'Design systems')],
    media: {
      video: { mp4: 'covers/specs-generator.mp4', webm: 'covers/specs-generator.webm' },
      poster: 'covers/specs-generator-poster.webp',
      alt: { en: 'The generator documenting a product page: panels of measurements in px and vw, with contrast warnings.', pt: 'O gerador documentando uma página de produto: painéis de medidas em px e vw, com alertas de contraste.' },
      focus: '12% 50%',
    },
    liveUrl: 'https://inasilva.com/works/responsive-specs-and-accessibility-generator',
  },
  {
    slug: 'systems-portal',
    frame: '04',
    state: 'open',
    title: { en: 'Systems Portal', pt: 'Portal de Sistemas' },
    line: {
      en: 'Making 100+ government systems findable, for a fisherman in Pará and a ministry clerk alike, through user research and a full redesign.',
      pt: 'Tornando 100+ sistemas do governo fáceis de achar, para um pescador no Pará e para um servidor do ministério, com pesquisa e um redesign completo.',
    },
    context: { en: 'Ministry of Agriculture and Livestock', pt: 'Ministério da Agricultura e Pecuária' },
    role: { en: 'UX/UI designer intern', pt: 'Estagiária de UX/UI' },
    period: { en: '2023', pt: '2023' },
    duration: { en: '4 months', pt: '4 meses' },
    status: { en: 'live', pt: 'no ar' },
    statusKind: 'live',
    tags: [tag('UX/UI', 'UX/UI'), tag('Research', 'Pesquisa'), tag('Redesign', 'Redesign')],
    media: {
      video: { mp4: 'covers/systems-portal.mp4', webm: 'covers/systems-portal.webm' },
      poster: 'covers/systems-portal-poster.webp',
      alt: { en: 'The redesigned Systems Portal: a search bar and a grid of the most accessed systems.', pt: 'O Portal de Sistemas redesenhado: uma busca e uma grade com os sistemas mais acessados.' },
      focus: '62% 45%',
    },
    liveUrl: 'https://inasilva.com/works/systems-portal',
  },
  {
    slug: 'bandoneon-iniciative',
    frame: '05',
    state: 'open',
    title: { en: 'Bandoneón Initiative', pt: 'Iniciativa Bandoneón' },
    line: {
      en: 'A cooking app for a social project that teaches culinary skills on the road, taken from its design system to a tested prototype.',
      pt: 'Um app de culinária para um projeto social de educação gastronômica itinerante, levado do seu design system até um protótipo testado.',
    },
    context: { en: 'Academic', pt: 'Acadêmico' },
    role: { en: 'Lead designer', pt: 'Designer líder' },
    period: { en: '2022', pt: '2022' },
    duration: { en: '6 months', pt: '6 meses' },
    status: { en: 'prototype, tested', pt: 'protótipo testado' },
    statusKind: 'prototype',
    tags: [tag('UX/UI', 'UX/UI'), tag('Design systems', 'Design systems'), tag('Case study', 'Estudo de caso')],
    media: {
      image: { src: 'covers/bandoneon-1600.webp', small: 'covers/bandoneon-800.webp' },
      alt: { en: 'Two phones with the Bandoneón app: the green splash screen and the recipe of the day.', pt: 'Dois celulares com o app Bandoneón: a tela de abertura verde e a receita do dia.' },
      focus: '52% 50%',
      zoom: 1.1,
    },
    liveUrl: 'https://inasilva.com/works/bandoneon-iniciative',
  },
  {
    slug: 'sabi',
    frame: '06',
    state: 'soon',
    title: { en: 'Sabi', pt: 'Sabi' },
    line: {
      en: 'Turning any dish or menu into the right allergen question: an app still in UX research, being designed one careful step at a time.',
      pt: 'Transformando qualquer prato ou cardápio na pergunta certa sobre alérgenos: um app ainda em pesquisa de UX, sendo criado com calma, passo a passo.',
    },
    context: { en: 'Product · app', pt: 'Produto · app' },
    role: unknown,
    period: unknown,
    status: { en: 'in progress', pt: 'em andamento' },
    statusKind: 'developing',
    tags: [tag('UX/UI research', 'Pesquisa UX/UI'), tag('Product', 'Produto'), tag('App', 'App')],
    media: {
      image: { src: 'covers/sabi-1600.webp', small: 'covers/sabi-800.webp' },
      alt: { en: 'The Sabi mark: three rounded bars with a yellow dot in the middle.', pt: 'A marca do Sabi: três barras arredondadas com um ponto amarelo no meio.' },
      focus: '50% 50%',
      zoom: 1.4,
    },
  },
  {
    slug: 'photocard-binder',
    frame: '07',
    state: 'soon',
    title: { en: 'Pocabin', pt: 'Pocabin' },
    line: {
      en: 'A digital binder for organizing and tracking K-pop photocard collections, a side project designed and vibe-coded as a website, still developing.',
      pt: 'Um binder digital para organizar e acompanhar coleções de photocards de K-pop, um projeto pessoal criado e vibe-codado como website, ainda em desenvolvimento.',
    },
    context: { en: 'Side project', pt: 'Projeto pessoal' },
    role: unknown,
    period: unknown,
    status: { en: 'in progress', pt: 'em andamento' },
    statusKind: 'developing',
    tags: [tag('Website', 'Website'), tag('Product', 'Produto'), tag('Vibe-coding', 'Vibe-coding')],
    media: {
      video: { mp4: 'covers/pocabin.mp4', webm: 'covers/pocabin.webm' },
      poster: 'covers/pocabin-poster.webp',
      alt: { en: 'Pocabin: a digital binder opening to pages of photocards and a collection list.', pt: 'Pocabin: um binder digital abrindo em páginas de photocards e uma lista da coleção.' },
      focus: '50% 45%',
      zoom: 1.3,
    },
  },
];

export const caseProjects = projects.filter((p) => p.state !== 'soon');

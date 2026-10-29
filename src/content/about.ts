// About page content. Sourced from the current inasilva.com About page.
// Lines marked DRAFT are light rewrites of Inaiá's own words; review them.
import type { ImageMetadata } from 'astro';
import type { L10n } from '../i18n/config';
import shelfImg from '../assets/shelf/shelf.png';
import camera from '../assets/shelf/camera.png';
import lalaland from '../assets/shelf/lalaland.jpg';
import harry from '../assets/shelf/harry.png';
import amelie from '../assets/shelf/amelie.png';
import popeye from '../assets/shelf/popeye.jpg';
import vogue from '../assets/shelf/vogue.jpg';
import ipod from '../assets/shelf/ipod.png';
import sneakers from '../assets/shelf/sneakers.png';
import plant from '../assets/shelf/plant.png';
import portrait from '../assets/about/portrait.jpg';

const l = (en: string, pt: string): L10n => ({ en, pt });

export const about = {
  portrait,
  intro: {
    label: l('about', 'sobre'),
    title: l('Curiosity about people and things led me here.', 'A curiosidade por pessoas e coisas me trouxe até aqui.'),
    body: l(
      'I design with attention to detail, to make things clearer and more meaningful. So, with that in mind, I need your help…',
      'Eu desenho com atenção aos detalhes, para deixar as coisas mais claras e com mais sentido. Então, pensando nisso, preciso da sua ajuda…',
    ),
    ask: l('can you organize my shelf for me? :)', 'você pode arrumar minha estante pra mim? :)'),
  },

  hello: {
    title: l('hey, I’m Inaiá', 'oi, eu sou a Inaiá'),
    // DRAFT: rewritten from the current bio.
    body: [
      l(
        'I’m a product designer with 3+ years of building digital products, most recently POS and back-office tools used by restaurants and bars.',
        'Sou product designer há mais de 3 anos, criando produtos digitais. Nos últimos tempos, ferramentas de PDV e back-office usadas por bares e restaurantes.',
      ),
      l(
        'I believe good design is mostly about how clearly things communicate. I do my best work where research meets the messy middle: turning tangled problems into interfaces that explain themselves.',
        'Acredito que bom design é, principalmente, sobre o quão claro as coisas se comunicam. Meu melhor trabalho acontece onde a pesquisa encontra a bagunça: transformar problemas enrolados em interfaces que se explicam sozinhas.',
      ),
    ],
    portraitAlt: l('Inaiá smiling outdoors, with red hair and round glasses.', 'Inaiá sorrindo ao ar livre, de cabelo vermelho e óculos redondos.'),
  },

  disciplines: {
    label: l('what I do', 'o que eu faço'),
    items: [
      { glyph: '▣', label: l('UI design', 'UI design') },
      { glyph: '?', label: l('User research', 'Pesquisa com usuários') },
      { glyph: '▦', label: l('Design systems', 'Design systems') },
      { glyph: '⊛', label: l('Atomic design', 'Atomic design') },
      { glyph: '◈', label: l('Design tokens', 'Design tokens') },
      { glyph: '◐', label: l('Accessibility (WCAG)', 'Acessibilidade (WCAG)') },
      { glyph: '↻', label: l('High-fidelity prototyping', 'Prototipação em alta fidelidade') },
      { glyph: '⊞', label: l('Wireframing', 'Wireframes') },
      { glyph: '↔', label: l('Responsive design', 'Design responsivo') },
      { glyph: '¶', label: l('UX writing', 'UX writing') },
      { glyph: '⇆', label: l('Benchmarking', 'Benchmarking') },
      { glyph: 'Aa', label: l('Typography', 'Tipografia') },
      { glyph: '❡', label: l('Editorial design', 'Design editorial') },
      { glyph: '⋈', label: l('Cross-functional collaboration', 'Colaboração multidisciplinar') },
      { glyph: '$', label: l('Enterprise financial systems', 'Sistemas financeiros corporativos') },
      { glyph: '@', label: l('Social media', 'Redes sociais') },
      { glyph: '※', label: l('Internal marketing', 'Marketing interno') },
      { glyph: '✂', label: l('Mixed media art', 'Arte mista') },
    ],
  },

  tools: {
    label: l('tools on my desk', 'ferramentas na mesa'),
    items: [
      { key: 'Fi', name: 'Figma' },
      { key: 'No', name: 'Notion' },
      { key: 'Ad', name: 'Adobe Creative Suite (Photoshop, Illustrator, InDesign, Premiere)' },
      { key: 'Of', name: 'Microsoft Office' },
      { key: 'At', name: 'Atlassian' },
      { key: 'Gw', name: 'Google Workspace' },
      { key: 'Cl', name: 'Claude' },
      { key: 'Cx', name: 'Codex' },
      { key: 'Nb', name: 'NotebookLM' },
    ],
  },

  experience: {
    label: l('experience', 'experiência'),
    items: [
      { org: 'Volanté Systems', role: l('UX/UI Designer', 'UX/UI Designer'), when: l('2024 → present', '2024 → hoje') },
      {
        org: l('National Fund for Educational Development (FNDE)', 'Fundo Nacional de Desenvolvimento da Educação (FNDE)'),
        role: l('Visual Designer', 'Designer Visual'),
        when: l('2023 → 2024', '2023 → 2024'),
      },
      {
        org: l('Ministry of Agriculture and Livestock', 'Ministério da Agricultura e Pecuária'),
        role: l('UX/UI Designer Intern', 'Estagiária de UX/UI'),
        when: l('2023', '2023'),
      },
    ],
  },

  // Newest first, in two groups. Course names stay in English in both
  // languages: they're the official titles recruiters search for.
  education: {
    label: l('education', 'formação'),
    groups: [
      {
        heading: l('Degrees', 'Formação'),
        items: [
          {
            period: l('2025 — 2026', '2025 — 2026'),
            title: l('Postgraduate Specialization in User Experience Design', 'Especialização em User Experience Design'),
            org: l('PUCRS', 'PUCRS'),
          },
          {
            period: l('2021 — 2023', '2021 — 2023'),
            title: l('Bachelor’s degree (Technologist) in Graphic Design', 'Tecnólogo em Design Gráfico'),
            org: l('IESB University Center', 'Centro Universitário IESB'),
          },
        ],
      },
      {
        heading: l('Courses', 'Cursos'),
        items: [
          { period: l('2026', '2026'), title: l('WAI0.1x: Introduction to Web Accessibility', 'WAI0.1x: Introduction to Web Accessibility'), org: l('W3C (edX)', 'W3C (edX)') },
          { period: l('2023', '2023'), title: l('Foundations of User Experience (UX) Design', 'Foundations of User Experience (UX) Design'), org: l('Google', 'Google') },
        ],
      },
    ],
  },

  words: {
    label: l('kind words', 'palavras gentis'),
    title: l('Things people said, kept in a drawer.', 'Coisas que as pessoas disseram, guardadas numa gaveta.'),
    drawer: {
      front: l('kind words', 'palavras'),
      open: l('open the drawer', 'abrir a gaveta'),
      close: l('close drawer', 'fechar gaveta'),
      read: l('read note', 'ler bilhete'),
      putBack: l('put it back', 'guardar'),
      prev: l('previous note', 'bilhete anterior'),
      next: l('next note', 'próximo bilhete'),
      of: l('of', 'de'),
    },
    items: [
      {
        quote: l(
          'A valuable addition to any team, as Inaia [[combines creativity]] with a strong technical understanding of graphic design. Her commitment, responsibility, and excellence consistently stood out during her studies.',
          'Uma adição valiosa para qualquer time, porque a Inaiá [[une criatividade]] a um conhecimento técnico sólido de design gráfico. Seu comprometimento, responsabilidade e excelência sempre se destacaram durante os estudos.',
        ),
        name: 'Marco Aurélio Lobo Junior',
        role: l('Coordinator – CST Graphic Design @IESB', 'Coordenador – CST Design Gráfico @IESB'),
      },
      {
        quote: l(
          'Incredible attention to detail, design skills, and reliability. Refine designs and [[create great prototypes]], helping to meet tight deadlines.',
          'Atenção aos detalhes, habilidade em design e confiabilidade incríveis. Refina designs e [[cria ótimos protótipos]], ajudando a cumprir prazos apertados.',
        ),
        name: 'Simon Lustgarten',
        role: l('Product Owner @Volanté Systems', 'Product Owner @Volanté Systems'),
      },
      {
        quote: l(
          'During her internship as a UX/UI Designer at the Ministry of Agriculture and Livestock, she showed great receptiveness to feedback, [[strong collaboration skills]], and consistent excellence in her work.',
          'Durante o estágio como UX/UI Designer no Ministério da Agricultura e Pecuária, ela mostrou grande abertura a feedback, [[ótima capacidade de colaboração]] e excelência constante no trabalho.',
        ),
        name: 'Liliane dos Santos',
        role: l('General Coordinator – Digital Innovation and Transformation', 'Coordenadora-Geral – Inovação e Transformação Digital'),
      },
      {
        quote: l(
          'Transforms concepts into user centered, high quality interfaces aligned with the product vision. [[Proactive and detail-oriented]], she identifies issues, collaborates with QA, and communicates clearly.',
          'Transforma conceitos em interfaces de alta qualidade, centradas no usuário e alinhadas à visão do produto. [[Proativa e detalhista]], identifica problemas, colabora com QA e se comunica com clareza.',
        ),
        name: 'Parmis Meshgi',
        role: l('Senior Product Designer @Volanté Systems', 'Senior Product Designer @Volanté Systems'),
      },
      {
        quote: l(
          'Work focused on [[accessibility and inclusion]] through design, creating visual communication materials, and enhancing document clarity and presentation.',
          'Trabalho focado em [[acessibilidade e inclusão]] por meio do design, criando materiais de comunicação visual e melhorando a clareza e a apresentação de documentos.',
        ),
        name: 'Thaciana Cerqueira',
        role: l('General Coordinator of IT Governance @FNDE', 'Coordenadora-Geral de Governança de TI @FNDE'),
      },
    ],
  },

  art: {
    label: l('love for art', 'amor pela arte'),
    title: l('Design is my language, but art is where I charge.', 'Design é minha linguagem, mas é na arte que eu recarrego.'),
    body: [
      l(
        'I grew up surrounded by music, cinema and street photography, and that sensibility bleeds into everything I make.',
        'Cresci cercada de música, cinema e fotografia de rua, e essa sensibilidade escorre para tudo o que eu faço.',
      ),
      l(
        'I’m always carrying an old Yashica camera (it used to be my dad’s) everywhere I go. Registering life in such a nostalgic, slow way is beautiful to me.',
        'Ando sempre com uma Yashica antiga (que era do meu pai) para todo lado. Registrar a vida de um jeito tão nostálgico e lento é lindo pra mim.',
      ),
      l(
        'The time I feel happiest is when I get to see developed pictures I don’t even remember taking. It’s good to be reminded of moments and people :)',
        'O momento em que me sinto mais feliz é quando vejo fotos reveladas que eu nem lembro de ter tirado. É bom lembrar de momentos e pessoas :)',
      ),
    ],
    strip: l('Film strip of photographs', 'Filme com fotografias'),
  },
};

// ---- The shelf ------------------------------------------------------------
// Positions are fractions of the shelf photo (slots) or of the pile area.
// Notes: Inaiá, replace these with your own one-liners.

export interface ShelfObject {
  id: string;
  src: ImageMetadata;
  name: L10n;
  note: L10n;
  size: number;            // width as a fraction of the shelf photo width
  home: number;            // the slot "tidy up for me" puts it in (0–8, top-left → bottom-right)
  pile: [number, number, number]; // x, y (centre-bottom, fraction of pile) + rotation
}

export const shelf = {
  image: shelfImg,
  imageAlt: l('An empty metal wire shelf with three levels.', 'Uma estante de arame vazia, com três prateleiras.'),
  // [x, y] = centre-bottom anchor on the photo, as fractions.
  slots: [
    [0.25, 0.1], [0.5, 0.1], [0.75, 0.1],
    [0.25, 0.46], [0.5, 0.46], [0.75, 0.46],
    [0.27, 0.84], [0.52, 0.84], [0.76, 0.84],
  ] as [number, number][],
  objects: [
    { id: 'lalaland', src: lalaland, size: 0.17, home: 4, pile: [0.14, 0.34, -6], name: l('La La Land', 'La La Land'), note: l('La La Land (2016)', 'La La Land (2016)') },
    { id: 'harry', src: harry, size: 0.17, home: 3, pile: [0.38, 0.3, 4], name: l('When Harry Met Sally…', 'Harry & Sally'), note: l('When Harry Met Sally… (1989)', 'Harry & Sally: Feitos um para o Outro (1989)') },
    { id: 'camera', src: camera, size: 0.23, home: 2, pile: [0.66, 0.22, -3], name: l('Yashica camera', 'Câmera Yashica'), note: l('dad’s old Yashica. always in my bag.', 'a Yashica antiga do meu pai. sempre na bolsa.') },
    { id: 'vogue', src: vogue, size: 0.17, home: 7, pile: [0.85, 0.38, 5], name: l('Vogue', 'Vogue'), note: l('Vogue', 'Vogue') },
    { id: 'amelie', src: amelie, size: 0.16, home: 5, pile: [0.24, 0.7, 3], name: l('Amélie', 'O Fabuloso Destino de Amélie Poulain'), note: l('Amélie (2001)', 'O Fabuloso Destino de Amélie Poulain (2001)') },
    { id: 'popeye', src: popeye, size: 0.17, home: 6, pile: [0.5, 0.64, -4], name: l('Popeye magazine', 'Revista Popeye'), note: l('Popeye magazine', 'revista Popeye') },
    { id: 'ipod', src: ipod, size: 0.13, home: 1, pile: [0.76, 0.66, 6], name: l('iPod classic', 'iPod clássico'), note: l('iPod classic', 'iPod clássico') },
    { id: 'sneakers', src: sneakers, size: 0.25, home: 8, pile: [0.3, 0.98, -2], name: l('Shoes', 'Sapatos'), note: l('Onitsuka Tiger shoes', 'sapatos Onitsuka Tiger') },
    { id: 'plant', src: plant, size: 0.23, home: 0, pile: [0.72, 0.99, 0], name: l('A plant', 'Uma planta'), note: l('a plant', 'uma planta') },
  ] as ShelfObject[],
  ui: {
    help: l(
      'Drag things onto the shelf. With a keyboard, press Enter on an item to put it away or take it back.',
      'Arraste as coisas para a estante. No teclado, aperte Enter em um item para guardar ou tirar de lá.',
    ),
    tidy: l('tidy up for me', 'arruma pra mim'),
    mess: l('mess it up again', 'bagunçar de novo'),
    placed: l('{name} is on the shelf. {n} of {total} put away.', '{name} está na estante. {n} de {total} guardados.'),
    removed: l('{name} is back on the floor.', '{name} voltou pro chão.'),
    done: l('thank you! it looks so much better :)', 'obrigada! ficou muito melhor :)'),
    lazy: l('ok, I did it myself. thanks anyway :)', 'tá, eu mesma arrumei. obrigada mesmo assim :)'),
    stars: l('city of stars ✦', 'cidade das estrelas ✦'),
  },
};

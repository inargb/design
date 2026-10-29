// About page content. Sourced from the inasilva.com About page.
// Lines marked DRAFT are light rewrites of Inaiá's own words; review them.
import type { L10n } from '../i18n/config';
import portrait from '../assets/about/portrait.jpg';

const l = (en: string, pt: string): L10n => ({ en, pt });

export const about = {
  portrait,
  intro: {
    label: l('About', 'Sobre'),
    title: l('Curiosity about people and things led me here.', 'A curiosidade por pessoas e coisas me trouxe até aqui.'),
    body: l(
      'I design with attention to detail, to make things clearer and more meaningful.',
      'Eu crio com atenção aos detalhes, para deixar as coisas mais claras e com mais sentido.',
    ),
  },

  hello: {
    title: l('Hey, I’m Inaiá', 'Oi, eu sou a Inaiá'),
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

  // Skills and tools as listed on the CV (public/resume/).
  disciplines: {
    label: l('Skills', 'Habilidades'),
    items: [
      { label: l('End-to-end product design', 'Product design end to end') },
      { label: l('Research and usability testing', 'Pesquisa e testes de usabilidade') },
      { label: l('Design systems and tokens', 'Design systems e tokens') },
      { label: l('Complex B2B systems', 'Sistemas B2B complexos') },
      { label: l('Accessibility (WCAG)', 'Acessibilidade (WCAG)') },
      { label: l('Design with AI agents', 'Design com agentes de IA') },
      { label: l('Stakeholder alignment', 'Alinhamento com stakeholders') },
      { label: l('Structured developer handoff', 'Handoff estruturado para o desenvolvimento') },
      { label: l('Mid- to high-fidelity prototyping', 'Prototipação, média a alta fidelidade') },
    ],
  },

  tools: {
    label: l('Tools', 'Ferramentas'),
    items: [
      { name: 'Figma' },
      { name: 'Anthropic (Claude)' },
      { name: 'Codex' },
      { name: 'GitHub' },
      { name: 'Jira' },
      { name: 'Notion' },
      { name: 'Framer' },
      { name: 'Adobe Creative Cloud' },
    ],
  },

  design: {
    label: l('Design', 'Design'),
    items: [
      l('Typography', 'Tipografia'),
      l('Editorial design', 'Design editorial'),
      l('Social media', 'Redes sociais'),
      l('Internal marketing', 'Marketing interno'),
      l('Mixed media art', 'Arte mista'),
    ],
  },

  experience: {
    label: l('Experience', 'Experiência'),
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
    label: l('Education', 'Formação'),
    groups: [
      {
        heading: l('Degrees', 'Formação'),
        items: [
          {
            period: l('2025 → 2026', '2025 → 2026'),
            title: l('Postgraduate Specialization in User Experience Design', 'Especialização em User Experience Design'),
            org: l('PUCRS', 'PUCRS'),
          },
          {
            period: l('2021 → 2023', '2021 → 2023'),
            title: l('Bachelor’s degree (Technologist) in Graphic Design', 'Tecnólogo em Design Gráfico'),
            org: l('IESB University Center', 'Centro Universitário IESB'),
          },
        ],
      },
      {
        heading: l('Certifications', 'Certificações'),
        items: [
          { period: l('2026', '2026'), title: l('WAI0.1x: Introduction to Web Accessibility', 'WAI0.1x: Introduction to Web Accessibility'), org: l('W3C (edX)', 'W3C (edX)') },
          { period: l('2023', '2023'), title: l('Foundations of User Experience (UX) Design', 'Foundations of User Experience (UX) Design'), org: l('Google', 'Google') },
        ],
      },
    ],
  },

  words: {
    label: l('Kind words', 'Palavras gentis'),
    title: l('Things people said, kept in a drawer.', 'Coisas que as pessoas disseram, guardadas numa gaveta.'),
    items: [
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
          'Incredible attention to detail, design skills, and reliability. Refine designs and [[create great prototypes]], helping to meet tight deadlines.',
          'Atenção aos detalhes, habilidade em design e confiabilidade incríveis. Refina designs e [[cria ótimos protótipos]], ajudando a cumprir prazos apertados.',
        ),
        name: 'Simon Lustgarten',
        role: l('Product Owner @Volanté Systems', 'Product Owner @Volanté Systems'),
      },
      {
        quote: l(
          'Work focused on [[accessibility and inclusion]] through design, creating visual communication materials, and enhancing document clarity and presentation.',
          'Trabalho focado em [[acessibilidade e inclusão]] por meio do design, criando materiais de comunicação visual e melhorando a clareza e a apresentação de documentos.',
        ),
        name: 'Thaciana Cerqueira',
        role: l('General Coordinator of IT Governance @FNDE', 'Coordenadora-Geral de Governança de TI @FNDE'),
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
          'A valuable addition to any team, as Inaia [[combines creativity]] with a strong technical understanding of graphic design. Her commitment, responsibility, and excellence consistently stood out during her studies.',
          'Uma adição valiosa para qualquer time, porque a Inaiá [[une criatividade]] a um conhecimento técnico sólido de design gráfico. Seu comprometimento, responsabilidade e excelência sempre se destacaram durante os estudos.',
        ),
        name: 'Marco Aurélio Lobo Junior',
        role: l('Coordinator – CST Graphic Design @IESB', 'Coordenador – CST Design Gráfico @IESB'),
      },
    ],
  },

  art: {
    label: l('Outside work', 'Fora do trabalho'),
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
    strip: l('Film photographs by Inaiá', 'Fotografias em filme da Inaiá'),
  },
};

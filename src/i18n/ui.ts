// Interface strings: everything that isn't page content.
import type { L10n } from './config';

export const ui = {
  skip: { en: 'Skip to content', pt: 'Pular para o conteúdo' },

  nav: {
    label: { en: 'Main', pt: 'Principal' },
    work: { en: 'Work', pt: 'Projetos' },
    about: { en: 'About', pt: 'Sobre' },
    resume: { en: 'Resume', pt: 'Currículo' },
    home: { en: 'Inaiá Silva, home', pt: 'Inaiá Silva, início' },
    homeShort: { en: 'Home', pt: 'Início' },
    menuOpen: { en: 'Open menu', pt: 'Abrir menu' },
    menuClose: { en: 'Close menu', pt: 'Fechar menu' },
    newTab: { en: '(opens in a new tab)', pt: '(abre em outra aba)' },
  },

  lang: {
    label: { en: 'Language', pt: 'Idioma' },
    switchTo: { en: 'Ler em português', pt: 'Read in English' },
    current: { en: 'English', pt: 'Português' },
  },

  footer: {
    signature: { en: 'Designed and built by me', pt: 'Design e código feitos por mim' },
    greeting: { en: 'Nice to meet you.', pt: 'Prazer em te conhecer.' },
    elsewhere: { en: 'Elsewhere', pt: 'Por aí' },
    design: { en: 'Visual design', pt: 'Design visual' },
  },

  project: {
    locked: { en: 'Protected', pt: 'Protegido' },
    soon: { en: 'Coming soon', pt: 'Em breve' },
    back: { en: 'All work', pt: 'Todos os projetos' },
    role: { en: 'Role', pt: 'Papel' },
    timeline: { en: 'Duration', pt: 'Duração' },
    period: { en: 'Period', pt: 'Período' },
    context: { en: 'Context', pt: 'Contexto' },
    status: { en: 'Status', pt: 'Status' },
  },

  case: {
    slot: { en: 'image to come', pt: 'imagem em breve' },
    contents: { en: 'In this case', pt: 'Neste case' },
    tools: { en: 'Skills & tools', pt: 'Habilidades e ferramentas' },
    focus: { en: 'Focus', pt: 'Foco' },
    question: { en: 'how might we', pt: 'como poderíamos' },
    fig: { en: 'fig.', pt: 'fig.' },
    enlarge: { en: 'See larger', pt: 'Ver maior' },
    close: { en: 'Close', pt: 'Fechar' },
    prev: { en: 'Previous image', pt: 'Imagem anterior' },
    next: { en: 'Next image', pt: 'Próxima imagem' },
    nextCase: { en: 'Next project', pt: 'Próximo projeto' },
  },

  gate: {
    label: { en: 'Protected case', pt: 'Case protegido' },
    title: { en: 'This case is password protected.', pt: 'Este case é protegido por senha.' },
    body: {
      en: 'It covers confidential client work, so it sits behind a password. Reviewing my work and don’t have it?',
      pt: 'Ele mostra trabalho confidencial de cliente, então fica atrás de uma senha. Está avaliando meu trabalho e não tem a senha?',
    },
    ask: { en: 'Ask me on LinkedIn', pt: 'Me chame no LinkedIn' },
    field: { en: 'Password', pt: 'Senha' },
    unlock: { en: 'Unlock', pt: 'Abrir' },
    busy: { en: 'Opening…', pt: 'Abrindo…' },
    wrong: { en: 'That’s not it. Try again?', pt: 'Não é essa. Tenta de novo?' },
    failed: { en: 'Something went wrong loading the case. Please try again.', pt: 'Algo deu errado ao carregar o case. Tente de novo.' },
  },

  notFound: {
    title: { en: 'Page not found.', pt: 'Página não encontrada.' },
    body: {
      en: 'The link may be old, or the page may have moved.',
      pt: 'O link pode estar desatualizado, ou a página mudou de lugar.',
    },
  },
} satisfies Record<string, Record<string, L10n> | L10n>;

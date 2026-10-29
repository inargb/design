// Interface strings: everything that isn't page content.
// Keys are grouped by component so a Framer migration can map them to
// localized text layers one group at a time.
import type { L10n } from './config';

export const ui = {
  skip: { en: 'Skip to content', pt: 'Pular para o conteúdo' },
  toTop: { en: 'Back to top', pt: 'Voltar ao topo' },
  toTopCursor: { en: 'top', pt: 'topo' },

  nav: {
    label: { en: 'Main', pt: 'Principal' },
    work: { en: 'work', pt: 'projetos' },
    about: { en: 'about', pt: 'sobre' },
    resume: { en: 'resume', pt: 'currículo' },
    home: { en: 'Inaiá Silva, home', pt: 'Inaiá Silva, início' },
    homeShort: { en: 'home', pt: 'início' },
    menuOpen: { en: 'Open menu', pt: 'Abrir menu' },
    menuClose: { en: 'Close menu', pt: 'Fechar menu' },
    newTab: { en: '(opens in a new tab)', pt: '(abre em outra aba)' },
  },

  lang: {
    label: { en: 'Language', pt: 'Idioma' },
    switchTo: { en: 'Ler em português', pt: 'Read in English' },
    current: { en: 'English', pt: 'Português' },
  },

  controls: {
    group: { en: 'Display settings', pt: 'Preferências de exibição' },
    spec: { en: 'Spec mode', pt: 'Modo spec' },
    specHint: { en: 'show the redlines', pt: 'mostrar as medidas' },
  },

  cursor: {
    view: { en: 'view project', pt: 'ver projeto' },
    soon: { en: 'coming soon!', pt: 'em breve!' },
    secret: { en: 'a little secret', pt: 'um segredinho' },
    drag: { en: 'drag', pt: 'arraste' },
    open: { en: 'open', pt: 'abrir' },
    close: { en: 'close', pt: 'fechar' },
    look: { en: 'look', pt: 'olhar' },
  },

  footer: {
    signature: { en: 'designed by me <3', pt: 'design feito por mim <3' },
    greeting: { en: 'nice to meet you', pt: 'prazer em te conhecer' },
    secrets: { en: 'secrets found', pt: 'segredos encontrados' },
    elsewhere: { en: 'elsewhere', pt: 'por aí' },
  },

  project: {
    locked: { en: 'protected case', pt: 'case protegido' },
    soon: { en: 'coming soon', pt: 'em breve' },
    frame: { en: 'frame', pt: 'frame' },
    next: { en: 'next frame', pt: 'próximo frame' },
    prev: { en: 'previous frame', pt: 'frame anterior' },
    back: { en: 'back to main screen', pt: 'voltar à página inicial' },
    role: { en: 'Role', pt: 'Papel' },
    timeline: { en: 'Duration', pt: 'Duração' },
    period: { en: 'Period', pt: 'Período' },
    context: { en: 'Context', pt: 'Contexto' },
    status: { en: 'Status', pt: 'Status' },
  },

  case: {
    slot: { en: 'image to come', pt: 'imagem em breve' },
    contents: { en: 'in this case', pt: 'neste case' },
    tools: { en: 'Skills & tools', pt: 'Habilidades e ferramentas' },
    focus: { en: 'Focus', pt: 'Foco' },
    question: { en: 'how might we', pt: 'como poderíamos' },
    fig: { en: 'fig.', pt: 'fig.' },
    enlarge: { en: 'See larger', pt: 'Ver maior' },
    close: { en: 'Close', pt: 'Fechar' },
    prev: { en: 'Previous image', pt: 'Imagem anterior' },
    next: { en: 'Next image', pt: 'Próxima imagem' },
  },

  gate: {
    label: { en: 'protected case', pt: 'case protegido' },
    title: { en: 'This one’s a little secret.', pt: 'Esse aqui é um segredinho.' },
    body: {
      en: 'It covers confidential client work, so it sits behind a password. Reviewing my work and don’t have it?',
      pt: 'Ele mostra trabalho confidencial de cliente, então fica atrás de uma senha. Está avaliando meu trabalho e não tem a senha?',
    },
    ask: { en: 'ask me on LinkedIn', pt: 'me chama no LinkedIn' },
    field: { en: 'Password', pt: 'Senha' },
    unlock: { en: 'unlock', pt: 'abrir' },
    busy: { en: 'developing…', pt: 'revelando…' },
    wrong: { en: 'That’s not it. Try again?', pt: 'Não é essa. Tenta de novo?' },
    failed: { en: 'Something went wrong loading the case. Please try again.', pt: 'Algo deu errado ao carregar o case. Tente de novo.' },
  },

  polaroid: {
    camera: { en: 'Take a picture', pt: 'Tirar uma foto' },
    cursor: { en: 'cheese!', pt: 'xis!' },
    title: { en: 'A polaroid for you', pt: 'Uma polaroid pra você' },
    caption: { en: 'Write on the polaroid', pt: 'Escreva na polaroid' },
    placeholder: { en: 'write something…', pt: 'escreva algo…' },
    frame: { en: 'Frame colour', pt: 'Cor da moldura' },
    save: { en: 'save to device', pt: 'salvar no aparelho' },
    saved: { en: 'Saved. Good dog.', pt: 'Salva. Bom garoto.' },
    close: { en: 'close', pt: 'fechar' },
    photo: { en: 'photo', pt: 'foto' },
    alt: { en: 'A dog taking a selfie, close to the lens', pt: 'Um cachorro tirando uma selfie, bem perto da lente' },
  },

  shortcuts: {
    title: { en: 'Keyboard, for the curious', pt: 'Teclado, para curiosos' },
    close: { en: 'Close', pt: 'Fechar' },
    unknown: { en: 'still hidden. keep looking', pt: 'ainda escondido. continue procurando' },
  },

  notFound: {
    title: { en: 'This frame didn’t develop.', pt: 'Esse frame não revelou.' },
    body: {
      en: 'Maybe the link is old, maybe the light got in. Either way, there’s nothing here.',
      pt: 'Talvez o link seja antigo, talvez tenha entrado luz. De qualquer jeito, não tem nada aqui.',
    },
    home: { en: 'back to the contact sheet', pt: 'voltar para a folha de contato' },
  },
} satisfies Record<string, Record<string, L10n> | L10n>;

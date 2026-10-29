// The playground: Inaiá's shelf, brought back from inasilva.com, where
// every object also opens something. Positions are fractions of the shelf
// photo (slots) or of the pile area, as before.
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

const l = (en: string, pt: string): L10n => ({ en, pt });

// What a click on an object does: open an overlay on the page, open a link
// in a new tab, or just show its note.
export type ShelfAction = { kind: 'film' } | { kind: 'ipod' } | { kind: 'link'; href: string } | { kind: 'note' };

export interface ShelfObject {
  id: string;
  src: ImageMetadata;
  name: L10n;
  note: L10n;
  size: number;            // width as a fraction of the shelf photo width
  home: number;            // the slot "tidy up for me" puts it in (0–8, top-left → bottom-right)
  pile: [number, number, number]; // x, y (centre-bottom, fraction of pile) + rotation
  action: ShelfAction;
}

export const playground = {
  title: l('Playground', 'Playground'),
  intro: l(
    'Things on my shelf. Drag them into place, or click one to open it.',
    'Coisas da minha estante. Arraste para arrumar, ou clique para abrir.',
  ),
  image: shelfImg,
  imageAlt: l('An empty metal wire shelf with three levels.', 'Uma estante de arame vazia, com três prateleiras.'),
  // [x, y] = centre-bottom anchor on the photo, as fractions.
  slots: [
    [0.25, 0.1], [0.5, 0.1], [0.75, 0.1],
    [0.25, 0.46], [0.5, 0.46], [0.75, 0.46],
    [0.27, 0.84], [0.52, 0.84], [0.76, 0.84],
  ] as [number, number][],
  objects: [
    { id: 'lalaland', src: lalaland, size: 0.17, home: 4, pile: [0.14, 0.34, -6], name: l('La La Land', 'La La Land'), note: l('La La Land (2016)', 'La La Land (2016)'), action: { kind: 'link', href: 'https://letterboxd.com/film/la-la-land/' } },
    { id: 'harry', src: harry, size: 0.17, home: 3, pile: [0.38, 0.3, 4], name: l('When Harry Met Sally…', 'Harry & Sally'), note: l('When Harry Met Sally… (1989)', 'Harry & Sally: Feitos um para o Outro (1989)'), action: { kind: 'link', href: 'https://letterboxd.com/film/when-harry-met-sally/' } },
    { id: 'camera', src: camera, size: 0.23, home: 2, pile: [0.66, 0.22, -3], name: l('Yashica camera', 'Câmera Yashica'), note: l('dad’s old Yashica. click to see the film.', 'a Yashica antiga do meu pai. clique para ver o filme.'), action: { kind: 'film' } },
    { id: 'vogue', src: vogue, size: 0.17, home: 7, pile: [0.85, 0.38, 5], name: l('Vogue', 'Vogue'), note: l('Vogue', 'Vogue'), action: { kind: 'link', href: 'https://www.vogue.com/' } },
    { id: 'amelie', src: amelie, size: 0.16, home: 5, pile: [0.24, 0.7, 3], name: l('Amélie', 'O Fabuloso Destino de Amélie Poulain'), note: l('Amélie (2001)', 'O Fabuloso Destino de Amélie Poulain (2001)'), action: { kind: 'link', href: 'https://letterboxd.com/film/amelie/' } },
    { id: 'popeye', src: popeye, size: 0.17, home: 6, pile: [0.5, 0.64, -4], name: l('Popeye magazine', 'Revista Popeye'), note: l('Popeye magazine', 'revista Popeye'), action: { kind: 'link', href: 'https://popeyemagazine.jp/' } },
    { id: 'ipod', src: ipod, size: 0.13, home: 1, pile: [0.76, 0.66, 6], name: l('iPod classic', 'iPod clássico'), note: l('iPod classic. click to turn it on.', 'iPod clássico. clique para ligar.'), action: { kind: 'ipod' } },
    { id: 'sneakers', src: sneakers, size: 0.25, home: 8, pile: [0.3, 0.98, -2], name: l('Shoes', 'Sapatos'), note: l('Onitsuka Tiger shoes', 'sapatos Onitsuka Tiger'), action: { kind: 'link', href: 'https://www.onitsukatiger.com/' } },
    { id: 'plant', src: plant, size: 0.23, home: 0, pile: [0.72, 0.99, 0], name: l('A plant', 'Uma planta'), note: l('a plant. it just likes the light.', 'uma planta. ela só gosta da luz.'), action: { kind: 'note' } },
  ] as ShelfObject[],
  ui: {
    help: l(
      'Drag things onto the shelf. Click or press Enter on an item to open it; “tidy up for me” puts everything away.',
      'Arraste as coisas para a estante. Clique ou aperte Enter em um item para abrir; “arruma pra mim” guarda tudo.',
    ),
    tidy: l('tidy up for me', 'arruma pra mim'),
    mess: l('mess it up again', 'bagunçar de novo'),
    placed: l('{name} is on the shelf. {n} of {total} put away.', '{name} está na estante. {n} de {total} guardados.'),
    removed: l('{name} is back on the floor.', '{name} voltou pro chão.'),
    done: l('thank you! it looks so much better :)', 'obrigada! ficou muito melhor :)'),
    lazy: l('ok, I did it myself. thanks anyway :)', 'tá, eu mesma arrumei. obrigada mesmo assim :)'),
    opens: l('opens in a new tab', 'abre em outra aba'),
  },
  film: {
    title: l('A roll of film', 'Um rolo de filme'),
    hint: l('Scroll or drag to see every photo.', 'Role ou arraste para ver todas as fotos.'),
    close: l('Close', 'Fechar'),
  },
};

// ---- The iPod --------------------------------------------------------------
// Inaiá's 18 songs, as on her Framer iPod (inassilva.framer.website/about).
// Each plays through YouTube (the video stays hidden; only the audio is
// used), loaded only once someone presses play. Titles are tidied from the
// YouTube ones. To change the music, edit this list: `id` is the part
// after v= in a YouTube link.
export interface Song { id: string; title: string; artist: string }

export const ipodContent = {
  owner: 'inaia_',
  songs: [
    { id: 'y14F2RQW7h4', title: 'Sweet Life', artist: 'Frank Ocean' },
    { id: 's6MZKRKQvzc', title: 'Rain Drop', artist: 'NCT 127' },
    { id: 'oplra1FJxWI', title: 'Don’t Look Back In Anger', artist: 'Oasis' },
    { id: 'RDuzszjrdcc', title: 'Seven Nation Army', artist: 'The White Stripes' },
    { id: 'HAJ_06-eTbk', title: 'Camera Lights', artist: 'HAECHAN' },
    { id: '1irwugJ8W8A', title: 'Human', artist: 'The Killers' },
    { id: '1ZZQuj6htF4', title: 'P.Y.T. (Pretty Young Thing)', artist: 'Michael Jackson' },
    { id: 'sCTxboZul5c', title: 'BIRDS', artist: 'Turnstile' },
    { id: 'COYkXwMc4ck', title: 'Be My Own Boyfriend', artist: 'Olivia Dean' },
    { id: 'zF3PKGftlj4', title: 'Can I Call You Rose', artist: 'Thee Sacred Souls' },
    { id: 'Y0a0QuLEC8A', title: 'Chega de Saudade', artist: 'João Gilberto' },
    { id: 'siO6dkqidc4', title: 'There Is a Light That Never Goes Out', artist: 'The Smiths' },
    { id: 'Dlz_XHeUUis', title: 'White Ferrari', artist: 'Frank Ocean' },
    { id: 'yaxgwLyN8AM', title: 'poppop', artist: 'NCT WISH' },
    { id: '2EGXgmoYtgA', title: 'Love Love', artist: 'Gilsons' },
    { id: 'cT9wIINtBwA', title: 'Supernatural', artist: 'NewJeans' },
    { id: 'piKG6j4E65E', title: 'Emperor’s New Clothes', artist: 'Panic! At The Disco' },
    { id: '1MukrWDeX7E', title: 'Oblivion', artist: 'Mac Miller' },
  ] as Song[],
  ui: {
    label: l('iPod', 'iPod'),
    close: l('Close', 'Fechar'),
    help: l(
      'Turn the wheel (drag around it or scroll) or use the arrow keys to move; the centre button or Enter selects; MENU or Backspace goes back; the bottom of the wheel or Space plays and pauses; Esc closes.',
      'Gire a roda (arraste em volta ou role) ou use as setas para navegar; o botão do centro ou Enter seleciona; MENU ou Backspace volta; a parte de baixo da roda ou Espaço toca e pausa; Esc fecha.',
    ),
    hint: l('i love music <3', 'eu amo música <3'),
  },
};

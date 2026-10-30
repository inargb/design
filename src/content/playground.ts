// Shelf: Inaiá's shelf, brought back from inasilva.com, where
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
import passport from '../assets/shelf/passport.png';

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
  home: number;            // its own slot on the shelf (0–8, top-left → bottom-right)
  pile: [number, number, number]; // where it starts, around the shelf: x, y (centre-bottom, fraction of the stage) + rotation
  action: ShelfAction;
  stack?: ImageMetadata[];  // several covers that sit, move and open as one
}

export const playground = {
  title: l('Shelf', 'Shelf'),
  heading: l('Can you organize my shelf for me? :)', 'Você pode arrumar minha estante pra mim? :)'),
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
    // The three DVDs: one object, overlapping on the shelf; they fan out on hover.
    { id: 'dvds', src: lalaland, stack: [lalaland, harry, amelie], size: 0.3, home: 4, pile: [0.13, 0.34, -3], name: l('My top 3 romances: La La Land, When Harry Met Sally…, Amélie', 'Meus 3 romances favoritos: La La Land, Harry & Sally, Amélie'), note: l('my top 3 romances', 'meus 3 romances favoritos'), action: { kind: 'link', href: 'https://letterboxd.com/beekid/' } },
    { id: 'camera', src: camera, size: 0.23, home: 2, pile: [0.22, 0.6, 4], name: l('Yashica camera', 'Câmera Yashica'), note: l('dad’s old Yashica. click to see the film.', 'a Yashica antiga do meu pai. clique para ver o filme.'), action: { kind: 'film' } },
    { id: 'vogue', src: vogue, size: 0.17, home: 7, pile: [0.74, 0.64, -3], name: l('Vogue', 'Vogue'), note: l('Vogue', 'Vogue'), action: { kind: 'note' } },
    { id: 'popeye', src: popeye, size: 0.17, home: 6, pile: [0.12, 0.86, -2], name: l('Popeye magazine', 'Revista Popeye'), note: l('Popeye magazine', 'revista Popeye'), action: { kind: 'note' } },
    { id: 'ipod', src: ipod, size: 0.13, home: 1, pile: [0.82, 0.3, 5], name: l('iPod classic', 'iPod clássico'), note: l('iPod classic. click to turn it on.', 'iPod clássico. clique para ligar.'), action: { kind: 'ipod' } },
    { id: 'sneakers', src: sneakers, size: 0.25, home: 8, pile: [0.82, 0.96, -4], name: l('Shoes', 'Sapatos'), note: l('Onitsuka Tiger shoes', 'sapatos Onitsuka Tiger'), action: { kind: 'note' } },
    { id: 'passport', src: passport, size: 0.1, home: 3, pile: [0.25, 0.94, 7], name: l('Passport', 'Passaporte'), note: l('I love to travel', 'amo viajar'), action: { kind: 'link', href: 'https://www.youtube.com/@inamkv' } },
    { id: 'plant', src: plant, size: 0.23, home: 0, pile: [0.87, 0.62, 0], name: l('A plant', 'Uma planta'), note: l('a plant. it just likes the light.', 'uma planta. ela só gosta da luz.'), action: { kind: 'note' } },
  ] as ShelfObject[],
  ui: {
    help: l(
      'Drag the things around the shelf onto it. Click or press Enter on one to open it.',
      'Arraste as coisas em volta da estante para dentro dela. Clique ou aperte Enter em uma para abrir.',
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
// Inaiá's 18 songs (mostly those on her Framer iPod).
// The iPod plays Apple Music's official 30-second previews (`preview`, from
// the iTunes Search API: no ads, nothing hosted here) and links to the full
// song on Spotify. A song without a preview is greyed out and skipped.
// To add a song: its Spotify track id, title, artist, and the iTunes
// Search API `previewUrl` (itunes.apple.com/search?term=…&entity=song).
export interface Song { title: string; artist: string; preview?: string; spotify: string }

// Each song links to its own track on Spotify (open.spotify.com/track/<id>).
const song = (spotifyId: string, title: string, artist: string, preview?: string): Song =>
  ({ title, artist, preview, spotify: `https://open.spotify.com/track/${spotifyId}` });

export const ipodContent = {
  owner: 'inaia_',
  songs: [
    song('3OM6qQmdFV6uy61GIqpRtf', 'AMAZING', 'Rex Orange County', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/73/3c/d5/733cd599-2a2b-2fd4-0926-f22ce19127db/mzaf_8363338420053129661.plus.aac.p.m4a'),
    song('4xDjeOpTMV3CkhrPrFXhVQ', 'Rain Drop', 'NCT 127', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e4/5c/f4/e45cf40c-78c0-fd03-c3c5-69fb259290c4/mzaf_17432267585482174066.plus.aac.p.m4a'),
    song('0UvCh63URrLFcPkKt99hHd', 'Don’t Look Back In Anger', 'Oasis', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/32/95/6d/32956de7-66cf-a0ee-3e22-7719fcb113c8/mzaf_8671835566530470258.plus.aac.p.m4a'),
    song('3dPQuX8Gs42Y7b454ybpMR', 'Seven Nation Army', 'The White Stripes', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fe/2d/58/fe2d587f-6344-3fb3-43f7-d318a6253dcc/mzaf_16825320951570507954.plus.aac.p.m4a'),
    song('201nq7iIM3amZvwqkAU9U6', 'Camera Lights', 'HAECHAN', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7b/d5/69/7bd569c5-317c-67b3-2e8c-7a7a4259b11a/mzaf_3395718680272436086.plus.aac.p.m4a'),
    song('1sTsuZTdANkiFd7T34H3nb', 'Human', 'The Killers', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/09/ed/cf/09edcf94-420e-2e75-c51f-259a9d4fb257/mzaf_7821723296315451145.plus.aac.p.m4a'),
    song('1CgmY8fVN7kstVDZmsdM5k', 'P.Y.T. (Pretty Young Thing)', 'Michael Jackson', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/32/b2/70/32b270f9-c07a-dfc3-0516-921a4b3932d0/mzaf_15483315381309393545.plus.aac.p.m4a'),
    song('0kshHISCRGn9MwpkbqafG4', 'BIRDS', 'Turnstile', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7d/dd/1b/7ddd1ba3-a13e-4326-8e73-71310ff0b321/mzaf_1706933049560492064.plus.aac.p.m4a'),
    song('1qbmS6ep2hbBRaEZFpn7BX', 'Man I Need', 'Olivia Dean', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/42/bb/5b/42bb5b21-2550-6205-bf3c-334b0e7d6199/mzaf_17462928687872215879.plus.aac.p.m4a'),
    song('6IAuH3hgTRpUUdmOGubXGS', 'Can I Call You Rose', 'Thee Sacred Souls', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/86/07/2a/86072a8a-a8c8-09d6-3505-5399dfab12e4/mzaf_15704289805936940876.plus.aac.p.m4a'),
    song('380KZqSJVBziAQrvx7rdGW', 'Chega de Saudade', 'João Gilberto', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e9/34/fb/e934fbad-dbba-4ab7-01e9-090f7a6829a4/mzaf_4167164513099182753.plus.aac.p.m4a'),
    song('0WQiDwKJclirSYG9v5tayI', 'There Is a Light That Never Goes Out', 'The Smiths', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4e/c9/1d/4ec91df8-8524-b6ac-812c-fb38054be09d/mzaf_3253228293752173874.plus.aac.p.m4a'),
    song('2LMkwUfqC6S6s6qDVlEuzV', 'White Ferrari', 'Frank Ocean', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b6/94/4d/b6944d5f-b66c-ef53-6fd5-8f0aaa92846c/mzaf_16355860049074950110.plus.aac.p.m4a'),
    song('1Y3Z8ZgjFse47Nt2ZR4EFU', 'poppop', 'NCT WISH', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f5/69/f4/f569f4e0-eb15-9ec8-2ad2-f38036ced93b/mzaf_11568841897585187862.plus.aac.p.m4a'),
    song('7nSataGo54Le0IfcFQCFLN', 'Love Love', 'Gilsons', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/52/41/de/5241def9-1a9b-a9be-8978-19bf028e677d/mzaf_14738843196800230461.plus.aac.p.m4a'),
    song('5ocSQW5sIUIOFojwXEz9Ki', 'Supernatural', 'NewJeans', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/41/ce/f9/41cef96a-6b48-2ddd-72a8-f479e7a1c752/mzaf_5570335600994446876.plus.aac.p.m4a'),
    song('3px2rAPu74ltbkf9eZsZ8h', 'Emperor’s New Clothes', 'Panic! At The Disco', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/59/16/45/591645f1-bb64-6a3c-baed-38ffdb730c0d/mzaf_12028274114546274041.plus.aac.p.m4a'),
    song('01z2fBGB8Hl3Jd3zXe4IXR', 'Come Back to Earth', 'Mac Miller', 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/04/bf/10/04bf10ed-0dae-fe63-94bc-eba16a7b8faa/mzaf_4512545557535985538.plus.aac.p.m4a'),
  ] as Song[],
  ui: {
    label: l('iPod', 'iPod'),
    close: l('Close', 'Fechar'),
    help: l(
      '⏭ and ⏮ move down and up in menus, and skip to the next or previous song elsewhere. The centre button selects in menus and plays or pauses a song. MENU opens the menu. The bottom of the wheel plays or pauses. You can also turn the wheel (drag around it or scroll), use the arrow keys, Enter, Backspace and Space; Esc closes.',
      '⏭ e ⏮ descem e sobem nos menus, e fora deles passam para a próxima música ou voltam para a anterior. O botão do meio seleciona nos menus e dá play ou pause na música. MENU abre o menu. A parte de baixo da roda dá play ou pause. Também dá para girar a roda (arraste em volta ou role) e usar as setas, Enter, Backspace e Espaço; Esc fecha.',
    ),
    spotify: l('Listen on Spotify', 'Ouvir no Spotify'),
    opens: l('(opens in a new tab)', '(abre em outra aba)'),
  },
};

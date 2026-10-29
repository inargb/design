// Inaiá's film photographs (from the current About page).
// Alt text describes what's visible; no places are claimed that the
// picture itself doesn't show.
import type { ImageMetadata } from 'astro';
import type { L10n } from '../i18n/config';
import blossom from '../assets/photos/blossom.jpg';
import crossing from '../assets/photos/crossing.jpg';
import rooftop from '../assets/photos/rooftop.jpg';
import stairs from '../assets/photos/stairs.jpg';
import palms from '../assets/photos/palms.jpg';
import palace from '../assets/photos/palace.jpg';
import nightmarket from '../assets/photos/nightmarket.jpg';
import market from '../assets/photos/market.jpg';
import tower from '../assets/photos/tower.jpg';
import lake from '../assets/photos/lake.jpg';
import umbrellas from '../assets/photos/umbrellas.jpg';
import trees from '../assets/photos/trees.jpg';
import theatre from '../assets/photos/theatre.jpg';

export interface Photo { src: ImageMetadata; alt: L10n; }

export const photos: Photo[] = [
  { src: market, alt: { en: 'A red-brick market building with a green roof and patio umbrellas.', pt: 'Um mercado de tijolos vermelhos com telhado verde e guarda-sóis.' } },
  { src: blossom, alt: { en: 'Pink blossoms in front of colourful Victorian houses.', pt: 'Flores cor-de-rosa na frente de casas vitorianas coloridas.' } },
  { src: theatre, alt: { en: 'An old theatre facade with Chinese characters, lit by a warm light leak.', pt: 'Fachada de um teatro antigo com letreiro em chinês, com um vazamento de luz quente.' } },
  { src: umbrellas, alt: { en: 'A person looking up at dozens of colourful umbrellas hung over a street.', pt: 'Uma pessoa olhando para dezenas de guarda-chuvas coloridos pendurados sobre a rua.' } },
  { src: tower, alt: { en: 'Glass towers framing the CN Tower against a pale sky.', pt: 'Prédios de vidro emoldurando a CN Tower contra um céu claro.' } },
  { src: crossing, alt: { en: 'A double exposure of a busy crossing and billboards.', pt: 'Uma dupla exposição de um cruzamento movimentado e outdoors.' } },
  { src: rooftop, alt: { en: 'The corner of a red building against a clear blue sky, crossed by wires.', pt: 'A quina de um prédio vermelho contra o céu azul, cortada por fios.' } },
  { src: stairs, alt: { en: 'A narrow street of stairs between white houses.', pt: 'Uma rua estreita de escadas entre casas brancas.' } },
  { src: palms, alt: { en: 'A sunny waterfront path lined with palm trees.', pt: 'Uma orla ensolarada com palmeiras.' } },
  { src: palace, alt: { en: 'A traditional palace gate with people walking across a wide courtyard.', pt: 'O portão de um palácio tradicional, com pessoas atravessando um pátio amplo.' } },
  { src: nightmarket, alt: { en: 'A crowded street at night, full of lit signs.', pt: 'Uma rua cheia à noite, com letreiros acesos.' } },
  { src: lake, alt: { en: 'A turquoise lake below snowy mountains.', pt: 'Um lago turquesa aos pés de montanhas nevadas.' } },
  { src: trees, alt: { en: 'Looking down a street through green trees.', pt: 'Uma rua vista de cima, entre árvores verdes.' } },
];

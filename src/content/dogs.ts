// Dog selfies for the camera secret (the polaroid). Openly licensed photos,
// cropped square to public/dogs/. CC BY needs the credit shown with the
// photo, so the polaroid prints it under the frame.
export interface Dog { src: string; by: string; license: string; href: string; }

const cc = 'CC BY 2.0';
export const dogs: Dog[] = [
  { src: 'dogs/dog-01.webp', by: 'normanack', license: cc, href: 'https://www.flickr.com/photos/29278394@N00/4815016325' },
  { src: 'dogs/dog-02.webp', by: 'rikkis_refuge', license: cc, href: 'https://www.flickr.com/photos/60109376@N00/16001818047' },
  { src: 'dogs/dog-03.webp', by: 'Rennett Stowe', license: cc, href: 'https://www.flickr.com/photos/10393601@N08/2593900179' },
  { src: 'dogs/dog-04.webp', by: 'NancyFry', license: cc, href: 'https://www.flickr.com/photos/36436564@N07/14809563010' },
  { src: 'dogs/dog-05.webp', by: 'joshDubya', license: cc, href: 'https://www.flickr.com/photos/9359358@N06/2310387486' },
  { src: 'dogs/dog-06.webp', by: 'rawpixel', license: 'CC0', href: 'https://www.rawpixel.com/image/3338447/free-photo-image-animal-canine-cc0' },
  { src: 'dogs/dog-07.webp', by: 'kevinpoh', license: cc, href: 'https://www.flickr.com/photos/7679455@N03/3781461111' },
  { src: 'dogs/dog-08.webp', by: '_tar0_', license: cc, href: 'https://www.flickr.com/photos/49946687@N05/7390121066' },
];

/** Frame colours. `ink` is the caption colour that reads on it. */
export const frames = [
  { id: 'white', hex: '#ffffff', ink: '#1c1a17', name: { en: 'white', pt: 'branco' } },
  { id: 'yellow', hex: '#f3cf1c', ink: '#1c1a17', name: { en: 'yellow', pt: 'amarelo' } },
  { id: 'pink', hex: '#f6bfd0', ink: '#1c1a17', name: { en: 'pink', pt: 'rosa' } },
  { id: 'mint', hex: '#bfe3cf', ink: '#1c1a17', name: { en: 'mint', pt: 'menta' } },
  { id: 'blue', hex: '#2447d6', ink: '#ffffff', name: { en: 'blue', pt: 'azul' } },
  { id: 'black', hex: '#141210', ink: '#fbfbfd', name: { en: 'black', pt: 'preto' } },
] as const;

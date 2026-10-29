# inasilva.com: "Frames"

Inaiá Silva's portfolio, rebuilt as a small design system. Static site built with
[Astro](https://astro.build), plain CSS custom properties and a little TypeScript.
No UI framework, no animation library.

```bash
npm install
npm run dev        # http://localhost:4321/portfolio/
npm run build      # → dist/
npm run check      # type + template checks
```

Deploys to GitHub Pages from `main` via `.github/workflows/deploy.yml`.
The base path is `/portfolio` (project page). For a custom domain, build with
`SITE_URL=https://inasilva.com BASE_PATH=/`.

## Where things live

```
src/
  styles/tokens.css        every design token (color, type, space, radius, motion, layout)
  styles/base.css          reset, type roles (.t-display…), layout, reveal classes
  styles/components.css    runtime-created bits (toast, spec overlay, keycap, crop marks)
  i18n/config.ts           locales, routes, base-path helpers
  i18n/ui.ts               interface strings (EN / PT)
  content/*.ts             page content, bilingual, typed (projects, home, about, photos)
  components/              Nav, Footer, Cursor, LanguageSwitch, Doodle,
                           ProjectGrid, ProjectCover + covers/, Shelf, KindWordsDrawer,
                           FilmStrip, CaseNav, FramesWord
  components/ui/           Button, Pill, SectionLabel
  views/                   one view per page, rendered by thin EN/PT page files
  pages/                   routes: /, /about, /playground, /works/[slug] (+ /pt-br/…)
  scripts/                 prefs (motion), motion (reveals), cursor, shelf
  scripts/eggs/            easter-egg system: catalog.ts + one module per egg
public/covers/             uploaded project covers (see "Covers" below)
docs/                      audit, phase notes, Framer migration notes
```

## Rules of the system

- Components use tokens only: no raw hex, no one-off sizes.
- Every text pairing is WCAG AA. The playground computes it live.
- Motion is always on, except when the visitor's system asks for reduced motion.
  The film strip stops on hover, focus and drag, and stays still with reduced motion.
- The custom cursor and the easter eggs are a layer on top. Nothing depends on them.
- Images that open something use the **print lift** hover (`class="lift crop"` in
  `styles/components.css`): the print lifts up-left, tilts a hair, casts a hard offset
  shadow and shows its crop marks, with the cursor's frame state on top. Kept for
  case-study images. (The home reel doesn't move: it shades the frames that aren't on.)
- Content lives in `src/content`, one object per string with `en` and `pt`.
- Protected case-study sources never go into the repo in plain text (`private/` is ignored).

## Covers

Each project can use an uploaded cover instead of its built-in CSS cover.
Files live in `public/covers/`; original GIFs and source images are kept in
`design/covers-src/` (not deployed).

- **Frame shape changes with the screen:** 16:10 in the desktop grid, 4:3 on
  tablets and phones, 16:9 on case pages. Media fills the frame
  (`object-fit: cover`), centred on the project's `focus` and zoomed by `zoom`,
  so the subject survives every crop. Export sources at 16:9.
- **Stills:** two WebP widths, `-800.webp` and `-1600.webp`, served with `srcset`.
- **Animations:** convert GIFs to MP4 + WebM (same look, ~10× lighter) and
  export a still `-poster.webp`. Videos load only near the viewport, play only
  while visible, and show the poster when reduced motion is on.

```bash
ffmpeg -i in.gif -vf "fps=20,scale='min(1280,iw)':-2,format=yuv420p" -c:v libx264 -crf 26 -movflags +faststart -an public/covers/x.mp4
ffmpeg -i in.gif -vf "fps=20,scale='min(1280,iw)':-2" -c:v libvpx-vp9 -crf 38 -b:v 0 -an public/covers/x.webm
ffmpeg -ss 2 -i in.gif -frames:v 1 -c:v libwebp -quality 82 public/covers/x-poster.webp
```

Then in `src/content/projects.ts`:

```ts
media: {
  video: { mp4: 'covers/x.mp4', webm: 'covers/x.webm' },  // or image: { src, small }
  poster: 'covers/x-poster.webp',
  alt: { en: 'What the product shows…', pt: 'O que o produto mostra…' },
  focus: '40% 50%',   // where the subject is
  zoom: 1.2,          // optional
},
```

## Case studies

A case is content only: `src/content/cases/<slug>.ts` exports a `CaseStudy`
(types in `src/content/cases/types.ts`) and is listed in
`src/content/cases/index.ts`. The page (`views/CaseView.astro`) renders a hero
with the project's facts, a sticky index, and numbered sections.
Each section is a list of blocks, rendered by `components/case/CaseBlocks.astro`:

| Block | Use |
|---|---|
| `text` | paragraphs |
| `stats` | big numbers with a short label |
| `question` | the "how might we" (or any callout with its own label), framed |
| `figure` | one image + numbered caption (FIG. 01); lifts on hover, opens in the lightbox |
| `gallery` | several images in a row, sized to their shape so they share one height; each opens larger |
| `heading` | a small subhead inside a section |
| `diamond` | the Double Diamond, drawn in on scroll |
| `marquee` | image rows that slide on a loop (still with reduced motion) |
| `list` | a plain numbered list (e.g. an old manual workflow) |
| `groups` | cards that each hold a short list |
| `swatches` | colour swatches with hex values |
| `compare` | before / after cards with the same rows |
| `steps` | process steps as cards: big number → title → text |
| `decisions` | design decisions as cards: icon → title → text (+ quieter note) → principle |

Stats, steps and decisions sit on `.paper-card` (paper, thin double frame, a
slight tilt). Images, the question and paragraphs keep their own look.

Images live in `src/assets/cases/<slug>/` and are optimised at build time.
Alt text describes what the image shows. Projects without a case keep the
placeholder page.

## Protected cases (password gate)

Bar Tabs (and later Menu Management) are sealed. The plain case lives in
`private/<slug>/case.ts` plus its media, and `private/` is gitignored. To
publish or update one, on a machine that has `private/`:

```bash
CASE_PASSWORD='…' npm run seal   # builds, encrypts, writes the files below
```

This writes `src/content/cases/sealed/<slug>.json` (the public header facts and
the AES-GCM-encrypted body) and `public/sealed/<slug>/*.bin` (each image or
video, also encrypted). Commit those. The password is never stored. On the
page, the header is public; the body opens in the browser once the password
derives the right key (PBKDF2-SHA256), and it stays open for the tab's
session. This is a portfolio-level gate to keep client work private, not
bank-grade security. Anyone given the password can read the case.

Sanitize media before sealing: blur colleague names, client locations and real
addresses (see `private/<slug>/blur.py`).

## Dog selfies (camera secret)

The polaroid secret uses openly licensed photos, cropped square in `public/dogs/`.
Credits (also printed on each polaroid, and in `src/content/dogs.ts`):

| File | Photo | License |
| --- | --- | --- |
| dog-01 | [normanack](https://www.flickr.com/photos/29278394@N00/4815016325) | CC BY 2.0 |
| dog-02 | [rikkis_refuge](https://www.flickr.com/photos/60109376@N00/16001818047) | CC BY 2.0 |
| dog-03 | [Rennett Stowe](https://www.flickr.com/photos/10393601@N08/2593900179) | CC BY 2.0 |
| dog-04 | [NancyFry](https://www.flickr.com/photos/36436564@N07/14809563010) | CC BY 2.0 |
| dog-05 | [joshDubya](https://www.flickr.com/photos/9359358@N06/2310387486) | CC BY 2.0 |
| dog-06 | [rawpixel](https://www.rawpixel.com/image/3338447/free-photo-image-animal-canine-cc0) | CC0 |
| dog-07 | [kevinpoh](https://www.flickr.com/photos/7679455@N03/3781461111) | CC BY 2.0 |
| dog-08 | [_tar0_](https://www.flickr.com/photos/49946687@N05/7390121066) | CC BY 2.0 |

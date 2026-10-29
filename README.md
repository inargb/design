# design: Inaiá Silva's portfolio, clean edition

A quieter, more senior take on [inasilva.com](https://inasilva.com) (source:
`inargb/portfolio`). Same cases, About page, copy and links; a new layout:
off-white paper, slate ink, IBM Plex Mono for headings and labels, Inter for
reading, the top bar from inasilva.com (same type, order and EN/PT switch, in
capitals) and one centred content column. Projects sit in a two-column grid of landscape
covers, each captioned only name / context · year.
The headline keeps the interactive word "frames" (Figma frame, film frame,
frames per second), project cards keep the viewfinder cursor, and the footer
keeps spec mode (the ruler, or press S); the doodles, film reel and other
easter eggs are gone.

Static site built with [Astro](https://astro.build), plain CSS custom
properties and a little TypeScript.

```bash
npm install
npm run dev        # http://localhost:4321/design/
npm run build      # → dist/
npm run check      # type + template checks
```

## Deploy

Live at https://inargb.github.io/design/. `.github/workflows/deploy.yml`
type-checks and builds every push and pull request; every push to `main`
also deploys to GitHub Pages (a manual run from Actions → Run workflow does
too). For a custom domain, build with `SITE_URL=https://example.com BASE_PATH=/`
and add `public/CNAME`.

## Where things live

```
src/
  styles/tokens.css        every design token (color, type, space, radius, motion, layout)
  styles/base.css          reset, type roles (.t-display…), layout primitives, reveals
  styles/components.css    surfaces used inside case markup (cards)
  i18n/config.ts           locales, routes, base-path helpers
  i18n/ui.ts               interface strings (EN / PT)
  content/*.ts             page content, bilingual, typed (projects, home, about, photos)
  components/              Nav (top bar + phone menu), Footer, LanguageSwitch,
                           FramesWord, ProjectGrid, ProjectCover, ProjectCursor
  components/case/         case-study blocks, figures, sections, index
  layouts/Base.astro       the page shell: top bar, content column, footer
  views/                   one view per page, rendered by thin EN/PT page files
  pages/                   routes: /, /about, /works/[slug] (+ /pt-br/…)
  scripts/                 prefs (reduced motion), motion (reveals), sealed (gate),
                           spec-mode (redlines overlay)
public/covers/             project covers (stills and videos)
```

## Rules of the system

- Components use tokens only: no raw hex, no one-off sizes.
- Every text pairing is WCAG AA.
- Motion is short and calm (fades, a 1.5% cover zoom on hover), and off when the
  visitor's system asks for reduced motion.
- Content lives in `src/content`, one object per string with `en` and `pt`.
- Protected case-study sources never go into the repo in plain text (`private/` is ignored).

## Playground

`/playground` (+ `/pt-br/playground`) is the shelf from inasilva.com on one
screen-high page, with the top bar and no footer. The shelf starts tidy and
centred; objects can be dragged off and back. A click (or Enter) opens one:

- the camera → a roll of film with the About page's art note (`components/playground/FilmViewer.astro`)
- the iPod → a working iPod classic (`components/playground/IPod.astro`): Music, Extras (photos),
  Settings (shuffle, repeat, about), Shuffle Songs, Backlight, Now Playing. Songs play as Apple
  Music's official 30-second previews (no ads, nothing hosted here), with a "Listen on Spotify" link
  under the iPod for the full song; songs without a preview are greyed out and skipped
- the DVDs → Inaiá's Letterboxd profile in a new tab; magazines, shoes and the plant → their note

Objects, links and the iPod's songs live in `src/content/playground.ts`. A song's `preview`
is the `previewUrl` from the iTunes Search API (itunes.apple.com/search?term=…&entity=song).

## Covers

Each project has an uploaded cover in `public/covers/`: a still (two WebP
widths, `-800.webp` and `-1600.webp`) or a video (MP4 + WebM, with a
`-poster.webp`). The frame is 4:3 in the grid and 16:9 on case pages; media
fills it (`object-fit: cover`), centred on the project's `focus` and zoomed by
`zoom`. Export sources at 16:9.

```bash
ffmpeg -i in.gif -vf "fps=20,scale='min(1280,iw)':-2,format=yuv420p" -c:v libx264 -crf 26 -movflags +faststart -an public/covers/x.mp4
ffmpeg -i in.gif -vf "fps=20,scale='min(1280,iw)':-2" -c:v libvpx-vp9 -crf 38 -b:v 0 -an public/covers/x.webm
ffmpeg -ss 2 -i in.gif -frames:v 1 -c:v libwebp -quality 82 public/covers/x-poster.webp
```

## Case studies

A case is content only: `src/content/cases/<slug>.ts` exports a `CaseStudy`
(types in `src/content/cases/types.ts`) and is listed in
`src/content/cases/index.ts`. The page (`views/CaseView.astro`) renders a
header with the project's facts, the cover, numbered sections, and the next
project. On desktop a sticky index runs beside the sections.
Blocks render in `components/case/CaseBlocks.astro` (text, stats, figures,
galleries, steps, decisions, before/after, tables, timelines…).

## Protected cases (password gate)

Bar Tabs and Menu Management are sealed: the header is public, the body is
AES-GCM encrypted and opens in the browser with the password. The plain case
lives in `private/<slug>/case.ts` (gitignored). To re-seal, on a machine that
has `private/`:

```bash
CASE_PASSWORD='…' npm run seal
```

The sealed files in this repo were made for inasilva.com and are shared with
it. Their markup keeps the original class names; this site restyles them
through the global `cb-*`, `cfig*`, `case-*` and `paper-card` rules, so keep
those class names and the case component file paths
(`src/components/case/*`, `src/components/ui/SectionLabel.astro`) as they are,
or re-seal after changing them.

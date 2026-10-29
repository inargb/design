// Case studies: one typed object per project, made of numbered sections,
// each a list of blocks. Components in src/components/case render every
// block type, so a new case is content only. (In Framer: one CMS item per
// case, one component per block type.)
import type { L10n } from '../../i18n/config';

export interface CaseStudy {
  slug: string;                       // matches projects.ts
  tools: L10n;                        // skills / tools line in the hero
  facts?: { label: L10n; value: L10n }[]; // extra hero facts (e.g. type of project)
  live?: { href: string; label: L10n };
  intro?: CaseBlock[];                // blocks between the header and section 01
  sections: CaseSection[];
}

export interface CaseSection {
  id: string;                         // anchor: #overview, #problem…
  label: L10n;                        // "overview", "o problema"
  title?: L10n;                       // \n for a line break; none → the label is the heading ("discover_")
  blocks: CaseBlock[];
}

export interface CaseImage {
  src: ImageMetadata;
  mobile?: ImageMetadata;             // a different crop/layout for phones (≤ 40rem)
  video?: string;                     // an animation (mp4 URL); `src` is its poster
  alt: L10n;                          // what the image shows, never "screenshot"
}

export type CaseBlock =
  | { type: 'text'; body: L10n[] }
  /** A small uppercase subheading inside a section, with an optional line under it. */
  | { type: 'heading'; text: L10n; sub?: L10n }
  /** The Double Diamond: problem → solution over four phases. */
  | { type: 'diamond'; problem: L10n; solution: L10n; phases: { title: L10n; body: L10n }[]; note?: L10n }
  /** Rows of images that drift sideways on a loop and can be dragged/scrolled by hand
      (speed in px/s; still, but scrollable, with reduced motion). */
  | { type: 'marquee'; rows: CaseImage[]; height?: number; background?: string; speed?: number; caption?: L10n }
  /** Big numbers with a short label. */
  | { type: 'stats'; items: { value: L10n; label: L10n }[] }
  /** Set apart in the shaded panel: the "how might we" by default, or any
      short callout with its own label ("key finding", "what I learned"). */
  | { type: 'question'; text: L10n; label?: L10n }
  /** Cards that each hold a short list (e.g. requirements by dimension). */
  | { type: 'groups'; intro?: L10n; items: { title: L10n; points: L10n[] }[] }
  /** Colour swatches with their hex values. */
  | { type: 'swatches'; label: L10n; colors: string[] }
  /** One image, full column width; opens larger on click. */
  | { type: 'figure'; image: CaseImage; caption?: L10n }
  /** Several images in a row (a contact strip); each opens larger. */
  | { type: 'gallery'; images: CaseImage[]; caption?: L10n }
  /** A plain numbered list (e.g. the steps of an old manual workflow). */
  | { type: 'list'; intro?: L10n; items: L10n[] }
  /** Before / after, side by side: the same rows, then vs now. */
  | { type: 'compare'; before: CompareSide; after: CompareSide }
  /** Numbered process steps, as a row of cards: number → title → text. */
  | { type: 'steps'; items: { title: L10n; body: L10n }[] }
  /** Design decisions, as cards: icon → title → text → the principle behind it.
      `note` is a quieter aside after the text (e.g. "approved, not shipped"). */
  | { type: 'decisions'; intro?: L10n; items: { icon: CaseIcon; title: L10n; body: L10n; note?: L10n; tag?: L10n; state?: 'chosen' | 'rejected' }[] }
  /** Image slots still waiting for their asset: they keep the shape (ratio),
      place, figure number and caption of the image that will fill them.
      `id` is the visual's id in the case brief (V01…). Several → one row. */
  | { type: 'slots'; items: ImageSlot[]; caption?: L10n }
  /** A plain table: a header row and rows of cells; `muted` quiets a row. */
  | { type: 'table'; head: L10n[]; rows: { cells: L10n[]; muted?: boolean }[]; caption?: L10n }
  /** Dated points on a line, with an optional marker before one of them. */
  | { type: 'timeline'; items: { date: L10n; topic: L10n }[]; marker?: { before: number; label: L10n } }
  /** Labelled rows (term → text), with an optional sentence-case title:
      a decision (Problem · Options · Decision · Why · Result), constraints… */
  | { type: 'defs'; title?: L10n; items: { term: L10n; body: L10n }[] }
  /** Cards: title → text, optionally numbered, with a small tag; `loop`
      closes a numbered row with a "repeat" mark (a cycle, not a line). */
  | { type: 'cards'; items: { title: L10n; body?: L10n; tag?: L10n }[]; numbered?: boolean; loop?: L10n }
  /** One line set large, on its own. */
  | { type: 'pull'; text: L10n }
  /** A centre with what surrounds it (e.g. the jobs a module does). */
  | { type: 'map'; center: L10n; items: L10n[]; label: L10n };

export interface ImageSlot { id: string; ratio: string; alt: L10n }

/** A protected case as shipped: public header facts + the encrypted body.
    Written by scripts/seal.mjs; the plain source never enters the repo. */
export interface SealedCase {
  slug: string;
  tools: L10n;
  facts?: { label: L10n; value: L10n }[];
  crypto: { v: 1; kdf: 'PBKDF2-SHA256'; iter: number; salt: string };
  body: Record<'en' | 'pt', { iv: string; data: string }>;   // AES-GCM, base64
  media: Record<string, string>;                              // id → mime type
}

export interface CompareSide { label: L10n; rows: { key: L10n; value: L10n }[] }

/** Line icons for decision cards (drawn in components/case/CaseBlocks.astro). */
export type CaseIcon = 'layout' | 'search' | 'star' | 'frame' | 'contrast' | 'ruler' | 'doc' | 'person';

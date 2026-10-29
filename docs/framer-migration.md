# Framer migration notes (draft, updated per phase)

The code is structured so that moving to Framer is a rebuild with a map, not a
translation from scratch. Not everything should move. Some pieces are better
kept as code components.

## Tokens → Framer variables and styles

| Code | Framer |
|---|---|
| `--color-*` (paper theme) | Color styles (light only) |
| `--type-*` roles (`display`, `heading.xl` … `code`) | Text styles, one per role, with Desktop / Tablet / Phone sizes taken from the clamp() ends |
| `--space-*` | Number variables for gaps and padding in stacks |
| `--layout-max`, `--layout-gutter`, 12/6/4 columns | Breakpoint frames (1440 / 1024 / 390), max-width 1344, gutters 48/32/16 |
| `--radius-*` | Only three values: 0, 2, 999 |
| `--duration-*`, `--ease-*` | Saved transitions (Framer allows custom bezier curves) |

## Components that map naturally

- **Nav, Footer, Button, Pill, SectionLabel, Keycap, LanguageSwitch**: plain Framer components with variants (hover / pressed / current).
- **Contact sheet frames**: a component with variants `open | locked | soon`. The hover lift (offset shadow + tilt) is a hover variant.
- **Case-study blocks**: SectionLabel, StatBlock and Figure become components when Phase 4 lands.
- **Page transitions**: Framer's page effects cover the fade/settle transition.
- **Scroll reveals**: Framer "Appear" effects with the `settle` curve. Stagger comes from Framer's delay per item.

## Needs code components

| Piece | Why |
|---|---|
| Custom cursor (states + labels) | Framer has cursors, but not state labels driven by the element underneath or a lagged follow. Port `scripts/cursor.ts` as one code component mounted on each page. |
| Project covers | Pure HTML/CSS with container-query units. Each cover can become a code component as-is. Recording them to MP4 is a lighter alternative. |
| Shelf (drag + snap + keyboard) | Framer drag has no snap-to-slot, keyboard placement or persistence. Port `scripts/shelf.ts`. |
| Spec mode | Measures the live DOM and computes contrast, so it has to be code. |
| Easter-egg registry, `?` sheet, frame counter | Global state in localStorage. One code component ("EggHost") mounted in the layout. |
| "frames" word, doodles (look / shy / sleepy) | Small code components; the SVGs themselves import into Framer as vectors. |
| Motion | Respect reduced motion; there is no theme toggle (light only). |

## Stays custom / needs rebuilding

- **Password gate (Phase 4).** Encrypted case payloads can't be served from Framer's CMS as-is. Use Framer's built-in page password instead, and accept the weaker model.
- **Bilingual content.** Framer Localization can hold the EN/PT pairs, and `src/content/*.ts` is structured to be pasted in field by field.

## Assets

`src/assets/{doodles,shelf,photos,about}` are already named by role. Upload them to
Framer's asset library with the same names. The doodles are SVG with two
recolourable groups (`doodle-ink`, `doodle-eyes`).

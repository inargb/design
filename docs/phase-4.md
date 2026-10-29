# Phase 4: project system

## Case-study architecture (done)

- Content model: `src/content/cases/types.ts`. A case is sections → blocks
  (text, stats, question, figure, gallery, steps, decisions). Adding a case is
  writing one content file; no new components.
- Page: hero → sticky index that
  follows the reading (desktop) → numbered sections → previous / next frame.
- Figures are prints: the print lift on hover, the "look" cursor, numbered
  captions (FIG. 01) that run through the whole case, and a lightbox
  (Esc / click / ✕ closes, focus returns to the image).
- Framer: one CMS collection for cases, one component per block type.

- Topic blocks sit on the paper card (`.paper-card` in `components.css`):
  paper with a thin double frame, each a hair off straight. Stats: number →
  label. Steps: number → title → text. Decisions: icon → title → text
  (optional quieter note) → principle.
  On hover they lift like the images, quieter: a 2px move and a thin shadow.
- Images keep their own look (hairline frame, print lift on hover) and open in
  the lightbox (← → through every image in the case). The "how might we" is a
  shaded panel with crop marks. Paragraphs stay as running text.

- Header, after the reference portfolios (Rachel Chen, Emmi Wu, Eem Monroy):
  the section index is a left sidebar from the top of the page, with
  "← all work" above it; the header sits in the content column. Eyebrow
  (frame · context · type/method) → title → one sentence → facts in four
  equal columns (Role, Timeline, Focus, Skills & tools), one value per line,
  labels in small blue caps → "see it live". Two columns on phones.

## Cases

| # | Case | Status | Source |
|---|---|---|---|
| 1 | Systems Portal | built | inasilva.com case (EN + PT), images from it |
| 2 | Responsive Specs & Accessibility Generator | built | inasilva.com case (EN + PT), images from it |
| 3 | Bandoneón Initiative | built | inasilva.com case (EN + PT), images from it |
| 4 | Bar Tabs System | built, sealed | inasilva.com case (EN + PT), sanitized media; encrypted in repo |
| 5 | Menu Management | needs the password gate | the uploaded brief (kept out of the repo) |

## Systems Portal: notes

- Text is Inaiá's own, from the current case in both languages. Small fixes in
  the Portuguese ("sem qualquer busca", "Você pode até saber", "em conjunto").
- "Time saved" became "< 1 min" and "35% reduction" became "−35%" as stat
  values; the labels keep her wording.
- The three extra interface screens from the live case sit in the solution
  section as a gallery (FIG. 03–05). They had no caption on the live site, so
  they have none here; alt text describes each.

## Specs Generator: notes

- Text is Inaiá's own, from the current case in both languages, lightly edited
  (a few Portuguese sentences smoothed; "proccess" fixed).
- New blocks for it: `list` (the old manual workflow), `compare` (before /
  after), extra hero facts (Type), and icons for its four decision cards. No
  Nielsen tags here: the live case has none.
- The three "tool in action" images share one caption and one height.

## Bandoneón: notes

- Text and structure are Inaiá's, as on the current site: the Double Diamond
  first, then discover_ · define_ · develop_ · delivery_ · outcome_ (section
  labels are the headings). "AI" / "IA" in the process kept as written.
- New blocks: `diamond` (outline drawn in on scroll, four phases, problem →
  solution), `marquee` (image rows sliding on a loop, alternate directions,
  pause on hover, still and scrollable with reduced motion), `heading`
  (small subheads like "Wireframes"), and `intro` blocks before section 01.
- The design-system image is new: a preview board in the style of Rachel
  Chen's (styles, buttons, forms, components) built from Bandoneón's palette,
  Nunito and components. Source: design/case-src/bandoneon-design-system.html.

## Bar Tabs: notes

- Protected: the page shows the public header (title, line, role, period,
  focus, tools) and a password card. The right password decrypts the body
  and media in the browser; a wrong one shakes the card and says so. It stays
  unlocked for the tab's session.
- Sealing: `npm run seal` with CASE_PASSWORD, from `private/bar-tabs-system/`
  (gitignored). Only ciphertext is committed (`src/content/cases/sealed/`,
  `public/sealed/`). Checked: no plain text in the repo or in a CI-style build.
- Sanitized media: a colleague's name, client location names ("… Cashier",
  "… Default") and a real address and phone number are blurred in every
  frame. Customer names in the demos are sample data and stay.
- GIFs became MP4 (26 MB → 1.3 MB). Figures can now be videos (muted loop,
  poster, still with reduced motion).
- Case styles are global (prefixed) and page scripts re-run on the
  `ina:case-content` event, so an injected body behaves like an open case.

# Phase 1: Audit and proposed direction

Status: **waiting for Inaiá's feedback.** No production code has been written yet.

Sources inspected on 24 Sep 2026, rendered in headless Chromium at 1440px and 390px:

- **inasilva.com.** Home, About, Systems Portal, Responsive Specs & Accessibility Generator, Bandoneón Initiative, Bar Tabs System and the PT-BR home. About and Bar Tabs were opened with the case password.
- **References.** Home page, one case study and one secondary page each from rachelchen.tech, emmiwu.com, eemonroy.com and prasha.framer.website.
- **The Menu Management case-study brief.** All 1,058 lines were read. It is not committed here because this repository is public (see "Open decisions").

---

## 1. The current portfolio

### What it is today

| | Findings |
|---|---|
| Platform | Framer |
| Type | IBM Plex Mono 500 is used almost everywhere: nav, titles, tags and headings. Inter is used for body text at 12–14px. Geist Mono and Poppins are loaded but barely used. |
| Color | White `#FFF`, near-black `#262626`, grays `#707070` and `#B8B8B8`. There is no accent color, apart from the yellow eyes in the doodles. |
| IA | Home (hero + 7 project cards) · About · Resume (a Google Drive link) · EN / PT-BR toggle. Case pages live at `/works/<slug>`, and the PT pages at `/pt-br/…`. |
| Signature details | Hand-drawn doodle faces with yellow eyes. The `works_` / `about_` / `kind words_` underscore suffix. A "NICE TO MEET YOU_" typewriter line. A custom cursor that shows a "View project" label. Cards that tilt with a hard offset shadow on hover. The footer line "designed by me <3". |
| About page | An interactive shelf ("can you organize my shelf for me? :)") with La La Land, When Harry Met Sally, Amélie, a Yashica camera, Onitsuka sneakers, Vogue, Popeye magazine, an iPod and a plant. Scattered, tilted testimonial cards. A strip of film photographs. "love for art_". |
| Case studies | A metadata box (role, timeline, skills), numbered sections (`01 _ overview`), stat blocks, a "how might we" pull quote, before/after panels and a NEXT PROJECT link. |
| Protected flow | Framer's page password screen, with the success copy "YAY! Go back to the main screen and enter the project again :)". |

### What it does well (keep this)

1. **The writing in the case studies is senior-level.** The cases name their tensions, show options that were rejected and why, and are honest about what wasn't measured or wasn't built. Systems Portal, for example, notes that the "Most accessed" proposal "was approved during the project but was not implemented". Most portfolios don't have this honesty. It's the strongest asset on the site, and the redesign should be built to show it off.
2. **The shelf.** It's a real, personal easter egg. It shows taste (films, a camera, magazines) and invites people to play. It should survive and grow.
3. **The doodles.** They're hand-drawn, a little odd and clearly yours. Nothing in the references looks like them.
4. **Film photography.** The Yashica that was your dad's, and "developed pictures I don't even remember taking." This is a real story that no template has.
5. **The mono voice and the underscore.** `works_` reads like a cursor waiting for input. It's quiet, nerdy and yours. The idea is worth keeping, even if the typeface around it changes.
6. **The hard offset shadow and the double-rule frames.** They feel like print, not SaaS.
7. **Bilingual from day one.**

### What should change

| Issue | Why it matters |
|---|---|
| Everything is set in the same mono at nearly the same size | The hierarchy is flat. Long project titles in mono are slow to read, and long-form body text is Inter at 12–14px. |
| `#B8B8B8` text on white (about 2:1) | Fails WCAG AA, and it's used for 17 text elements on the home page. `#707070` passes (about 4.9:1). |
| The home page is a hero and then a grid of 7 identical cards | The first viewport says "UX designer" and "Figma frames," but nothing about what kind of designer you are. The card grid is the most template-like part of the site. |
| Three cards lead nowhere | The Backoffice card is "coming soon." K-pop binder and Sabi have no link. |
| Tags look like table cells | Three equal columns with dividers under every card. They're noisy and don't help anyone scan. |
| Inconsistencies in the EN pages | "sobre_" and "LÍDER DE DESIGN" appear on the English Responsive Specs page. "proccess". "STUDY CASE". "Iniciative" vs "Initiative". "Bandoneon" vs "Bandoneón". |
| The About intro | "digital experiences that people actually enjoy using" is the one generic sentence on the site. |
| Password screen | A bare input, then a second screen asking you to go back and click the project again. The redesign should unlock in place. |
| Case pages are uniform walls | Every section uses the same bordered box. Good writing gets no rhythm, no pacing and no visual pause. |
| Cursor only | Hover-only affordances ("View project") have no equivalent for keyboard or touch users. |

---

## 2. Reference analysis

### Rachel Chen: rachelchen.tech
1. **Distinctive:** restraint. A slate-on-near-white palette, one orange accent, and a Tiempos serif display paired with Geist Mono metadata.
2. **Interaction:** the cursor becomes an orange **"VIEW OVERVIEW"** pill with an eye icon over projects. Covers are autoplaying product videos. "RachelLM" is a chatbot in the nav.
3. **Home page:** a one-sentence hero with one italic word ("a product designer who *engineers*."), a compact table of past roles beside it, then a two-column project grid.
4. **Projects:** a large media tile, with a serif title on the left and `COMPANY • STATUS YEAR` in mono on the right. The status ("SHIPPED", "CONCEPT", "HANDED OFF") is honest metadata.
5. **Case studies:** a sticky section index (Overview / Problem / Navigating the mess / …), a role/timeline/team/skills row, and conversational headings ("…but it's not easy when you don't own the operating system!").
6. **Motion:** small and functional. The cursor morphs, videos play.
7. **Type:** serif for the human voice, mono for facts. It's a very clear split.
8. **Personality:** comes almost entirely from the writing and one italic word.
9. **For you:** a cursor that turns into a *verb*. Project **status** as metadata. A sticky case index.
10. **Don't take:** the designer-who-engineers framing, the LLM gimmick, the orange pill.

### Emmi Wu: emmiwu.com
1. **Distinctive:** a hero made of paper notes pinned with tape at slight angles, written in the third person. A Chinese name stamp (吴卓) and a tiny ASCII sprout character.
2. **Interaction:** a custom cursor. The Playground is a drag-to-pan canvas of experiments with kaomoji captions. The dark footer "garden" grows ASCII plants: "To plant a garden, is to believe in the future."
3. **Home page:** the hero collage, then a two-column masonry of colorful project tiles, then the garden footer.
4. **Projects:** `COMPANY - SEASON YEAR` in mono above a serif title, with a one-line description underneath.
5. **Case studies:** a sticky section index with "back to top". "7 days. 4 designers. 1 challenge." Honest "more coming soon" when a case is unfinished.
6. **Motion:** growing plants, subtle tile motion.
7. **Type:** Self Modern (a soft serif) with Kode Mono and IBM Plex Mono. The monos carry the nerdy voice.
8. **Personality:** handmade marks (ASCII, stamps, notes) placed next to polished work.
9. **For you:** a footer that's a small gift. A playground as a personal side room. Honest status notes.
10. **Don't take:** paper notes, ASCII plants, the name stamp. They belong to Emmi.

### Eemon Roy: eemonroy.com
1. **Distinctive:** a visible architectural grid. Hairlines frame every block, like an open Figma file. The Averia Serif Libre display has a slightly wobbly, warm, "imperfect" feel.
2. **Interaction:** highlighter-pill words in the hero ("Product Designer", "Microsoft"), floating colored dots, and a 3D box that opens with cards spilling out. There's a **"pause animations"** control, which is a real accessibility signal. The cursor becomes a yellow "READ CASE STUDY" tag. Pixel-art icons flank the section titles.
3. **Home page:** an animated hero, a work grid, testimonials with portraits, "lil' Sidequests <3", and a folder-illustration footer.
4. **Projects:** a two-column grid with `TITLE` on the left and a colored `TYPE - YEAR` on the right.
5. **Case studies:** a TL;DR block (duration, role, users, status), big uppercase statements ("RESTRAINT IS A FEATURE") and data charts.
6. **Motion:** a lot of it, but it can be paused.
7. **Type:** a soft serif plus a technical label face plus a pixel face.
8. **Personality:** exuberant and warm. The sidequests show range.
9. **For you:** a **pause-motion control**, a grid shown as an aesthetic, a TL;DR block for recruiters in a hurry, and "an error 404 worth finding" as a mindset.
10. **Don't take:** gradients, the 3D box, the pixel emoji. They're louder than you are.

### Prasha Roy: prasha.framer.website
1. **Distinctive:** a big sticker-shaped composition. The name sits in pill shapes with a star and a plus mark. Warm cream with teal, coral and lime.
2. **Interaction:** Framer-native patterns. Nav labels roll up on hover (the text is duplicated and slides). A folder-tab container holds the work. A "The hats I wear" marquee. Arrow buttons on cards.
3. **Home page:** the sticker hero, a polaroid photo with a location, a one-line statement, the folder of work, the marquee and a big "Let's Connect" block.
4. **Projects:** rounded image cards with a client label and a title.
5. **Case studies:** almost entirely visual (about 100 words). That's right for an illustrator and wrong for a product designer.
6. **Motion:** Framer appear effects, the marquee and hover rolls.
7. **Type:** Funnel Display, IBM Plex Mono and Manrope.
8. **Personality:** the illustrator's hand shows in every shape.
9. **For you:** a folder or tab as a container metaphor, and it shows which Framer-native patterns stay cheap to rebuild.
10. **Don't take:** sticker shapes, rounded-card-everything, image-only case studies.

### Reference matrix

| Area | Rachel Chen | Emmi Wu | Eemon Roy | Prasha | **Inaiá (proposed)** |
|---|---|---|---|---|---|
| Typography | Tiempos serif + Geist Mono | Self Modern + Kode Mono / Plex Mono | Averia Serif + Plaak + pixel | Funnel Display + Plex Mono | **An editorial serif for the human voice, IBM Plex Mono for the systems voice, and your own hand (the doodles) as the third voice** |
| Navigation | Top bar, active item in the accent color | Minimal top bar | Top bar in grid cells | Rolling-label top bar | **A quiet mono bar with a frame counter. Language shown as `EN / PT`, with the current one "exposed"** |
| Project presentation | 2-col media grid + mono meta | Colorful masonry | Grid with colored type | Folder of cards | **A contact sheet: numbered frames with a cursor loupe preview. No card grid** |
| Motion | Minimal, functional | Growing plants | Lots, pausable | Framer defaults | **"Developing" reveals: slow, soft, slightly uneven. Pausable** |
| Cursor | Pill with "VIEW OVERVIEW" | Custom dot | Tag "READ CASE STUDY" | Native pointer | **Viewfinder brackets that snap to frames; the label is a verb** |
| Case studies | Sticky index, conversational | Sticky index, compact | TL;DR block, big statements | Visual only | **A TL;DR "slate" (like a film slate) + a sticky index. The structure varies per project** |
| Personality | Writing + one italic | Handmade marks | Exuberance | Illustration | **Film, cinema, specs and redlines. A quiet person's detailed little world** |
| Easter eggs | RachelLM | Garden, playground | 404 case, sidequests | (none found) | **A small, catalogued system (see §5)** |
| Responsive | Stacked grid | Stacked masonry | Stacked grid | Stacked cards | **Mobile gets its own composition: a vertical film strip, thumb-reach nav, no cursor** |

### What I can learn from these references

- **Visual language.** Each one commits to *one* strong metaphor and stays with it: restraint, paper notes, a blueprint, stickers. The metaphor does the branding, not decoration.
- **Typography.** All four split the voice in two: a warm display face plus a mono for facts. The mono is almost a genre signal now, so yours has to be *used* differently. It should be the voice of measurement and annotation, not just labels.
- **Layout.** Eemon shows a structure can be the aesthetic. Rachel shows how far whitespace alone carries.
- **Navigation.** Keep it boring and usable. Put the play in the things around the nav.
- **Project presentation.** The best ones give each project honest metadata (status, year, company) and let the cover do the storytelling.
- **Case-study storytelling.** A sticky index plus a TL;DR block respects both the skimming recruiter and the reader who wants depth.
- **Motion.** A control to pause it (Eemon) is the most "UX designer" motion decision among the four.
- **Micro-interactions.** A cursor that becomes a *verb* is now expected. Where yours can differ is in *what it looks like* and *what it snaps to*.
- **Cursor.** Its state should reflect what the thing under it is, not just that it's clickable.
- **Easter eggs.** A side room (Fun, Playground, Sidequests, Play) plus one gift in the footer. Rarely more.
- **Personal branding.** It comes from the writing and one or two signature artifacts, not from volume.
- **Responsive.** All four stack the desktop grid on mobile. That's the opening for you.
- **Framer implementation.** Prasha shows what Framer does cheaply: hover rolls, marquees and appear effects. Anything beyond those needs a code component.

---

## 3. Proposed visual direction: **"Frames"**

You already wrote the concept: *"a UX designer who creates products of all screen sizes and with an absurd number of Figma frames :)"*. The word **frame** runs through your whole life and work:

- **Figma frames:** product design, responsive specs, design systems.
- **Film frames:** the Yashica, the contact sheets, the photos you forget you took.
- **Film frames (cinema):** La La Land, Amélie, When Harry Met Sally on the shelf.
- **Frames as boundaries:** information architecture, what goes where, the double-rule borders you already use.

The site becomes **a very carefully kept archive of frames.** It's part contact sheet and part spec sheet, made by someone who measures things quietly and notices small details. It's not a camera-themed gimmick. The metaphor shows up only in structure, numbering, marks and motion.

### How it shows up

| Element | Treatment |
|---|---|
| Surfaces | Warm paper (not pure white) with ink-black text. There are no rounded cards. Frames are marked with **crop marks and corner brackets**, and the double rule is kept for special moments. |
| Numbering | Projects are frames: `FR 01`–`FR 05`. Case sections follow the same pattern. The nav quietly counts the frames you've seen (`exp. 04`). |
| Annotation layer | **Redlines** like your Specs Generator's: thin measurement lines, `vw` values, contrast ratios. They're used sparingly as decoration, and fully in "spec mode" (§5). |
| Image reveals | Images **develop**: they start as a pale, low-contrast wash and settle into full color, with slight unevenness in timing. |
| Doodles | Your hand-drawn faces become a *character system* with a few expressions (curious, shy, sleeping, delighted). They react; they don't decorate. |
| Color | Paper, ink and graphite, plus **doodle yellow** (from the eyes in your doodles) as the highlighter. There's also **safelight red**, used only for redlines and focus. |
| Dark theme | Not a generic dark mode. It's the **darkroom**: warm near-black with a safelight-red accent. It's offered as a toggle as well as following the OS setting. |

### Typography (proposal, to be tested in the Playground)

| Role | Proposal | Why |
|---|---|---|
| Human voice: display, headings, body | **Newsreader** (variable, optical sizes, real italics) | It's editorial and warm, with enough character at large sizes and a comfortable read at body size. It's not the default Framer serif. Italics carry your asides. |
| Systems voice: nav, metadata, labels, redlines, captions | **IBM Plex Mono**, as today | Continuity with your current site. It becomes the "measuring" voice rather than the everything voice. |
| Hand | Your doodles, as SVG (not a font) | Nobody else has these. |

The Playground will put Newsreader next to one or two alternates, such as Young Serif or Gloock for display only. Fonts sit behind tokens (`--font-voice`, `--font-system`), so you can swap them in one place.

---

## 4. Proposed information architecture

```
/                         Home: the contact sheet
/about                    About: the shelf, the person, the work history
/works/<slug>             Case studies (keeps today's URLs, so existing links still work)
   systems-portal
   responsive-specs-and-accessibility-generator
   bandoneon-iniciative   (existing slug kept, redirect from a corrected spelling)
   bar-tabs-system        🔒
   menu-management        🔒 new
/playground               The design-system kit, linked from the footer, not the main nav
/pt-br/...                Portuguese mirror (same components, translated content)
404                       "This frame didn't develop."
```

**Home page, top to bottom**
1. **First viewport.** A single serif sentence set large, in your voice. A working draft: *"I design products for every screen size — and keep an absurd number of frames."* The word *frames* is an interactive specimen: hover, focus or tap it and it cycles through a Figma frame, a film frame and a picture frame. A doodle peeks in from the edge and follows the cursor with its eyes.
2. **The contact sheet.** Five projects as numbered rows (frame number, title, one line, status, year). On desktop, hovering or focusing a row fills a viewfinder loupe with the project's animated cover. On mobile, every row shows its cover inline, like a vertical film strip.
3. **A short "about" strip** with a way into the shelf.
4. **Footer.** A small gift (§5), "designed by me <3", links, language toggle and the frame counter.

**About:** intro → the shelf (rebuilt, keyboard-accessible) → what I do (with pills for skills and tools, used sparingly) → experience (Volanté, FNDE, Ministry of Agriculture) → kind words → love for art (the film strip) → contact.

**Case studies:** a shared skeleton (hero cover → TL;DR slate → sticky index → sections → next and previous frames), with free choice of section blocks per project. The Menu Management page follows its brief's section order.

---

## 5. Proposed design system

**Tokens** (all CSS custom properties, named so they map to Framer variables later)

- `color.paper`, `color.paper.shade`, `color.ink`, `color.graphite`, `color.graphite.soft`, `color.rule`, `color.highlight` (doodle yellow), `color.redline` (safelight), `color.focus`. Plus a `darkroom` theme that remaps the same names. Every text pairing is AA-checked.
- `font.voice`, `font.system`. Type roles: display, heading.xl/l/m/s, body, body.s, caption, label, nav, meta, code. They use `clamp()` with separate mobile and desktop ratios rather than proportional scaling. For example, display is dramatic on desktop and shrinks sharply, while body stays at 17–18px everywhere.
- `space.1 … space.32` on a 4px base. Layout tokens: `layout.max`, `layout.gutter`, `layout.columns` (12 → 6 → 4), `layout.gap`, `section.space`, `project.space`.
- `radius`: `none` by default, `pill` for pills only, `soft` (2px) for inputs.
- `motion`: durations (`instant 80ms`, `quick 160ms`, `settle 320ms`, `develop 900ms`, `page 600ms`), easings (`ease.soft`, `ease.settle`, `ease.snap`), `stagger.step`, and a `jitter` token that adds a few random milliseconds so sequences feel handmade. Everything collapses to near-zero under `prefers-reduced-motion` and under the site's own **pause-motion** toggle.

**Components** (only where there is reuse): Nav · LanguageSwitch · FrameCounter · Footer · Cursor · Doodle · ContactSheet / FrameRow · ProjectCover (one per project) · CaseHero · Slate (TL;DR) · CaseIndex · Section / SectionLabel · Figure (placeholder-aware: ratio, caption, alt) · Compare (before/after) · StatBlock · DecisionBlock · Pill · Button / Link · Quote · Timeline · PasswordGate · PageTransition · Reveal · EasterEgg registry.

**Easter egg system.** Each egg is one small module registered with a trigger (hover, click count, key sequence, revisit, idle), an effect, translated copy and a `reducedMotion` fallback. A few candidates, each tied to something true about you:

| Egg | Trigger | Why it's you |
|---|---|---|
| **Spec mode** | Press `S` or click a tiny ruler in the footer | The site overlays its own redlines: real `vw` values, spacing tokens and live contrast ratios. It's the Responsive Specs project, played on the portfolio itself. |
| **Unremembered frame** | A random film photo appears in the footer on each visit | "Developed pictures I don't even remember taking." |
| **Shy doodle** | Click the doodle 5 times | It blushes, hides, then peeks back. After 60s of idle, it falls asleep. |
| **Organized shelf** | Put the shelf in order on About | A small thank-you message, and each object plays a one-line note about why it's there. |
| **Frame counter** | Revisiting pages | Frames you've seen get a tiny "developed" tick, and the counter remembers. It's per browser only and never required. |

The unlock animation on the password gate can quietly borrow the "developing" metaphor. The gate never displays or hints at the password.

**Tech proposal.** Astro: static output, components, built-in i18n routing, and zero JavaScript by default. Tokens in plain CSS variables. Motion in CSS plus the Web Animations API, with no GSAP. Content in typed data files per locale (EN and PT side by side), so pages are never duplicated. Deploy to GitHub Pages or any static host.

---

## Open decisions for Inaiá

1. **This GitHub repository is public.** Anything committed here, including protected case content, is readable by anyone, and a client-side gate hides nothing from someone who views the source. Recommendation: **make the repo private**, *and* build the protected pages as **encrypted payloads** that are decrypted in the browser with the password. The gate then protects the published content, not just the UI. Until then, the Menu Management brief and the Bar Tabs text stay out of the repo.
2. **K-pop photocard binder and Sabi.** They're on the current home page but not in your list. Drop them, or keep them as small "side frames" without full cases?
3. **The "Frames" direction and the type pairing.** Go, adjust, or explore an alternative before Phase 2?
4. **Hosting.** A static host (GitHub Pages, Netlify, Vercel) is assumed. The current domain stays on Framer until you decide to switch.
5. **Menu Management, Appendix F.** The ⚠ CONFIRM items (role wording, release status, naming Volanté) must be resolved before that page is *published*. They don't block building it.

# Design: Dark Luxury Portfolio

Dark by default (the client asked for black and gold), with a light-mode toggle. The site is carried by her image, real channel screenshots and confident type.

## Tokens (web/app/globals.css)
| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--wall` | #0B0A09 | #F7F4EE | page ground |
| `--wall-2` / `--wall-3` | #151311 / #1D1A17 | #EFEAE1 / #E6E0D5 | bands, phone bezels |
| `--ink` | #F1ECE3 | #12100E | text |
| `--ink-2` | #A8A197 | #5C5750 | secondary text |
| `--hair` | ink @ 13% | ink @ 14% | 1px rules |
| `--gold` | #D0B07A | #8C6A2F | buttons, accent words, numbers |

`.night` forces the dark palette (contact + footer). Theme stored in `localStorage.theme`, set before paint.

## Type
- Display: Orange Avenue by Ratna Krismawati (commercial licence supplied by client; `web/public/fonts/orange-avenue.woff2`, preloaded). It has no italic, so emphasis words stay upright in gold. Bodoni Moda is the fallback. Hero name at 16vw desktop / 19vw mobile.
- Text: Hanken Grotesk (variable). Self-hosted via @fontsource.

## Signature moments
- **Hero:** her background-removed portrait (`portrait-cut-*.webp`, made with rembg isnet) stands in front of her name. CSS-only entrance: name rises out of a blur, figure lifts.
- **Results:** real screenshots in phone frames; numbers count up once in view (`CountUp`).
- **See it live:** a 60s drifting wall of channel screenshots, paused on hover; replaced by the `Reels` grid once videos exist.
- **Theme switch:** View Transitions cross-fade.

## Rules
- Gold is for the primary action, one italic word per headline and result numbers. Never glows.
- Only defensible numbers. Media sections (reels, voice) hide until real files exist.
- Motion runs on transform/opacity/filter only; everything is off with reduced motion; content is visible without JS.

## Motion layer (globals.css → "Motion layer")
- **Split headlines:** `.split` h2s are wrapped into masked words by `Reveal.tsx`; words rise in a 70ms stagger.
- **Hero parallax** (CSS scroll-driven, `@supports (animation-timeline)`): name sinks and fades, figure lifts and scales slightly, copy fades out.
- **Floating phones:** `.float` / `.float-slow` move against the scroll via `view()` timelines, using `translate` so they stack on rotation.
- **Client marquee:** 40s drift, paused on hover.
- **Curtain:** About portrait opens from an inset clip-path.
- **Progress line:** 2px gold scroll indicator at the top.
- **Hover:** gold underline sweep on nav links, arrow nudge on secondary links, 0.97 press scale on buttons.
- Browsers without scroll timelines get the static layout; reduced motion turns everything off.

## Responsive rules
- Tested with no sideways scrolling from 240px to 2560px wide, in both themes (Playwright check across 17 widths).
- Header: logo becomes the "M.A." monogram below 400px; the header button reads "Hire me" below 340px; nothing in the header wraps.
- Hero name: `19vw` on mobile, `min(16vw, 21svh)` from md up so short, wide screens never push it under the header or into the copy.

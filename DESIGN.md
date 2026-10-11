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
- Display: Bodoni Moda (variable, optical size). Hero name at 17vw desktop / 24vw mobile, second line italic gold.
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

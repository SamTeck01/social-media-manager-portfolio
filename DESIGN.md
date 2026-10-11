# Design: The Exhibition

The portfolio is a solo exhibition. Each client is a hung work with a museum wall label; the theme switch is the gallery's lights.

## Tokens (web/app/globals.css)
| Token | Light (white cube) | Dark (after hours) | Use |
|---|---|---|---|
| `--wall` | #F6F4EF | #0E0D0C | page ground |
| `--wall-2` | #EEEBE4 | #171513 | plates, testimony room |
| `--ink` | #121110 | #EEE9E0 | text, primary button |
| `--ink-2` | #57534D | #A39D93 | secondary text |
| `--hair` | ink @ 14% | ink @ 14% | 1px rules, frames |
| `--gilt` | #8F6D33 | #C9A96A | gold text (AA on wall) |
| `--gilt-line` | #B8955A | #C9A96A | gold rules, switch, focus |

`.after-hours` forces the dark palette (Inquire room in both modes). Theme stored in `localStorage.lights`, set before paint.

## Type
- Display: Bodoni Moda (variable, optical size), weight 400, tracking -0.02em, balanced. Max ~5.75rem.
- Text and labels: Hanken Grotesk (variable), tabular figures on. Wall labels 13–15px.
- Self-hosted via @fontsource.

## Components
- **Wall label:** "No. n" in gilt, client in display, location, medium in italic, summary, results as gilt-dash list, external links with stroke arrow icon.
- **Piece:** real image/video when supplied; otherwise a title card in a 1px gilt mat on `--wall-2`.
- **Lights switch:** `role="switch"`, View Transitions cross-fade (0.7s), falls back to instant.
- Icons: one 1.5px stroke family (`components/Icon.tsx`). No emoji or unicode glyphs.

## Motion
One authored moment: wall labels settle in (opacity, 10px rise, 4px blur → 0, 0.9s expo-out) once, when they enter the viewport. Content is visible without JS. Reduced motion disables all of it.

## Rules
- Gold is gilt: numbers, hairlines, one italic word per headline. Never fills or glows.
- No cards, shadows, rounded corners (except the switch), kickers/eyebrows, or stat-tile rows.
- Compositions vary per work: large left, mid right, small centred.
- Only defensible numbers. Media sections hide until real files exist.

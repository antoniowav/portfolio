# DESIGN.md — Antonio · Personal Creator Hub

Editorial, warm, asymmetric. Paper + ink + one vermilion accent. Reads like a
printed magazine spread made by one specific person. No terminal, no shadcn, no
neutral-gray.

## Color (OKLCH — light, warm paper)

Color strategy: **Committed**. Warm paper carries the surface, ink carries the
type, a single vermilion accent does all the pointing. Tinted neutrals only,
never `#000`/`#fff`. Hue family ~50–85 (warm).

| Token | OKLCH | Role |
|-------|-------|------|
| `paper` | `0.965 0.013 83` | Page background (warm bone) |
| `paper-sink` | `0.94 0.014 80` | Recessed band / subtle fill |
| `card` | `0.99 0.006 85` | Raised surface |
| `ink` | `0.22 0.018 55` | Primary text, dark band bg |
| `ink-2` | `0.40 0.018 55` | Secondary text |
| `ink-3` | `0.56 0.016 58` | Tertiary / meta |
| `line` | `0.87 0.013 80` | Borders, rules |
| `accent` | `0.60 0.205 37` | Vermilion — links, CTAs, marks |
| `accent-deep` | `0.50 0.175 35` | Hover / pressed accent |
| `on-accent` | `0.98 0.01 85` | Text on accent |
| `on-ink` | `0.95 0.012 84` | Text on the dark ink band |

Dark band (templates): bg `ink`, text `on-ink`, accent stays vermilion.

## Typography

- **Display — Fraunces** (variable, optical sizing on). Hero name + section heads.
  Weights 400/500/600/900, italic for emphasis. Tight leading (0.92) at large sizes.
- **Body / UI — Hanken Grotesk.** 400/500/600/700. Line-height 1.6, measure ≤68ch.
- **Micro — Spline Sans Mono.** Eyebrows, section indices (01/02), tags, the NOW
  line. Uppercase, `letter-spacing: 0.16em`, ~12–13px. Use sparingly.

Scale (fluid): hero `clamp(3.25rem, 9vw, 8rem)` · h2 `clamp(2rem, 4.5vw, 3.5rem)`
· lead `clamp(1.15rem, 2vw, 1.5rem)` · body `1.0625rem`. Step ratio ≥1.25.

## Layout

- 12-col asymmetric grid, max content width ~1240px, generous warm gutters.
- Hero left-weighted: name set huge, breaking the grid; photo/mark + meta offset right.
- Sections separated by hairline `line` rules + varied vertical rhythm (not uniform).
- Products: editorial index grid. Featured (Kontra) spans wider; others vary. Each
  card carries a mono index, name in Fraunces, one-liner, tag, arrow link. NOT
  identical icon-heading-text cards.
- Templates: full-bleed dark `ink` band, lead product featured.
- Studio: quiet indented aside. Follow: large closing block with email form.

## Motion

- framer-motion. Ease-out-expo `cubic-bezier(0.16,1,0.3,1)`, 450–650ms.
- Scroll-reveal: translateY(16px)+fade, stagger 40ms, once. Transform/opacity only.
- Link/CTA hover: accent underline grow + 120ms color. Card hover: lift via shadow,
  no layout shift. Respect `prefers-reduced-motion` (disable transforms).

## Bans (this project)

Centered hero. Big-number hero-metric block. Identical card grids. Gradient text.
Side-stripe borders. Em dashes in copy. Monospace body. Emoji as icons (SVG only).

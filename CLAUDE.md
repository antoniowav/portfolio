# CLAUDE.md — Antonio · Personal Creator Hub

Single-page personal creator hub. Next.js (App Router) + TypeScript + Tailwind,
static, deploy to Vercel. The old terminal-style multi-page portfolio was retired
in favour of this. **Design system is locked in `DESIGN.md`; product spec in
`PRODUCT.md`. Read both before touching UI.**

## Stack

- Next.js 14 App Router, TypeScript, Tailwind v3 (tokens map to OKLCH CSS vars).
- Fonts via `next/font/google`: Fraunces (display), Hanken Grotesk (body),
  Spline Sans Mono (micro). No Inter.
- Motion: framer-motion (already a dep). Email: Resend (already a dep).

## Architecture

- `src/data/site.ts` — ALL editable content as typed arrays: profile, products,
  templates, studio, socials, now-line. Adding a product = one entry. This is the
  only file to edit for content.
- `src/components/hub/*` — one component per section.
- `src/app/page.tsx` — assembles sections in order.
- `src/app/api/subscribe/route.ts` — email signup. Uses Resend if `RESEND_API_KEY`
  is set, else accepts-and-logs (clean stub). Returns `{ ok }`.

## Sections (single page, anchored)

1. Hero — name, one-liner, animated editorial mark, CTAs (Follow on Threads / See what I'm building).
2. Now — short editable "currently shipping" line.
3. Products — editorial index grid from `products[]` (`status: 'building'` shows a live dot; a product with no `url` renders as a non-link row).
4. Templates — Notion templates band. No store yet, so it runs as a **waitlist**: `templates.live === false` shows a `SignupForm` (source `templates`) instead of a buy CTA. Flip `templates.live` + set `templates.url` in site.ts when the store goes up.
5. Studio — short Coda handoff + link.
6. Follow — Threads (primary), TikTok, email signup with success/error states.
7. Footer — repeated links, minimal.

Signup UI lives in one place: `src/components/hub/SignupForm.tsx`, reused by Follow
and Templates. The `source` prop tags the signup server-side (`/api/subscribe`).

## Guardrails

- Honour `DESIGN.md` bans. No terminal aesthetic, no Inter, no neutral-gray, no
  centered-hero, no em dashes in copy.
- Accessible: semantic landmarks, visible focus, aria-labels on icon links,
  `prefers-reduced-motion` respected. Great Core Web Vitals (reserve image space).
- Content edits live in `src/data/site.ts` only.

## TODO placeholders to fill (marked in src/data/site.ts)

Threads / TikTok / Instagram handles (guessed @okbye_toni), hero photo asset,
OG image (public/og.png). Search `TODO` in that file. Live URLs already set:
Kontra (usekontra.com), Everly (everly-nu.vercel.app, building), Coda studio.

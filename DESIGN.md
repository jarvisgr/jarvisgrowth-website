# DESIGN.md

> A midnight control-room for Instagram growth: real iPhones glowing in the dark, Instagram-gradient energy, and calm, trustworthy data.

Built with the `xiaopu-ai/web-design` workflow (Phase A reference analysis -> Phase B this spec -> Phase C code). Library syntax (Tailwind v4 Play CDN, `@theme`, Alpine 3 plugins, `x-intersect`, `x-collapse`) verified through Context7.

## 1. Visual Theme & Atmosphere

**Style**: Dark Tech x Warm Professional ("Dark Editorial with a pulse")
**Keywords**: midnight, live, glass, gradient-energy, device-first, precise, proof-driven, cloud
**Tone**: Confident, technical, transparent. NOT hype-y, NOT neon-cyberpunk-noise, NOT generic SaaS purple.
**Feel**: Standing in a dark server room where every iPhone on the rack is quietly working for you, while a clean console in your browser shows it all.

**Reference audit (ShadowPhone, `shadowphone.io`)**
- Kept: sticky slim nav (logo chip with glow + icon, centered text links, spacer, `Sign in` ghost + primary CTA, hamburger under 880px), near-black canvas, phone mockup hero with a live "run log", scrolling proof marquee, workflow cards, comparison table with our column highlighted, tabbed console mockup, 4-step "how it works", pricing by number of phones, FAQ, final CTA.
- Different on purpose: we are a **cloud** product (login, watch live, daily stats) and run **real iPhones (iOS)** in our own office, not the customer's Pixels over USB. Palette moves from yellow-on-black to Instagram-adjacent magenta/orange/violet with a cyan "live" signal. Hero is a dashboard-in-browser composition, not a single phone.

**Interaction Tier**: L2 plus selective L3 moments (no scroll-jacking)
**Dependencies**: Tailwind CSS v4 Play CDN, Alpine.js 3 (+ Intersect, Collapse plugins). Everything else is vanilla JS/CSS.

## 2. Color Palette & Roles

Defined once in `assets/landing.css` `:root`, exposed to Tailwind through `@theme inline`. Markup never uses raw hex.

```css
:root {
  /* Backgrounds */
  --ink: #07060d;               /* page */
  --ink-soft: #0b0a14;          /* alternate sections */
  --surface: #11101c;           /* cards */
  --surface-hi: #181628;        /* raised / hover */
  /* Borders */
  --line: #221f35;
  --line-hi: #34304f;
  /* Text */
  --fg: #f6f4ff;
  --fg-soft: #d3cfe8;
  --fg-dim: #9a95b8;
  --fg-faint: #6c6790;
  /* Accent (Instagram-adjacent) */
  --pink: #ff3d8b;
  --orange: #ff9a3d;
  --violet: #8b5cf6;
  --cyan: #22d3ee;              /* "live" / cloud signal */
  /* Semantic */
  --ok: #4ade80;
  --warn: #fbbf24;
  --bad: #fb7185;
  /* RGB helpers for rgba() */
  --pink-rgb: 255 61 139;
  --orange-rgb: 255 154 61;
  --violet-rgb: 139 92 246;
  --cyan-rgb: 34 211 238;
  --ink-rgb: 7 6 13;
}
```

**Color Rules**
- Brand gradient `--grad-brand` = orange -> pink -> violet. Used for primary CTA, hero keyword, key numbers. Max one gradient headline word per section.
- Cyan only means "live / real-time / cloud". Never decorative.
- Green only means success/verified/ticks. Review-platform stars use `--ok`.
- Body text never darker than `--fg-dim` on `--ink` (AA contrast).

## 3. Typography Rules

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Bricolage Grotesque | clamp(2.75rem, 7vw, 5.5rem) | 800 | 0.98 | -0.035em |
| Section H2 | Bricolage Grotesque | clamp(2rem, 4.4vw, 3.25rem) | 700 | 1.05 | -0.025em |
| H3 | Bricolage Grotesque | 1.2-1.5rem | 700 | 1.2 | -0.01em |
| Body | Inter | 1rem-1.125rem | 400 | 1.65 | - |
| Label / eyebrow | JetBrains Mono | 0.72rem | 500 | 1.2 | 0.14em uppercase |
| Mono / log | JetBrains Mono | 0.75-0.8rem | 400 | 1.5 | - |

**Rules**
- Heading weight >= 700. Hero >= 60px on desktop.
- Fallbacks: `system-ui, -apple-system, "Segoe UI", sans-serif` / `ui-monospace, "SF Mono", Menlo, monospace`.
- **NEVER use**: Arial/Roboto as primary, Satoshi/General Sans (ShadowPhone's), purple-on-white defaults.

**Text Decoration (per text-decoration-rules)**
- Hero H1: one flowing gradient keyword, no drop shadow.
- Section H2: plain `--fg`; at most one gradient word.
- H3 / body: none.

## 4. Component Stylings

### Buttons
- **Primary**: `--grad-brand` fill, `--ink` text, pill radius, inner top highlight; hover: lift 1px + glow `rgb(var(--pink-rgb) / .45)`, a shine sweep; active: scale .98; focus-visible: 2px `--cyan` ring offset 3px; disabled: 45% opacity, no pointer events.
- **Ghost**: transparent, `--line-hi` border, `--fg-soft` text; hover: `--surface-hi` bg + `--fg`; same focus ring.
- **Magnet**: primary CTAs translate toward the pointer up to 8px (hover-capable devices only).

### Cards (SpotlightCard)
- `--surface` fill, 1px `--line` border, radius 20px. A radial gradient follows the pointer via `--mx/--my` (rAF throttled). Hover: border `--line-hi`, no lift on dense data cards. Focus-within: cyan ring.

### Navigation
- Fixed, 64px. Transparent at top; after 12px scroll: `rgb(var(--ink-rgb)/.72)` + 12px backdrop blur + bottom border. Links `--fg-dim` -> `--fg` + `--surface` bg on hover/focus. Under 880px: links/CTA collapse into a hamburger sheet (Alpine `x-show` + transition). Active section link gets a gradient underline.

### Tags / Badges
- Mono uppercase, 999px radius, `--surface` bg, `--line` border. "Live" badge: cyan dot with ping animation.

### Comparison table
- Our column: gradient top border, `--surface-hi` bg, glow. Ticks `--ok`, partial `--warn`, cross `--bad` (also conveyed by text, never color alone).

### Accordion (FAQ)
- Alpine `x-collapse`; chevron rotates 180deg; button is the full row, focus ring visible.

## 5. Layout Principles

- Container: 1200px max, `px-5 sm:px-8`. Narrow text column 720px.
- Section padding: `py-24 md:py-32`. Component gap 16-24px. Card padding 24-28px.
- Bento: 6-column grid with spans `2/3/4` (unequal on purpose); collapses to 1 column on mobile.
- Hero stage: 3-column dashboard (fleet list / live phone / today stats) collapsing to phone + stats stack on mobile.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | border only | table rows, lists |
| Subtle | `inset 0 1px 0 rgb(255 255 255/.05)` + 1px border | cards |
| Elevated | `0 24px 60px -20px rgb(0 0 0/.7)` + border | dashboard window, pricing |
| Glow | brand-colored `0 0 80px -10px rgb(var(--pink-rgb)/.35)` | featured plan, hero phone |

## 7. Animation & Interaction

**Motion Philosophy**: Only `opacity` and `transform` on moving things; gradients/aurora are layered `radial-gradient` backgrounds translated (never `filter: blur` on moving elements). One heavy ambient layer per viewport.
**Tier**: L2 + selective L3.

### Signature moments (>= 6)
1. **Hero Aurora** background (3 drifting radial-gradient layers + grain) and a pointer **spotlight** (`--mx/--my`).
2. **Hero H1 word reveal** (SplitText style, masked rise) + **flowing gradient** keyword.
3. **Live hero dashboard**: an iPhone driving a scripted Instagram session (like -> follow -> story -> DM -> post) with tap ripples, while the stat tiles count up and the action log streams. Pauses when off-screen.
4. **Manifesto marquee** (CSS `translateX`) straight under the hero, followed by a **CountUp** stat band.
5. **Bento with SpotlightCards** (unequal sizes), live-view tile, animated bars, auto-scrolling log, interactive daily-cap slider.
6. **Left-sticky / right-swap** "How it works": the phone on the right swaps scenes as steps scroll by.
7. **Growth chart** with SVG path draw + tabs (case studies).
8. **Review wall**: two counter-scrolling columns, pause on hover.
9. **Magnet CTA** + shine sweep.
10. **Easter egg / meta detail**: press <kbd>Ctrl</kbd>+<kbd>K</kbd> (or `/`) for a command palette that jumps to any section.

### Entrance
`reveal` = `opacity 0 -> 1`, `translateY(18px) -> 0`, 700ms `cubic-bezier(.2,.7,.3,1)`, triggered once through Alpine `x-intersect.once`, with `--d` stagger.

### Hover & Focus
Every `a`, `button`, `summary`-like control has `:hover` and `:focus-visible` (2px cyan ring). Cards: spotlight + border change.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
  .marquee-track, .aurora i { animation: none !important; }
}
```
JS also checks `matchMedia('(prefers-reduced-motion: reduce)')` and shows the final state instead of looping the demo.

## 8. Do's and Don'ts

### Do
- Keep every number, review and price in the single `DATA` object in the page script so real values drop in without hunting through markup.
- Pair every claim with its limit ("outcomes depend on configuration and use").
- Use cyan strictly for live/cloud meaning.
- Keep hero content readable at 360px wide.
- Provide text alternatives for icon-only buttons (`aria-label`).
- Pause every ambient loop when its section is off-screen.

### Don't
- ❌ Hard-code hex values outside `:root`.
- ❌ Use `filter: blur()` on any animated element, or `backdrop-filter` above 14px.
- ❌ Add more than one gradient word to a heading.
- ❌ Scroll-jack or hijack native scrolling.
- ❌ Use solid-color boxes as image placeholders.
- ❌ Promise "no bans" or guaranteed growth.
- ❌ Reuse ShadowPhone assets, copy, fonts or yellow brand color.
- ❌ Show review-site ratings that are not real and verifiable at launch.
- ❌ Use emoji as icons (inline SVG only).

## 9. Responsive Behavior

| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1024px | 3-column hero dashboard, 6-col bento, sticky "how it works" |
| Tablet | 640-1024px | hero dashboard becomes phone + stats, bento 2-col, table scrolls horizontally |
| Mobile | < 640px | single column, hamburger nav, aurora reduced to a static gradient, review wall one column |

**Touch targets**: >= 44x44px. **Collapsing**: hover-only effects (spotlight, magnet) are gated by `(hover: hover)`.

# HANDOFF — Priyanshu Chauhan portfolio, premium overhaul

Repo: https://github.com/beyondbound889/bb-portfolio
Live: https://priyanshu-chauhan.vercel.app/
Stack: Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind v3.4 · framer-motion 11

> Paste this whole file into a new Claude chat as the first message, along with
> "continue Phase 2 of the bb-portfolio premium overhaul" — it has everything
> needed to pick this up cold.

---

## 0. The one thing to understand before touching anything

This repo already has a **complete, working, well-built site** — real content
written carefully in `lib/content.ts` (every claim sourced/flagged), TypeScript
compiles clean, all 12 sections built, light/dark theme via `next-themes`.

A different design direction (dark "obsidian" glassmorphism, inline styles,
different content shape) was explored in an earlier session but **never
merged** — don't resurrect those files verbatim, they reference CSS variables
and content fields that don't exist here. If continuing that aesthetic
direction is still wanted, port the *ideas* (glass cards, cinematic motion,
ambient lighting) into this real component system, the way Phase 1 did for
the cursor/ambient-background/magnetic-nav — don't copy-paste.

**Do not invent biography, numbers, or claims.** `lib/content.ts` has a
`TODO(verify)` convention — respect it. This is a healthcare/wellness brand;
honesty is the actual product positioning ("measured, not marketed").

---

## 1. Phase 1 — DONE this session

- **Fixed a real functional bug**: the contact form (`components/sections/Contact.tsx`)
  imported `zod` but never wired it into `react-hook-form` — validation never
  actually ran, so blank/invalid submissions silently passed through. Added
  `@hookform/resolvers` + `zodResolver`, a honeypot anti-spam field, a proper
  `--danger` color token (errors no longer reuse brand teal), and
  `aria-invalid` wiring.
- **Audited the Journey timeline** for the indentation bug you flagged —
  recalculated the box-model geometry by hand: in the *current deployed*
  component the dot is mathematically centered on the rail at every
  breakpoint (verified, not assumed). No misalignment found in the live code.
  Left that geometry untouched and added a scroll-driven gradient fill
  (echoes the SteadyLine "steady curve" motif) plus hover lift/glow per item.
  **If you still see a visual glitch on the live site, it's something I
  couldn't reproduce from code alone — send a screenshot + viewport width
  next session and it'll get fixed fast.**
- **Premium interaction layer** (new, all under `prefers-reduced-motion`
  and `pointer: fine` guards):
  - `components/ui/AmbientBackground.tsx` — two slow drifting brand-colour
    orbs + mouse-reactive spotlight, fixed behind all content.
  - `components/ui/PremiumCursor.tsx` — custom ring+dot cursor, expands on
    interactive hover. **Explicitly does not override `cursor` inside
    inputs/textareas/selects** so typing/caret placement stays native.
  - Magnetic-hover nav links (`components/nav/Navbar.tsx`).
  - Card hover lift + brand-tinted glow shadow across Focus, Values, Media,
    Personal, Impact, Insights, and the Glycomics product card.
  - Button shine-sweep (`.btn-shine`) on the Connect CTA and form submit.
- **Verified**: `npx tsc --noEmit` is clean. (Full `next build` couldn't run
  in my sandbox — it has no network access to `fonts.googleapis.com` for
  `next/font/google`'s Inter fetch. That's a sandbox limitation, not a code
  bug; your local machine and Vercel both have normal internet access and
  this exact font-fetch step is what was already passing per the repo's own
  `STATUS.md`.)

### One judgment call I made — flag if you disagree
A site-wide custom cursor (`PremiumCursor`) is a strong stylistic choice for
a *trust-first healthcare brand*. It's built tastefully (small, brand-teal,
respects reduced-motion, never hides form carets) but if it feels like too
much personality for "measured, not marketed," it's a two-line removal:
delete the `<PremiumCursor />` line in `app/layout.tsx` and the
`@media (pointer: fine) { … }` cursor block in `globals.css`.

---

## 1b. Phase 2, items 2–4 — DONE this session

Picked up the Phase 2 priority list below. Skipped item 1 (hero rebuild) —
still on hold pending the video/photo asset, per the original plan. Shipped
items 2, 3, and 4:

- **Glass-morphism depth pass, dark mode only** — every card surface that
  uses the `bg-surface`/`bg-paper` token (Focus, Impact, Values, Media,
  Insights, BeyondBound's mission/vision/approach cards, Personal cards, the
  Contact info links + form + success card) now gets `dark:backdrop-blur-xl
  dark:backdrop-saturate-150` plus a translucent `dark:bg-surface/35–50` in
  dark mode — pure Tailwind utility composition, no new CSS, **zero changes
  to light mode**. Visually this is the biggest single change in this round:
  in dark mode the ambient orbs from Phase 1 now bleed through every card,
  which is genuinely the "obsidian glass" look the original spec wanted —
  built the safe way, on top of the real component system, not the
  abandoned inline-style branch mentioned in §0.
  - Deliberately left the `bg-ink` Glycomics product showcase card alone —
    it's already a solid brand-color block, not part of the paper/surface
    system, and glassing it would fight the design rather than help it.
- **Scroll-storytelling parallax** — new reusable `components/ui/ParallaxImage.tsx`
  (a `next/image` wrapped in a scroll-linked `framer-motion` translateY,
  same `useScroll`/`useTransform` pattern as Journey's rail fill from Phase
  1). Wired into the two spots the handoff named: the Vision section's
  background photo (`priyanshu-rooftop.png`) and the BeyondBound product
  photo (`priyanshu-desk.png`). Both stay **Server Components** — the
  parallax client logic is isolated entirely inside `ParallaxImage`, so
  `BeyondBound.tsx` and `PersonalVision.tsx` didn't need `"use client"`.
  Respects `prefers-reduced-motion` (locks to a static centered image).
- **Form hardening** — added a time-trap anti-bot check (rejects submissions
  faster than 2.5s after the form mounts — no real visitor reads and fills
  a form that fast) alongside the existing Phase-1 honeypot, and wrapped the
  form/success-card swap in an `aria-live="polite"` region so screen readers
  announce "Message sent" or the error state. **Did not** build Cloudflare
  Turnstile — checked Web3Forms' docs first and Turnstile support is a
  **paid Pro feature** on their end, so wiring it now would just be dead
  code until/unless that subscription exists. Flagging it here rather than
  guessing.
  - **Still needs a human step, can't be done from a sandbox**: get a free
    key at web3forms.com and set `NEXT_PUBLIC_WEB3FORMS_KEY` in Vercel →
    Project → Settings → Environment Variables. Until then the form keeps
    working via the existing `mailto:` fallback, unchanged.
- **Verified for real this time**: `npm install` succeeded in-sandbox (the
  npm registry is reachable here, unlike last session), `npx tsc --noEmit`
  is clean, and `npx next build` got all the way through TypeScript +
  webpack compilation of every file before failing at the exact same
  `fonts.googleapis.com` step noted in §7 below — confirming the new code
  compiles cleanly and the only blocker is this sandbox's network allowlist,
  not the changes themselves.

---

## 2b. How to apply Phase 2, items 2–4

1. Pull the 1 new file + 7 changed files below into the matching paths.
2. **No `npm install` needed** — zero new dependencies were added.
3. `npm run dev`, check dark mode specifically (the glass effect is dark-mode-only
   by design) across Focus, Impact, Values, Media, Insights, BeyondBound,
   Personal, and Contact. Scroll past the Vision section and the BeyondBound
   product photo to see the parallax drift.
4. `npx tsc --noEmit` should print nothing (clean).
5. Commit + push (commands below) — Vercel auto-deploys on push to `main`.

### Files touched (paths relative to repo root)
```
components/sections/BeyondBound.tsx      (modified)
components/sections/Contact.tsx          (modified)
components/sections/Focus.tsx            (modified)
components/sections/Impact.tsx           (modified)
components/sections/Insights.tsx         (modified)
components/sections/PersonalVision.tsx   (modified)
components/sections/ValuesMedia.tsx      (modified)
components/ui/ParallaxImage.tsx          (NEW)
```

### Git commands
```bash
git add components/sections/BeyondBound.tsx components/sections/Contact.tsx \
  components/sections/Focus.tsx components/sections/Impact.tsx \
  components/sections/Insights.tsx components/sections/PersonalVision.tsx \
  components/sections/ValuesMedia.tsx components/ui/ParallaxImage.tsx

git commit -m "Phase 2 (2-4): dark-mode glass cards, scroll parallax on Vision/BeyondBound, form hardening"
git push origin main
```

---

## 2. How to apply Phase 1 (do this first)

1. Pull the 13 changed files + 2 new files from the delivery package into
   the matching paths in your local clone (paths below match exactly).
2. `npm install` (this picks up the new `@hookform/resolvers` dependency
   already added to `package.json`).
3. `npm run dev` and click through every section, both themes
   (the moon/sun icon top-right), mobile width.
4. `npx tsc --noEmit` should print nothing (clean).
5. Commit + push (commands in §5) — Vercel auto-deploys on push to `main`.

### Files touched (paths relative to repo root)
```
app/globals.css                          (modified)
app/layout.tsx                           (modified)
components/nav/Navbar.tsx                (modified)
components/sections/BeyondBound.tsx      (modified)
components/sections/Contact.tsx          (modified)
components/sections/Focus.tsx            (modified)
components/sections/Impact.tsx           (modified)
components/sections/Insights.tsx         (modified)
components/sections/Journey.tsx          (modified)
components/sections/PersonalVision.tsx   (modified)
components/sections/ValuesMedia.tsx      (modified)
package.json                             (modified — added @hookform/resolvers)
tailwind.config.ts                       (modified — added `danger` color)
components/ui/AmbientBackground.tsx      (NEW)
components/ui/PremiumCursor.tsx          (NEW)
```

---

## 3. Phase 2 — remaining items (not started)

Priority order, each is independently shippable. Items 2–4 from the
original list are done (see §1b above) — renumbered here to just the
remaining work:

1. **Hero rebuild** — still on hold; user is producing a video/photo asset
   for it. When ready: `components/sections/Hero.tsx` is currently a calm
   single-portrait layout. The 5 real photos already live in
   `public/images/` (`priyanshu-portrait.png`, `priyanshu-desk.png`,
   `priyanshu-window.png`, `priyanshu-office.png`, `priyanshu-rooftop.png`)
   — these are the same images uploaded to this chat, already in the repo.
   A Sahil-Bloom-style rotating photo stack with Ken Burns zoom + swipe is
   very buildable from these real assets (no synthetic imagery needed —
   see §6). If a real video file is provided, swap `<Image>` for a muted
   autoplay `<video>` with the same dark-overlay treatment. The new
   `components/ui/ParallaxImage.tsx` from this session can be a building
   block here too (just needs a crossfade/stack wrapper around it).
2. **Real Insights articles** — `lib/content.ts` → `insights[]` all point to
   the same LinkedIn profile URL right now (honest placeholder). Swap in
   specific post URLs as they're picked.
3. **Command palette polish** — already functional (`⌘K`), could get the
   same glass/glow treatment as the rest of Phase 1/2.
4. **Lighthouse/axe pass** on the deployed URL now that the glass + parallax
   effects layer has landed — confirm CLS, contrast, and reduced-motion are
   all still clean. The `backdrop-blur` cards are the one thing worth a
   second look on lower-end Android devices specifically; if frame rate sags
   there, the fix is reducing `backdrop-blur-xl` to `backdrop-blur-md` on
   the worst-offending sections, not removing the effect.

---

## 4. File structure (for VS Code reference)

```
bb-portfolio/
├── app/
│   ├── globals.css       ← design tokens + all new premium-effect CSS
│   ├── layout.tsx        ← root layout, renders AmbientBackground/PremiumCursor
│   ├── page.tsx          ← section order (don't need to touch for Phase 2)
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── nav/
│   │   ├── Navbar.tsx        ← magnetic links live here
│   │   ├── CommandPalette.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── ThemeToggle.tsx
│   ├── sections/             ← one file per homepage section
│   │   └── ... (Hero, Philosophy, Journey, Focus, BeyondBound, Impact,
│   │             Insights, ValuesMedia, PersonalVision, Contact, Footer)
│   ├── ui/                   ← shared primitives — NEW files go here
│   │   ├── AmbientBackground.tsx   ← NEW (Phase 1)
│   │   ├── PremiumCursor.tsx       ← NEW (Phase 1)
│   │   ├── ParallaxImage.tsx       ← NEW (Phase 2) — scroll-linked image drift
│   │   ├── Reveal.tsx              (scroll-reveal wrapper, framer-motion)
│   │   ├── Section.tsx             (section/eyebrow wrapper)
│   │   ├── CountUp.tsx
│   │   ├── SteadyLine.tsx          (the brand's signature curve motif)
│   │   └── Icon.tsx
│   ├── Analytics.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── content.ts         ← ALL copy lives here, typed — edit copy only here
│   └── utils.ts           ← `cn()` helper
├── types/index.ts          ← shared TS types for content.ts
└── public/images/          ← the 5 real founder photos already in place
```

---

## 5. Git commands to push and trigger Vercel auto-deploy

From the repo root, after copying the changed files in:

```bash
git add app/globals.css app/layout.tsx \
  components/nav/Navbar.tsx \
  components/sections/BeyondBound.tsx components/sections/Contact.tsx \
  components/sections/Focus.tsx components/sections/Impact.tsx \
  components/sections/Insights.tsx components/sections/Journey.tsx \
  components/sections/PersonalVision.tsx components/sections/ValuesMedia.tsx \
  components/ui/AmbientBackground.tsx components/ui/PremiumCursor.tsx \
  package.json package-lock.json tailwind.config.ts

git commit -m "Phase 1: fix contact form validation, timeline polish, premium interaction layer"
git push origin main
```

Vercel is already connected to this repo (per `STATUS.md`), so the push
alone triggers a new deploy — no extra Vercel CLI steps needed. Watch the
deploy at vercel.com/dashboard if you want to confirm it goes green.

---

## 6. About the "generate premium photos/video of Priyanshu's face" ask

I can't generate synthetic images or video of a real, identifiable person —
that's a hard line regardless of available tooling, and separately, this
sandbox has no image/video generation tool at all. The good news: it isn't
needed. The 5 photos already uploaded to this chat are **already in the
repo** at `public/images/` and already wired into the live site (Philosophy,
BeyondBound, Vision sections). For the Sahil-Bloom-style hero, the move is a
CSS/JS Ken-Burns slideshow built from those *real* photos (zoom + crossfade +
swipe, exactly like the reference site) — genuinely achievable, no synthetic
imagery required, and it's a natural Phase 2 item once a decision is made on
keeping the calm single-portrait hero vs. the rotating-stack version.

---

## 7. Known sandbox limitation (not a code bug)

`next build` fails in my execution sandbox only because it can't reach
`fonts.googleapis.com` (network allowlist doesn't include it). `npx tsc
--noEmit` is the verification I used instead — it's clean. Your local
machine and Vercel's build environment both have normal internet access, so
this won't reproduce there.
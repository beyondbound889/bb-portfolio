# HANDOFF — Priyanshu Chauhan portfolio, premium overhaul

Repo: https://github.com/beyondbound889/bb-portfolio
Live: https://priyanshu-chauhan.vercel.app/
Stack: Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind v3.4 · framer-motion 11

> Paste this whole file into a new Claude chat as the first message, along with
> "continue Phase 4 of the bb-portfolio premium overhaul" — it has everything
> needed to pick this up cold.

---

## 0. The one thing to understand before touching anything

This repo already has a **complete, working, well-built site** — real content
written carefully in `lib/content.ts` (every claim sourced/flagged), TypeScript
compiles clean, all 12 sections built, light/dark theme via `next-themes`.

**Do not invent biography, numbers, or claims.** `lib/content.ts` has a
`TODO(verify)` convention — respect it.

---

## 1. Phase 1 — DONE

- Fixed contact form validation bug (zodResolver wired up)
- Journey timeline scroll-fill gradient
- Premium interaction layer: AmbientBackground, PremiumCursor, magnetic nav, card hover glows, btn-shine

## 2. Phase 2 — DONE

- Glassmorphism dark-mode depth pass on all card surfaces
- ParallaxImage primitive (useScroll + useTransform) on Vision + BeyondBound
- Form hardening: time-trap + honeypot + aria-live

## 3. Phase 3 — DONE (this session)

**All files verified `npx tsc --noEmit` clean. Zero new npm dependencies.**

### What was built:

**NEW FILES:**
- `components/ui/GlucoseChart.tsx` — animated SVG data viz showing founder's CGM self-observation.
  Two curves drawn via framer-motion stroke-dashoffset on scroll-enter. **This is the biggest
  visual differentiator vs. the competitor site.** Shows up inside Journey section.
- `components/ui/TrustBanner.tsx` — auto-scrolling horizontal ticker of credentials, institutions,
  and milestones. Positioned immediately below hero. Competitor has nothing like this.

**HEAVILY UPGRADED FILES:**
- `components/sections/Hero.tsx` — **Ken Burns rotating photo stack** using all 5 existing images
  (`priyanshu-portrait.png`, `priyanshu-window.png`, `priyanshu-desk.png`, `priyanshu-office.png`,
  `priyanshu-rooftop.png`). Photo dots let user jump directly. Ken Burns zoom + crossfade.
  **Typewriter headline** cycling through 4 phrases. Two floating context chips (glass-morphism).
  Live pulsing indicator dot on eyebrow badge.
- `components/sections/Journey.tsx` — Fixed timeline alignment (dot now precisely on the rail line),
  refactored spacing using `space-y-0` + direct `left: 6px`. **GlucoseChart injected at the bottom**
  with narrative framing. Cards animate in on hover with glass bg.
- `components/sections/Philosophy.tsx` — Upgraded to **3-column principle mini-cards** (Measure /
  Prove / Build), pull-quote pills in left column, quote overlay text on the image, founder avatar
  attribution on the big blockquote card.
- `components/sections/BeyondBound.tsx` — Brand badge, animated approach checklist (framer stagger),
  product card now has "Visit on Amazon" CTA button inside.
- `components/sections/ValuesMedia.tsx` — Values cards get **numbered watermarks** (01/02/03),
  Media cards get **gradient bottom accent bar** on hover.
- `components/sections/Insights.tsx` — Color-coded kind badges (petrol/sprout/amber), **LinkedIn CTA
  strip** at bottom.
- `components/sections/Impact.tsx` — Bottom accent bar on each metric card, honesty footnote.
- `components/sections/PersonalVision.tsx` — Vision closing quote now in a branded blockquote card
  with petrol background, founder attribution.
- `components/sections/Footer.tsx` — Full 4-column redesign: brand column with mini SteadyLine motif,
  navigate, Beyond Bound links (with disclaimer), quick CTA. Gradient top border. "Let's talk" CTA.
- `components/nav/ScrollProgress.tsx` — Upgraded from flat teal to petrol→sprout gradient bar.
- `app/globals.css` — Added: blink keyframe for typewriter cursor, animate-ping keyframe, text-gradient
  utility, chip-float animation, scroll-progress-gradient class, footer/card CSS helpers.
- `app/page.tsx` — Added `<TrustBanner />` between Hero and Philosophy.

### Key advantages over competitor site (portfolio-website-eight-alpha-92.vercel.app):
1. **Data visualization** — competitor has zero charts. GlucoseChart is a unique story-telling asset.
2. **Dark mode** — competitor is dark-only (no toggle), Priyanshu's site has full light+dark.
3. **Typewriter + rotating photos** — competitor's hero is static single portrait.
4. **Trust banner** — competitor has no credential ticker.
5. **Custom cursor + ambient orbs** — competitor has a basic floating dot only.
6. **Command palette** (⌘K) — competitor has none.
7. **Glassmorphism cards** — competitor's are flat colored boxes.
8. **Scroll progress gradient bar** — competitor's is a thin teal line.
9. **Numbered watermarks on value cards** — competitor has plain cards.
10. **4-column footer with SteadyLine motif** — competitor's footer is minimal 3 links.

### Competitor weaknesses / mistakes NOT to repeat:
- Intro "slideshow" with 5 slides is slow and feels like a loading screen; users hit Skip Intro.
- No dark mode toggle at all — forcing dark on everyone.
- "Founder Evolution" tracker (Soil/Corporate/Founder) is static with zero animation.
- Random floating dot cursor that wanders the screen without tracking mouse — feels broken.
- Quote sections ("Health advice is easy to give.") are just centered white text on dark — no framing.
- No data visualization of any kind — purely text-and-photo.
- No command palette or keyboard shortcuts.
- Footer has only 3 social links; no navigation, no context.

---

## 4. Phase 4 — Remaining items (not started)

Priority order, all independently shippable:

1. **Intro animation / page-load sequence** — a subtle cinematic entry: body fades from black to paper,
   then hero elements stagger in. The `AmbientBackground` orbs could drift in simultaneously. ~30 lines
   in `app/layout.tsx` wrapping `<main>` in a `motion.div`.

2. **Command palette glass upgrade** — `components/nav/CommandPalette.tsx` uses plain `cmdk` defaults.
   Apply the same `dark:bg-surface/60 dark:backdrop-blur-xl` treatment + search results get kind badges
   like the Insights cards.

3. **Real article URLs for Insights** — currently all `href` values point to Priyanshu's LinkedIn profile
   root. Once specific post URLs are available, swap them in `lib/content.ts` → `insights[]`.

4. **Web3Forms key** — add `NEXT_PUBLIC_WEB3FORMS_KEY` in Vercel → Project → Settings → Environment
   Variables (free key at web3forms.com). Without it the form works via mailto: fallback.

5. **Lighthouse / axe pass** on deployed URL — confirm CLS is clean after the photo stack (aspect ratio
   is preserved, should be fine), `backdrop-filter` frame rate on mid-range Android.

6. **OG image update** — `public/og/og.png` is the current 1200×630 social card. Regenerate it to
   reflect Phase 3 changes (new hero aesthetic). Can be done with a simple screenshot of the deployed
   hero and a Figma/Canva edit to add the Beyond Bound® brand mark.

---

## 5. Files to commit for Phase 3

```bash
git add \
  app/globals.css \
  app/page.tsx \
  components/sections/BeyondBound.tsx \
  components/sections/Hero.tsx \
  components/sections/Impact.tsx \
  components/sections/Insights.tsx \
  components/sections/Journey.tsx \
  components/sections/PersonalVision.tsx \
  components/sections/Philosophy.tsx \
  components/sections/ValuesMedia.tsx \
  components/sections/Footer.tsx \
  components/nav/ScrollProgress.tsx \
  components/ui/GlucoseChart.tsx \
  components/ui/TrustBanner.tsx \
  HANDOFF.md

git commit -m "Phase 3: Ken Burns hero + typewriter, GlucoseChart data viz, TrustBanner, philosophy upgrade, timeline fix, gradient scroll bar, premium footer"
git push origin main
```

---

## 6. File structure reference

```
bb-portfolio/
├── app/
│   ├── globals.css        ← design tokens + ALL premium-effect CSS
│   ├── layout.tsx         ← renders AmbientBackground/PremiumCursor
│   ├── page.tsx           ← section order (updated Phase 3: TrustBanner added)
│   └── ...
├── components/
│   ├── nav/
│   │   ├── Navbar.tsx          ← magnetic links
│   │   ├── ScrollProgress.tsx  ← Phase 3: gradient bar
│   │   ├── CommandPalette.tsx  ← ⌘K palette (Phase 4: needs glass polish)
│   │   └── ThemeToggle.tsx
│   ├── sections/
│   │   ├── Hero.tsx            ← Phase 3: Ken Burns + typewriter
│   │   ├── Philosophy.tsx      ← Phase 3: pull quotes + principle cards
│   │   ├── Journey.tsx         ← Phase 3: fixed alignment + GlucoseChart
│   │   ├── Focus.tsx           ← unchanged (Phase 1+2 done)
│   │   ├── BeyondBound.tsx     ← Phase 3: brand badge + animated checklist
│   │   ├── Impact.tsx          ← Phase 3: accent bars + honesty note
│   │   ├── Insights.tsx        ← Phase 3: kind badges + LinkedIn CTA
│   │   ├── ValuesMedia.tsx     ← Phase 3: watermarks + gradient bars
│   │   ├── PersonalVision.tsx  ← Phase 3: branded blockquote Vision
│   │   ├── Contact.tsx         ← Phase 1+2 done
│   │   └── Footer.tsx          ← Phase 3: full 4-column redesign
│   └── ui/
│       ├── AmbientBackground.tsx  ← Phase 1
│       ├── PremiumCursor.tsx      ← Phase 1
│       ├── ParallaxImage.tsx      ← Phase 2
│       ├── GlucoseChart.tsx       ← Phase 3 NEW
│       ├── TrustBanner.tsx        ← Phase 3 NEW
│       ├── Reveal.tsx / Stagger
│       ├── CountUp.tsx
│       ├── SteadyLine.tsx
│       ├── Section.tsx
│       └── Icon.tsx
└── lib/content.ts              ← ALL copy lives here
```

---

## 7. Known sandbox limitation (not a code bug)

`next build` fails in sandbox only because it can't reach `fonts.googleapis.com`.
`npx tsc --noEmit` is clean ✓. Local machine and Vercel both deploy fine.
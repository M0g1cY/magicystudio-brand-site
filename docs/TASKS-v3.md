# TASKS v3 — Codex Execution Checklist

> Source of truth: [docs/SPEC-v3.md](SPEC-v3.md). This file is the linear todo for codex.
> Each module = one commit. Run `npm run lint && npm run build` before committing.
> Branch: `v3-cockpit` (already created). Do not touch master.

---

## Pre-flight

- [x] Branch `v3-cockpit` created (Claude Code)
- [x] [docs/SPEC-v3.md](SPEC-v3.md) written (Claude Code)
- [x] [lib/projects.ts](../lib/projects.ts) — `Project` type extended with `workflow?` + `metric?`, 3 featured projects filled in (Claude Code)
- [x] [app/globals.css](../app/globals.css) — `--acid` + `--electric` tokens added; `@theme inline` exposes `--color-acid` / `--color-electric` (Claude Code)
- [x] [components/site/mono-status.tsx](../components/site/mono-status.tsx) — `LIVE` / `LINK` / `INTERACTIVE` states + acid / electric dot mapping (Claude Code)
- [x] Stub files created with `// TODO(codex):` markers (Claude Code):
  - [components/site/token-assembler.tsx](../components/site/token-assembler.tsx)
  - [components/site/process-story.tsx](../components/site/process-story.tsx)
  - [components/site/cursor-cockpit.tsx](../components/site/cursor-cockpit.tsx)

---

## M1 — Tokens + Type extension (Claude Code, done)

Captured in the pre-flight step. Codex starts at M2.

---

## M2 — Hero TokenAssembler

**Goal**: replace v2 `RotatingHeadline` with token-by-token assembly.

- [ ] Implement [components/site/token-assembler.tsx](../components/site/token-assembler.tsx) per SPEC-v3 §1.1
  - Split `phrases[i]` on whitespace, preserve gap slots
  - On mount + `initialDelayMs` (default 500ms): tokens fly in with ±8px jitter, opacity 0→1, stagger `staggerMs` (default 30ms)
  - 1px `--electric` border per token during entry, fades out after settle
  - On `cycleMs` (default 4000): reverse-disassemble current phrase, then assemble next
  - `prefers-reduced-motion: reduce` → fall back to fade swap (current placeholder)
  - SSR safe: render `phrases[0]` plain on first paint (no `[Build]` brackets visible)
- [ ] Wire it into [components/site/hero-profile-section.tsx](../components/site/hero-profile-section.tsx):
  - Delete the inline `RotatingHeadline` function
  - Replace `<RotatingHeadline items={rotating} />` with `<TokenAssembler phrases={rotating} />`
  - Add `data-cursor="build"` on the contact CTA `<a>` and on any other Hero CTA
- [ ] `npm run lint && npm run build` (must pass)
- [ ] Append M2 paragraph to [HANDOFF.md](../HANDOFF.md)
- [ ] Commit: `feat(v3/m2): hero token assembler animation`

---

## M3 — Project Card hover steps + metric

**Goal**: hover on a featured card reveals workflow steps + result metric.

- [ ] Edit [components/site/project-card.tsx](../components/site/project-card.tsx):
  - Add `data-cursor="view"` on the outer `<Wrapper>`
  - When `project.workflow` exists AND `variant === "featured"`:
    - Render a hidden bottom-of-image overlay holding 5 mono uppercase rows (`01 ideation`, `02 copywriting`...)
    - Use framer-motion `staggerChildren` (60ms / row), each row from `y: 12, opacity: 0` to `y: 0, opacity: 1`
    - Trigger via `whileHover` on the parent `motion.article`
  - When `project.metric` exists: render a bottom-right floating label (PP Editorial italic 36px, color `primary-foreground` after inversion) shown only on hover
  - Keep v2 hover color inversion (bg-card → bg-primary). Do NOT remove existing tag inversion
- [ ] Verify grid variant cards (no workflow / no metric) keep behaving like v2 — workflow rows must not render
- [ ] `npm run lint && npm run build`
- [ ] Append M3 paragraph to [HANDOFF.md](../HANDOFF.md)
- [ ] Commit: `feat(v3/m3): project card workflow steps + metric on hover`

---

## M4 — ProcessStory sticky 5-beat

**Goal**: full implementation of [components/site/process-story.tsx](../components/site/process-story.tsx).

- [ ] Replace stub body per SPEC-v3 §1.3
  - Outer container `min-h-[500vh]`
  - Inner `sticky top-0 h-screen` wrapper
  - All 5 beats mounted, opacity / translate driven by framer-motion `useScroll` + `useTransform` on the outer ref
  - Top-left: `<SectionMarker n={2} total={5} label="Process" />` + active-beat mono `01 / 05 — IDEA` indicator + primary dot
  - Bottom: 1px progress bar tied to scrollYProgress
  - Beat content (inline, no data file):
    1. **IDEA** — headline `"It starts as a thought."` + `<svg>` napkin sketch
    2. **WORKFLOW** — mono ASCII or simple `<svg>` 5-node graph
    3. **PROTOTYPE** — `<pre>` mono code snippet (e.g. a Coze workflow JSON or Next.js handler)
    4. **AUTOMATION** — Lark sheet mock + a cron string `0 9 * * 1-5`
    5. **SHIPPED** — three thumbnails from `featuredProjects` with `<MonoStatus state="SHIPPED" />` overlay
  - mobile (< 768px) and `prefers-reduced-motion: reduce`: render 5 stacked cards, no sticky
- [ ] [app/page.tsx](../app/page.tsx): import `ProcessStory` and place it between `<FeaturedProjects />` and `<AboutTimeline />`
- [ ] Update section markers throughout to total `5`:
  - [components/site/featured-projects.tsx](../components/site/featured-projects.tsx) → `n=1 total=5 label="Work"`
  - process-story → `n=2 total=5 label="Process"` (already)
  - [components/site/about-timeline.tsx](../components/site/about-timeline.tsx) → `n=3 total=5 label="About"`
  - [components/site/services-section.tsx](../components/site/services-section.tsx) → `n=4 total=5 label="Services"`
  - [components/site/contact-section.tsx](../components/site/contact-section.tsx) → `n=5 total=5 label="Contact"`
- [ ] `npm run lint && npm run build`
- [ ] Append M4 paragraph to [HANDOFF.md](../HANDOFF.md)
- [ ] Commit: `feat(v3/m4): vertical sticky 5-beat process story`

---

## M5 — Cursor Cockpit + final polish

**Goal**: full implementation of [components/site/cursor-cockpit.tsx](../components/site/cursor-cockpit.tsx) + sweep `data-cursor` across the site.

- [ ] Implement cursor-cockpit per SPEC-v3 §1.4
  - Mount only when `(pointer: fine)` AND `prefers-reduced-motion: no-preference`. Otherwise return `null`.
  - Inject a global `cursor: none !important` style on activate; remove it on cleanup
  - One fixed div with rAF-driven `transform: translate3d(...)`
  - `data-cursor` state via `pointerover` event delegation on `document.body`
  - State → ring size + label + border color:
    - default: 14px ring, no label, `border-foreground`
    - `view`: 56px ring, label `VIEW`, `border-electric`
    - `build`: 56px ring, label `BUILD`, `border-primary`
    - `select`: 40px ring, label `SELECT`, `border-acid`
  - `pointer-events: none`, `z-index: 9999`
- [ ] Mount in [app/layout.tsx](../app/layout.tsx) at body root, sibling to `<LenisProvider />`
- [ ] Sweep `data-cursor` attributes across the codebase:
  - Project cards (already in M3): `data-cursor="view"`
  - Hero contact CTA + any "Contact" button in [components/site/contact-section.tsx](../components/site/contact-section.tsx) Email card / [components/site/navbar.tsx](../components/site/navbar.tsx) contact button: `data-cursor="build"`
  - [components/site/services-section.tsx](../components/site/services-section.tsx) — every service card: `data-cursor="select"`
  - Process Story — SHIPPED beat thumbnails: `data-cursor="view"`
- [ ] Verify on a touch device emulator: cursor cockpit is absent, system cursor remains
- [ ] `npm run lint && npm run build`
- [ ] Append M5 paragraph + "v1.2 → v3 final" closing to [HANDOFF.md](../HANDOFF.md)
- [ ] Commit: `feat(v3/m5): custom cursor + status signal cockpit`

---

## Final acceptance (user runs)

```bash
cd "Desktop/MagicYStudio Brand Site v2"
npm run lint
npm run build
npx next dev -p 3001
```

Walk through SPEC-v3 §7.2 visual checklist and §7.3 subjective signals. If 2+ subjective signals fail, isolate which module is at fault and re-open the corresponding M.

---

## Hard rules for codex

1. **No new npm dependencies.** lenis is enough; cursor uses raw RAF.
2. **No GSAP.** framer-motion 12 covers everything in v3.
3. **Three-color signal rule (SPEC §2) is sacred.** Acid green and electric blue must never appear as decorative fills, only as signal dots / borders / cursor color / single-glyph flashes.
4. **Don't touch v2-stable surfaces** outside the file list above (radius, font config, layout grid, shadcn primitives).
5. **Each module ships independently.** Build must pass after every commit. If it doesn't, fix before moving on — don't accumulate red builds.
6. **Hover effects must be keyboard-equivalent.** Use `:focus-visible` parity for project card hover and service card hover.
7. **Reduced motion is a first-class fallback**, not an afterthought. Test with the OS setting toggled.

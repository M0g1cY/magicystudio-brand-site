"use client";

/**
 * Vertical sticky 5-beat ProcessStory section. v3/M4 — docs/SPEC-v3.md §1.3.
 *
 * STATUS: stub. Codex implements the scroll-driven beat switching.
 *
 * Behavior contract:
 *  - Outer container height = 500vh. Inner pinned wrapper sticky top:0 h:100vh.
 *  - 5 beats: IDEA / WORKFLOW / PROTOTYPE / AUTOMATION / SHIPPED.
 *  - useScroll on the outer ref + useTransform to derive activeBeat (0..4).
 *  - Beat transitions: outgoing fade + translateY(-20px), incoming fade + translateY(0) from +20px.
 *  - Top-left mono "0X / 05 — <BEAT>" + primary dot; bottom 1px progress bar 0→100%.
 *  - SHIPPED beat reveals 3 featured project thumbnails with [● SHIPPED] dots.
 *  - Mobile (<768px) and prefers-reduced-motion: reduce → render 5 stacked cards, no sticky.
 *  - Section is the ONLY new section in v3; insert into app/page.tsx between
 *    <FeaturedProjects /> and <AboutTimeline />, taking section index 02 / 05.
 *
 * Beat content (write inline in the component, not in a data file):
 *  01 IDEA       — single-line headline + abstract sketch SVG / texture
 *  02 WORKFLOW   — Coze-style ASCII or simple SVG node graph
 *  03 PROTOTYPE  — short code snippet block + Next.js scaffold vibe
 *  04 AUTOMATION — Lark sheet + cron-line illustration
 *  05 SHIPPED    — 3 featured thumbnails (read from lib/projects featuredProjects)
 *
 * Implementation notes:
 *  - All 5 beats mount at once; only opacity / translate change.
 *  - Use `<SectionMarker n={2} total={5} label="Process" />` at the top.
 *  - Use existing tokens. acid green permitted only on the SHIPPED dot.
 *  - Do NOT introduce GSAP or ScrollTrigger; framer-motion useScroll is enough.
 */

import { SectionMarker } from "@/components/site/section-marker";

export function ProcessStory() {
  return (
    <section
      id="process"
      className="relative px-6 lg:px-12 xl:px-20 py-32 lg:py-40 border-t border-border"
    >
      <div className="max-w-[1280px] mx-auto space-y-12">
        <SectionMarker n={2} total={5} label="Process" />
        <h2 className="font-display tracking-[-0.02em] text-foreground text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.95]">
          From idea to <span className="italic font-[200]">shipped.</span>
        </h2>
        <p className="text-foreground/75 leading-[1.7] max-w-[52ch] text-lg">
          {/* TODO(codex): replace this placeholder copy + this single-block
             layout with the 5-beat sticky scroll story per SPEC-v3 §1.3. */}
          5 节拍 sticky 滚动叙事即将就位 — idea → workflow → prototype → automation → shipped。
        </p>
      </div>
    </section>
  );
}

"use client";

/**
 * Hero token-assembler animation. v3/M2 — see docs/SPEC-v3.md §1.1.
 *
 * STATUS: stub. Codex implements the body.
 *
 * Behavior contract (codex must satisfy):
 *  1. SSR / first paint: render `phrases[0]` as plain text. No layout shift.
 *  2. After mount + `initialDelayMs` (default 500): split phrase by whitespace
 *     into tokens; each token enters from random ±8px jitter + opacity 0,
 *     stagger `staggerMs` (default 30) per token, total < 250ms.
 *     During entry, each token wears a 1px `--electric` border that fades out.
 *  3. After 1500ms idle, advance to `phrases[(i+1) % len]`:
 *     reverse-disassemble the current phrase (tokens fly out + fade), then
 *     assemble the next. Cycle every `cycleMs` (default 4000).
 *  4. Whitespace must round-trip — preserve a non-breaking space slot per gap.
 *  5. `prefers-reduced-motion: reduce` → fall back to v2-style fade swap.
 *  6. `aria-live="polite"` on the live region. Tokens are aria-hidden.
 *
 * Implementation notes:
 *  - Use framer-motion `AnimatePresence` + `motion.span`.
 *  - Do NOT introduce GSAP or new deps.
 *  - Component must be self-contained; no layout-affecting props.
 *  - Wrap in a fixed min-height container to avoid CLS during disassembly.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TokenAssemblerProps {
  phrases: readonly string[];
  initialDelayMs?: number;
  cycleMs?: number;
  staggerMs?: number;
  className?: string;
}

export function TokenAssembler({
  phrases,
  cycleMs = 4000,
  className = "",
}: TokenAssemblerProps) {
  // TODO(codex): full token split + jitter + electric flash per §1.1.
  // Below is a placeholder fade swap so v2 visuals don't regress while
  // the real implementation lands. Delete this block on M2.
  const [i, setI] = useState(0);
  useEffect(() => {
    if (phrases.length <= 1) return;
    const id = setInterval(() => setI((n) => (n + 1) % phrases.length), cycleMs);
    return () => clearInterval(id);
  }, [phrases.length, cycleMs]);

  return (
    <span
      aria-live="polite"
      className={`relative block min-h-[1.1em] overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "55%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-45%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="block italic text-foreground"
        >
          {phrases[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

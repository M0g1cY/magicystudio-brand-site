"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface TokenAssemblerProps {
  phrases: readonly string[];
  initialDelayMs?: number;
  cycleMs?: number;
  staggerMs?: number;
  className?: string;
}

type PhrasePart =
  | { kind: "space"; value: string }
  | { kind: "token"; value: string; tokenIndex: number };

export function TokenAssembler({
  phrases,
  initialDelayMs = 1200,
  cycleMs = 4000,
  staggerMs = 30,
  className = "",
}: TokenAssemblerProps) {
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const phrase = phrases[i] ?? "";
  const parts = useMemo(() => splitPhrase(phrase), [phrase]);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), initialDelayMs);
    return () => window.clearTimeout(id);
  }, [initialDelayMs]);

  useEffect(() => {
    if (!ready || phrases.length <= 1) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % phrases.length),
      cycleMs,
    );
    return () => window.clearInterval(id);
  }, [ready, phrases.length, cycleMs]);

  if (!ready) {
    return (
      <span
        aria-live="polite"
        className={`relative block min-h-[1.1em] overflow-hidden italic text-foreground ${className}`}
      >
        {phrases[0] ?? ""}
      </span>
    );
  }

  if (reduceMotion) {
    return (
      <span
        aria-live="polite"
        className={`relative block min-h-[1.1em] overflow-hidden ${className}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="block italic text-foreground"
          >
            {phrase}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  return (
    <span
      aria-live="polite"
      className={`relative block min-h-[1.1em] overflow-hidden ${className}`}
    >
      <span className="sr-only">{phrase}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={i} aria-hidden="true" className="block italic">
          {parts.map((part, partIndex) =>
            part.kind === "space" ? (
              <span key={`${i}-space-${partIndex}`}>&nbsp;</span>
            ) : (
              <motion.span
                key={`${i}-${part.value}-${partIndex}`}
                initial={{
                  x: jitter(i, partIndex, "x"),
                  y: jitter(i, partIndex, "y"),
                  opacity: 0,
                  borderColor: "var(--electric)",
                }}
                animate={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  borderColor: "transparent",
                }}
                exit={{
                  x: jitter(i + 11, partIndex, "x"),
                  y: jitter(i + 11, partIndex, "y") - 10,
                  opacity: 0,
                  borderColor: "var(--electric)",
                }}
                transition={{
                  duration: 0.22,
                  delay: part.tokenIndex * (staggerMs / 1000),
                  ease: [0.22, 1, 0.36, 1],
                  borderColor: { duration: 0.46, delay: 0.12 },
                }}
                className="-mx-0.5 inline-block border border-transparent px-0.5 text-foreground will-change-transform"
              >
                {part.value}
              </motion.span>
            ),
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function splitPhrase(phrase: string): PhrasePart[] {
  let tokenIndex = 0;
  const parts: PhrasePart[] = [];
  for (const part of phrase.split(/(\s+)/)) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      parts.push({ kind: "space", value: part });
    } else {
      parts.push({ kind: "token", value: part, tokenIndex: tokenIndex++ });
    }
  }
  return parts;
}

function jitter(phraseIndex: number, tokenIndex: number, axis: "x" | "y") {
  const seed = phraseIndex * 37 + tokenIndex * 17 + (axis === "x" ? 3 : 11);
  const normalized = ((seed * 9301 + 49297) % 233280) / 233280;
  return normalized > 0.5 ? 8 : -8;
}

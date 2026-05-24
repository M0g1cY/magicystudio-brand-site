"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SEEN_KEY = "preloader-seen";
const isDev = process.env.NODE_ENV === "development";

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [intro, setIntro] = useState(true);
  const [compact, setCompact] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const isLocalPreview =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const forceReplay = window.location.search.includes("preloader=1");
    const seen = window.sessionStorage.getItem(SEEN_KEY);
    const shouldReplay = isDev || isLocalPreview || forceReplay || !seen;

    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      setIntro(shouldReplay);
    });

    const introTimer = window.setTimeout(
      () => {
        setIntro(false);
        window.sessionStorage.setItem(SEEN_KEY, "true");
      },
      shouldReplay ? 1550 : 0,
    );

    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      setCompact(progress > 0.18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(introTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion]);

  if (!mounted || reduceMotion) return null;

  const isCompact = compact && !expanded && !intro;
  const clipPath = intro
    ? "inset(0 0 0 0 round 0px)"
    : isCompact
      ? "inset(16px calc(50vw - 34px) calc(100vh - 84px) calc(50vw - 34px) round 0 0 10px 10px)"
      : "inset(16px calc(50vw - 170px) calc(100vh - 126px) calc(50vw - 170px) round 0 0 12px 12px)";

  return (
    <motion.div
      aria-label="MagicYStudio logo dock"
      className="fixed inset-0 z-[10000] bg-background text-foreground"
      initial={false}
      animate={{ clipPath }}
      transition={{
        duration: intro ? 0 : 1.1,
        delay: intro ? 0 : 0,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{
        pointerEvents: "none",
        contain: "paint",
      }}
    >
      <motion.button
        type="button"
        aria-label="MagicYStudio"
        onPointerEnter={() => setExpanded(true)}
        onPointerLeave={() => setExpanded(false)}
        className="fixed left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center bg-transparent font-mono uppercase tracking-[0.18em] outline-none"
        initial={{
          opacity: 0,
          scale: 0.84,
          width: 360,
          height: 120,
          top: "50%",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          width: isCompact ? 68 : 340,
          height: isCompact ? 68 : 110,
          top: intro ? "50%" : isCompact ? 50 : 71,
        }}
        transition={{
          opacity: { duration: 0.65, delay: intro ? 0.12 : 0 },
          scale: { duration: 0.75, delay: intro ? 0.12 : 0 },
          width: { duration: 0.82, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.82, ease: [0.16, 1, 0.3, 1] },
          top: {
            duration: intro ? 1.15 : 0.82,
            delay: intro ? 0.55 : 0,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        style={{ pointerEvents: intro ? "none" : "auto" }}
      >
        <motion.span
          className="grid place-items-center text-center text-[1.45rem] leading-none"
          animate={{
            opacity: isCompact ? 0 : 1,
            scale: isCompact ? 0.72 : 1,
          }}
          transition={{ duration: 0.52, ease: "easeOut" }}
        >
          <span className="text-foreground">MagicY</span>
          <span className="text-muted-foreground">studio</span>
        </motion.span>
        <motion.span
          className="absolute grid place-items-center text-[1.55rem] leading-none text-foreground"
          animate={{
            opacity: isCompact ? 1 : 0,
            scale: isCompact ? 1 : 0.76,
          }}
          transition={{ duration: 0.52, ease: "easeOut" }}
        >
          MY
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

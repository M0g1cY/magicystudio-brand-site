"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SEEN_KEY = "preloader-seen";
const isDev = process.env.NODE_ENV === "development";

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [intro, setIntro] = useState(true);
  const [compact, setCompact] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const closeTimer = useRef<number | null>(null);

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
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, [reduceMotion]);

  if (!mounted || reduceMotion) return null;

  const isCompact = compact && !expanded && !intro;
  const showFull = !isCompact;
  const clipPath = intro
    ? "inset(0 0 0 0 round 0px)"
    : isCompact
      ? "inset(16px calc(50vw - 34px) calc(100vh - 84px) calc(50vw - 34px) round 0 0 10px 10px)"
      : "inset(16px calc(50vw - 170px) calc(100vh - 126px) calc(50vw - 170px) round 0 0 12px 12px)";

  const keepExpanded = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setExpanded(true);
  };

  const releaseExpanded = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setExpanded(false);
      closeTimer.current = null;
    }, 260);
  };

  return (
    <motion.div
      aria-label="MagicYStudio logo dock"
      className="fixed inset-0 z-[10000] bg-background text-foreground"
      initial={false}
      animate={{ clipPath }}
      transition={{
        duration: intro ? 0 : expanded ? 0.95 : 1.15,
        delay: intro ? 0 : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        pointerEvents: "none",
        contain: "paint",
      }}
    >
      {!intro && (
        <div
          aria-hidden="true"
          onPointerEnter={keepExpanded}
          onPointerMove={keepExpanded}
          onPointerLeave={releaseExpanded}
          className="fixed left-1/2 top-3 z-[1] h-32 w-[380px] -translate-x-1/2"
          style={{ pointerEvents: "auto" }}
        />
      )}
      <motion.button
        type="button"
        aria-label="MagicYStudio"
        tabIndex={-1}
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
          width: showFull ? 340 : 68,
          height: showFull ? 110 : 68,
          top: intro ? "50%" : showFull ? 71 : 50,
        }}
        transition={{
          opacity: { duration: 0.65, delay: intro ? 0.12 : 0 },
          scale: { duration: 0.75, delay: intro ? 0.12 : 0 },
          width: { duration: expanded ? 0.95 : 0.82, ease: [0.16, 1, 0.3, 1] },
          height: { duration: expanded ? 0.95 : 0.82, ease: [0.16, 1, 0.3, 1] },
          top: {
            duration: intro ? 1.15 : expanded ? 0.95 : 0.82,
            delay: intro ? 0.55 : 0,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        style={{ pointerEvents: "none" }}
      >
        <motion.span
          className="grid place-items-center text-center text-[1.45rem] leading-none"
          animate={{
            opacity: showFull ? 1 : 0,
            scale: showFull ? 1 : 0.72,
          }}
          transition={{ duration: expanded ? 0.72 : 0.58, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-foreground">MagicY</span>
          <span className="text-muted-foreground">studio</span>
        </motion.span>
        <motion.span
          className="absolute grid place-items-center text-[1.55rem] leading-none text-foreground"
          animate={{
            opacity: showFull ? 0 : 1,
            scale: showFull ? 0.76 : 1,
          }}
          transition={{ duration: expanded ? 0.58 : 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          MY
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

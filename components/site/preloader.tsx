"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SEEN_KEY = "preloader-seen";
const isDev = process.env.NODE_ENV === "development";

type Target = {
  x: number;
  y: number;
};

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState<Target>({ x: 0, y: 0 });
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const forceReplay = window.location.search.includes("preloader=1");
    const isLocalPreview =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (
      !isDev &&
      !isLocalPreview &&
      !forceReplay &&
      window.sessionStorage.getItem(SEEN_KEY)
    ) {
      return;
    }
    if (forceReplay) window.sessionStorage.removeItem(SEEN_KEY);

    const anchor = document.getElementById("wordmark-anchor");
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const anchorCenterX = rect.left + rect.width / 2;
    const anchorCenterY = rect.top + rect.height / 2;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    anchor.style.opacity = "0";
    const frame = window.requestAnimationFrame(() => {
      setSettled(false);
      setTarget({
        x: anchorCenterX - viewportCenterX,
        y: anchorCenterY - viewportCenterY,
      });
      setVisible(true);
    });

    const safety = window.setTimeout(() => {
      anchor.style.opacity = "";
      window.sessionStorage.setItem(SEEN_KEY, "true");
      setVisible(false);
    }, 2000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(safety);
      anchor.style.opacity = "";
    };
  }, [reduceMotion]);

  if (!visible || reduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: settled ? 0 : 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (!settled) return;
        const anchor = document.getElementById("wordmark-anchor");
        if (anchor) anchor.style.opacity = "";
        window.sessionStorage.setItem(SEEN_KEY, "true");
        setVisible(false);
      }}
    >
      <motion.div
        className="font-mono uppercase tracking-[0.18em] text-muted-foreground"
        initial={{ x: 0, y: 0, fontSize: "clamp(2.75rem, 8vw, 7rem)" }}
        animate={{
          x: target.x,
          y: target.y,
          fontSize: "0.72rem",
        }}
        transition={{
          delay: 0.6,
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => setSettled(true)}
      >
        <span className="text-foreground">MagicY</span>studio
      </motion.div>
    </motion.div>
  );
}

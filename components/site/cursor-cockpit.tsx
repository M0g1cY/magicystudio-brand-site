"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "view" | "build" | "select";

const cursorMap: Record<
  CursorState,
  { size: number; label: string; color: string }
> = {
  default: { size: 14, label: "", color: "var(--foreground)" },
  view: { size: 56, label: "VIEW", color: "var(--electric)" },
  build: { size: 56, label: "BUILD", color: "var(--primary)" },
  select: { size: 40, label: "SELECT", color: "var(--acid)" },
};

export function CursorCockpit() {
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(fine.matches && motion.matches);

    update();
    fine.addEventListener("change", update);
    motion.addEventListener("change", update);

    return () => {
      fine.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const style = document.createElement("style");
    style.dataset.cursorCockpit = "true";
    style.textContent = "html, body, body * { cursor: none !important; }";
    document.head.appendChild(style);

    const onPointerMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      const cursorTarget = (event.target as Element | null)?.closest(
        "[data-cursor]",
      );
      const value = cursorTarget?.getAttribute("data-cursor");
      setState(isCursorState(value) ? value : "default");
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.35;
      current.current.y += (target.current.y - current.current.y) * 0.35;
      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = window.requestAnimationFrame(tick);
    };

    document.body.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });
    raf.current = window.requestAnimationFrame(tick);

    return () => {
      document.body.removeEventListener("pointermove", onPointerMove);
      if (raf.current !== null) window.cancelAnimationFrame(raf.current);
      style.remove();
      setState("default");
    };
  }, [enabled]);

  if (!enabled) return null;

  const config = cursorMap[state];

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border bg-background/10 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground backdrop-blur-[2px] transition-[width,height,border-color,color] duration-150 ease-out"
      style={{
        width: config.size,
        height: config.size,
        borderColor: config.color,
        color: config.color,
      }}
    >
      {config.label && <span>{config.label}</span>}
    </div>
  );
}

function isCursorState(value: string | null | undefined): value is CursorState {
  return value === "view" || value === "build" || value === "select";
}

"use client";

import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-[420px] aspect-[4/5] select-none flex items-center justify-center">
      {/* Ambient glow behind the body */}
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.62 0.17 55) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* The sci-fi body image */}
      <Image
        src="/sci-fi-body.png"
        alt="AI Medical Network"
        width={420}
        height={525}
        className="relative z-10 object-contain w-full h-full"
        priority
      />

      {/* Overlay: subtle orbiting ring */}
      <svg
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        viewBox="0 0 420 525"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            @keyframes orbitPulse {
              0%, 100% { opacity: 0.2; }
              50%      { opacity: 0.55; }
            }
            @keyframes orbitSpin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            .orbit-ring { animation: orbitPulse 4s ease-in-out infinite; }
            .orbit-dot  { animation: orbitPulse 3s ease-in-out var(--d) infinite; }
          `}
        </style>

        {/* Thin orbital ring */}
        <ellipse
          cx="210" cy="240" rx="180" ry="200"
          fill="none"
          stroke="oklch(0.62 0.17 55 / 0.12)"
          strokeWidth="0.5"
          strokeDasharray="3 8"
          className="orbit-ring"
        />

        {/* Small data dots on orbit */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 210 + 180 * Math.cos(rad);
          const cy = 240 + 200 * Math.sin(rad);
          return (
            <circle
              key={`od-${i}`}
              cx={cx} cy={cy} r="2"
              fill="oklch(0.62 0.17 55 / 0.25)"
              className="orbit-dot"
              style={{ "--d": `${i * 0.4}s` } as React.CSSProperties}
            />
          );
        })}
      </svg>
    </div>
  );
}

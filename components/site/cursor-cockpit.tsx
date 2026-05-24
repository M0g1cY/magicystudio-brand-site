"use client";

/**
 * Custom cursor cockpit. v3/M5 — docs/SPEC-v3.md §1.4.
 *
 * STATUS: stub. Codex implements pointermove tracking + state ring.
 *
 * Behavior contract:
 *  - Mounts only when (pointer: fine) AND prefers-reduced-motion: no-preference.
 *    On touch / coarse pointer / reduced-motion → return null, keep system cursor.
 *  - Hides system cursor via global style (`html, body, * { cursor: none !important }`)
 *    only while the cockpit is active; on unmount, the rule must be removed.
 *  - Renders a fixed-position 14px ring follower that translates with the
 *    pointer via requestAnimationFrame + transform: translate3d, ~50ms ease lag.
 *  - Reads `data-cursor` from the closest hovered element via pointermove +
 *    `document.elementFromPoint` or via pointerover bubbling. States:
 *      - undefined  → 14px ring, no label, foreground border
 *      - "view"     → 56px ring, label "VIEW",   --electric  border
 *      - "build"    → 56px ring, label "BUILD",  --primary   border
 *      - "select"   → 40px ring, label "SELECT", --acid      border
 *  - Label is mono uppercase tracking 0.18, 11-12px.
 *  - z-index 9999, pointer-events: none.
 *
 * Implementation notes:
 *  - One single fixed div + nested label span.
 *  - Use a single rAF loop that interpolates current → target on every frame.
 *  - Mount listeners once. Clean up on unmount.
 *  - Do NOT use any external dep; framer-motion is overkill here, prefer raw RAF.
 *  - Avoid layout thrash: only `transform` and `width/height` (or scale) on the ring.
 */

export function CursorCockpit() {
  // TODO(codex): full implementation per §1.4. Stub returns null so v2 visuals
  // remain intact (system cursor stays). Delete the early return on M5.
  return null;
}

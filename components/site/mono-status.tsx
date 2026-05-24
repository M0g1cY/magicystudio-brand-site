import type { ProjectStatus } from "@/lib/projects";

export type MonoStatusState =
  | ProjectStatus
  | "LIMITED"
  | "AVAILABLE"
  | "LIVE"
  | "LINK"
  | "INTERACTIVE";

interface MonoStatusProps {
  state: MonoStatusState;
  className?: string;
}

const LABEL: Record<MonoStatusState, string> = {
  SHIPPED: "shipped",
  BUILDING: "building",
  IN_PROGRESS: "in progress",
  LIMITED: "limited",
  AVAILABLE: "available",
  LIVE: "live",
  LINK: "link",
  INTERACTIVE: "interactive",
};

// v3 signal-color rules — docs/SPEC-v3.md §2 / §4.
const DOT_COLOR: Record<MonoStatusState, string> = {
  SHIPPED: "bg-primary",
  BUILDING: "bg-primary",
  AVAILABLE: "bg-acid",
  LIVE: "bg-acid",
  LINK: "bg-electric",
  INTERACTIVE: "bg-electric",
  IN_PROGRESS: "bg-muted-foreground",
  LIMITED: "bg-muted-foreground",
};

export function MonoStatus({ state, className = "" }: MonoStatusProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-foreground/85 ${className}`}
    >
      <span
        className={`relative inline-flex h-1.5 w-1.5 rounded-full ${DOT_COLOR[state]}`}
      />
      {LABEL[state]}
    </span>
  );
}

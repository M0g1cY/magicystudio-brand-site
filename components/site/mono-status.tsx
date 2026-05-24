import type { ProjectStatus } from "@/lib/projects";

interface MonoStatusProps {
  state: ProjectStatus | "LIMITED" | "AVAILABLE";
  className?: string;
}

const LABEL: Record<MonoStatusProps["state"], string> = {
  SHIPPED: "shipped",
  BUILDING: "building",
  IN_PROGRESS: "in progress",
  LIMITED: "limited",
  AVAILABLE: "available",
};

const DOT_COLOR: Record<MonoStatusProps["state"], string> = {
  SHIPPED: "bg-primary",
  BUILDING: "bg-primary",
  IN_PROGRESS: "bg-muted-foreground",
  LIMITED: "bg-muted-foreground",
  AVAILABLE: "bg-primary",
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

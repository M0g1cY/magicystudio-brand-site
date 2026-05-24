interface SectionMarkerProps {
  n: number;
  total?: number;
  label: string;
}

export function SectionMarker({ n, total = 6, label }: SectionMarkerProps) {
  const num = String(n).padStart(2, "0");
  const tot = String(total).padStart(2, "0");
  return (
    <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
      <span className="text-foreground">{num}</span>
      <span className="text-muted-foreground"> / {tot} — </span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

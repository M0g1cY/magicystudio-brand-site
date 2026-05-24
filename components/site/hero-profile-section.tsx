import { FiGithub, FiMail, FiArrowUpRight } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { siteConfig } from "@/lib/site-data";
import { TokenAssembler } from "@/components/site/token-assembler";

export function HeroProfileSection() {
  const { fixed, rotating } = siteConfig.headline;
  const statusText = siteConfig.statusText || "available for new work";
  const location = siteConfig.location || "remote";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end px-6 lg:px-12 xl:px-20 pt-40 pb-24 lg:pb-32"
    >
      {/* Archive-style section index */}
      <div className="absolute top-8 left-6 lg:left-12 xl:left-20 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
        00 / 06 — Index
      </div>

      {/* Top-right wordmark anchor (small, fixed) */}
      <div className="absolute top-8 right-6 lg:right-12 xl:right-20 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-foreground">{fixed}</span>studio
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        {/* Left: editorial display + status row + subhead */}
        <div className="lg:col-span-8 space-y-10">
          <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {statusText}
          </div>

          <h1 className="font-display font-[200] tracking-[-0.025em] leading-[0.94] text-[clamp(3.25rem,11vw,9.5rem)]">
            <TokenAssembler phrases={rotating} />
          </h1>

          <p className="max-w-[640px] text-lg leading-[1.7] text-foreground/85">
            {siteConfig.subheadline}
          </p>
        </div>

        {/* Right: Mono status card */}
        <aside className="lg:col-span-4 lg:justify-self-end w-full max-w-[300px]">
          <div className="border border-border bg-card/50 backdrop-blur-sm px-5 py-6 space-y-5">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage src="/20.png" alt={siteConfig.fullName} />
                <AvatarFallback className="rounded-md bg-muted text-foreground/70">
                  M
                </AvatarFallback>
              </Avatar>
              <div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] space-y-0.5">
                <div className="text-foreground">{siteConfig.fullName}</div>
                <div className="text-muted-foreground">{siteConfig.tagline}</div>
              </div>
            </div>

            <dl className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-foreground/80 space-y-1.5">
              <div className="flex gap-3">
                <dt className="w-12 text-muted-foreground">role</dt>
                <dd>solo builder</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-12 text-muted-foreground">stack</dt>
                <dd>next · ts · coze · ai</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-12 text-muted-foreground">based</dt>
                <dd>{location}</dd>
              </div>
            </dl>

            <div className="flex items-center gap-2 pt-3 border-t border-border/60">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                title="GitHub"
                aria-label="GitHub"
              >
                <FiGithub size={15} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                title="Email"
                aria-label="Email"
              >
                <FiMail size={15} />
              </a>
              <a
                href="#contact"
                data-cursor="build"
                className="ml-auto inline-flex items-center gap-1.5 h-9 px-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                contact <FiArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

import { FiArrowUpRight, FiGithub, FiMail } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/lib/site-data";
import { TokenAssembler } from "@/components/site/token-assembler";

export function HeroProfileSection() {
  const { rotating } = siteConfig.headline;
  const statusText = siteConfig.statusText || "available for new work";
  const location = siteConfig.location || "remote";
  const stack = ["claude", "codex", "coze", "next"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end px-6 lg:px-12 xl:px-20 pt-40 pb-24 lg:pb-32"
    >
      <div className="absolute top-24 left-6 lg:left-12 xl:left-20 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
        00 / 06 - Index
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
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

        <aside className="lg:col-span-4 lg:justify-self-end w-full max-w-[300px]">
          <div
            data-cursor="select"
            className="operator-card group border border-border bg-card/50 backdrop-blur-sm px-5 py-6 space-y-5 transition-[transform,border-color,background-color] duration-500 ease-out hover:scale-[1.025] hover:border-primary/60 hover:bg-card/70 focus-within:scale-[1.025] focus-within:border-primary/60 focus-within:bg-card/70"
          >
            <div className="flex items-center gap-3">
              <div className="operator-avatar relative h-12 w-12 overflow-hidden rounded-md border border-border/70 transition-colors duration-500 group-hover:border-primary/60">
                <Avatar className="h-full w-full rounded-md">
                  <AvatarImage src="/20.png" alt={siteConfig.fullName} />
                  <AvatarFallback className="rounded-md bg-muted text-foreground/70">
                    M
                  </AvatarFallback>
                </Avatar>
                <span className="operator-scan pointer-events-none absolute inset-0" />
              </div>
              <div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] space-y-0.5">
                <div className="text-foreground">{siteConfig.fullName}</div>
                <div className="text-muted-foreground">{siteConfig.tagline}</div>
              </div>
            </div>

            <dl className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-foreground/80 space-y-1.5">
              <div className="operator-row flex gap-3 transition-transform duration-500">
                <dt className="flex w-12 items-center gap-1.5 text-muted-foreground transition-colors duration-500">
                  <span className="operator-row-dot h-1 w-1 bg-primary opacity-0 transition-opacity duration-500" />
                  role
                </dt>
                <dd className="transition-colors duration-500">solo builder</dd>
              </div>
              <div className="operator-row flex gap-3 transition-transform duration-500 [animation-delay:1.8s]">
                <dt className="flex w-12 items-center gap-1.5 text-muted-foreground transition-colors duration-500">
                  <span className="operator-row-dot h-1 w-1 bg-primary opacity-0 transition-opacity duration-500" />
                  stack
                </dt>
                <dd className="flex flex-wrap gap-x-1.5">
                  {stack.map((item, i) => (
                    <span
                      key={item}
                      className="operator-stack-token transition-colors duration-300"
                      style={{ animationDelay: `${i * 0.28}s` }}
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="operator-row flex gap-3 transition-transform duration-500 [animation-delay:3.6s]">
                <dt className="flex w-12 items-center gap-1.5 text-muted-foreground transition-colors duration-500">
                  <span className="operator-row-dot h-1 w-1 bg-primary opacity-0 transition-opacity duration-500" />
                  based
                </dt>
                <dd className="transition-colors duration-500">{location}</dd>
              </div>
            </dl>

            <div className="flex items-center gap-2 pt-3 border-t border-border/60">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="operator-icon-button relative inline-flex h-9 w-9 items-center justify-center overflow-hidden border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none"
                title="GitHub"
                aria-label="GitHub"
              >
                <FiGithub size={15} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="operator-icon-button relative inline-flex h-9 w-9 items-center justify-center overflow-hidden border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none"
                title="Email"
                aria-label="Email"
              >
                <FiMail size={15} />
              </a>
              <a
                href="#contact"
                data-cursor="build"
                className="ml-auto inline-flex items-center gap-1.5 h-9 px-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:border-primary focus-visible:outline-none transition-colors"
              >
                contact{" "}
                <FiArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

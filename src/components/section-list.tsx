import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export type Item = {
  title: string;
  href?: string;
  role: string;
  period?: string;
  description: string;
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

type SectionListProps = {
  title: string;
  items: Item[];
  viewAllHref?: string;
  viewAllText?: string;
  showTitle?: boolean;
  showSectionBorder?: boolean;
  previewItems?: boolean;
};

export function SectionList({
  title,
  items,
  viewAllHref,
  viewAllText,
  showTitle = true,
  showSectionBorder = true,
  previewItems = false,
}: SectionListProps) {
  return (
    <section className={`mb-12 ${showSectionBorder ? "border-t border-border pt-10" : ""}`}>
      {showTitle && (
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center text-foreground tracking-wider">
            <span className="text-brand accent-glow mr-2">*</span>
            <span className="font-geist-pixel">{title}</span>
          </h2>
          {viewAllHref && (
            <Link
              to={viewAllHref}
              className="inline-flex items-center gap-1 text-sm text-brand hover:text-brand/85 transition-colors group"
            >
              {viewAllText}{" "}
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>
      )}
      <div className="space-y-2">
          {items.map((item) => {
          const external = item.href ? isExternalHref(item.href) : false;
          const hostname = item.href ? new URL(item.href).hostname : null;
          const canPreview =
            Boolean(item.href) &&
            previewItems &&
            hostname !== "github.com" &&
            !hostname?.endsWith(".github.com");
          const content = (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-brand transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.role}
                    {item.period && (
                      <span className="text-muted-foreground/80"> · {item.period}</span>
                    )}
                  </p>
                  {item.description ? (
                    <p className="mt-2 text-pretty leading-relaxed text-foreground">
                      {item.description}
                    </p>
                  ) : null}
                </div>
                {item.href && (
                  <ArrowUpRight className="size-4 mt-1.5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                )}
              </div>
            );
            const card = item.href ? (
              <a
                key={item.title}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group -mx-4 block rounded-lg p-4 transition-colors hover:bg-muted/70 dark:hover:bg-neutral-900/50"
              >
                {content}
              </a>
            ) : (
              <div key={item.title} className="-mx-4 block rounded-lg p-4">
                {content}
              </div>
            );
            if (!canPreview || !item.href) return card;
            return (
              <HoverCard key={item.title} openDelay={220} closeDelay={100}>
                <HoverCardTrigger asChild>{card}</HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  align="end"
                  className="w-[min(28rem,calc(100vw-2rem))] overflow-hidden rounded-xl border-border/70 bg-popover p-0 shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <iframe
                      src={item.href}
                      title={`${item.title} live preview`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-white"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
      </div>
      {viewAllHref && !showTitle && (
        <Link
          to={viewAllHref}
          className="inline-flex items-center gap-1 mt-6 text-brand hover:text-brand/85 transition-colors group"
        >
          {viewAllText}{" "}
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </section>
  );
}

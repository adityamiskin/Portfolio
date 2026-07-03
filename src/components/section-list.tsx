import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export type Item = {
  title: string;
  href: string;
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
};

export function SectionList({
  title,
  items,
  viewAllHref,
  viewAllText,
  showTitle = true,
  showSectionBorder = true,
}: SectionListProps) {
  const renderItem = (item: Item) => {
    const content = (
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-brand transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {item.role}
            {item.period && (
              <span className="text-muted-foreground/80">
                {" "}
                · {item.period}
              </span>
            )}
          </p>
          {item.description ? (
            <p className="mt-2 text-pretty leading-relaxed text-foreground">
              {item.description}
            </p>
          ) : null}
        </div>
        <ArrowUpRight className="size-4 mt-1.5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
      </div>
    );

    if (isExternalHref(item.href)) {
      return (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-lg p-4 -mx-4 transition-colors hover:bg-muted/70 dark:hover:bg-neutral-900/50"
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={item.href}
        to={item.href}
        className="group block rounded-lg p-4 -mx-4 transition-colors hover:bg-muted/70 dark:hover:bg-neutral-900/50"
      >
        {content}
      </Link>
    );
  };

  return (
    <section
      className={`mb-12 ${showSectionBorder ? "border-t border-border pt-10" : ""}`}
    >
      {showTitle && (
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-medium flex items-center text-foreground tracking-wider">
            <span className="text-brand accent-glow mr-2">*</span>
            <span className="font-geist-pixel font-medium">{title}</span>
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
        {items.map(renderItem)}
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

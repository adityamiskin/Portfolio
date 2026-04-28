import { Markdown } from "@/components/markdown";

type UsesEntry = { title: string; specs?: string };

interface UsesSectionProps {
  uses: Record<string, UsesEntry>;
}

/** Flat two-column rows: `category | item · specs` — mirrors the blog date|title pattern. */
export function UsesSection({ uses }: UsesSectionProps) {
  const rows = Object.entries(uses).map(([key, value]) => ({
    category: key.toLowerCase(),
    title: value.title,
    specs: value.specs,
  }));

  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
          <span className="text-sm text-muted-foreground sm:w-28 shrink-0 tabular-nums">
            {row.category}
          </span>
          <span className="text-foreground">
            {row.title}
            {row.specs ? (
              <>
                <span className="text-muted-foreground/60 mx-1">·</span>
                <Markdown
                  className="inline text-muted-foreground text-sm [&>p]:inline"
                >
                  {row.specs}
                </Markdown>
              </>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}

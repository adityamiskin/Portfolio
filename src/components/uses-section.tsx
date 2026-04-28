import { Markdown } from "@/components/markdown";

type UsesEntry = { title: string; specs?: string };

interface UsesSectionProps {
  uses: Record<string, UsesEntry>;
}

/** Two-column rows with specs stacked below the title for breathing room. */
export function UsesSection({ uses }: UsesSectionProps) {
  const rows = Object.entries(uses).map(([key, value]) => ({
    category: key.toLowerCase(),
    title: value.title,
    specs: value.specs,
  }));

  return (
    <div className="space-y-4">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4">
          <span className="text-sm text-muted-foreground sm:w-28 shrink-0 pt-px">
            {row.category}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground">{row.title}</span>
            {row.specs ? (
              <Markdown className="text-muted-foreground text-sm [&>p]:m-0">
                {row.specs}
              </Markdown>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

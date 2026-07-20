import { Markdown } from "@/components/markdown";

type UsesEntry = { title: string; specs?: string };

interface UsesSectionProps {
  uses: Record<string, UsesEntry>;
}

export function UsesSection({ uses }: UsesSectionProps) {
  return (
    <div className="space-y-4">
      {Object.entries(uses).map(([category, details]) => (
        <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4">
          <span className="text-sm text-muted-foreground sm:w-28 shrink-0 pt-px">
            {category.toLowerCase()}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground">{details.title}</span>
            {details.specs ? (
              <Markdown className="text-muted-foreground text-sm [&>p]:m-0">
                {details.specs}
              </Markdown>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

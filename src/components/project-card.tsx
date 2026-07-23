import { ArrowUpRight } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export type ProjectCardProps = {
  title: string;
  description: string;
  role: string;
  period?: string;
  achievements: string[];
  technologies: string[];
  href?: string;
  preview?: boolean;
};

export function ProjectCard({
  title,
  description,
  role,
  period,
  technologies,
  href,
  preview = true,
}: ProjectCardProps) {
  const hostname = href ? new URL(href).hostname : null;
  const canPreview =
    Boolean(href) &&
    preview &&
    hostname !== "github.com" &&
    !hostname?.endsWith(".github.com");
  const cardContent = (
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold lowercase text-foreground transition-colors group-hover:text-primary">
            {title.toLowerCase()}
          </h3>
          <p className="mt-1 text-sm lowercase text-muted-foreground">
            {role.toLowerCase()}
            {period && <span className="text-muted-foreground/80"> · {period.toLowerCase()}</span>}
          </p>
          <p className="mt-2 text-pretty lowercase text-foreground">{description.toLowerCase()}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary/80 px-2 py-0.5 text-xs lowercase text-muted-foreground dark:bg-neutral-800/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        {href && (
          <ArrowUpRight className="mt-1.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        )}
      </div>
  );
  const card = href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group -mx-4 block rounded-lg p-4 transition-colors hover:bg-muted/70 dark:hover:bg-neutral-900/50"
    >
      {cardContent}
    </a>
  ) : (
    <div className="-mx-4 block rounded-lg p-4">{cardContent}</div>
  );

  if (!canPreview) return card;

  return (
    <HoverCard openDelay={220} closeDelay={100}>
      <HoverCardTrigger asChild>{card}</HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="end"
        className="w-[min(28rem,calc(100vw-2rem))] overflow-hidden rounded-xl border-border/70 bg-popover p-0 shadow-xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <iframe
            src={href}
            title={`${title} live preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-white"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

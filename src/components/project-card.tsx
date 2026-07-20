import { ArrowUpRight } from "lucide-react";

export type ProjectCardProps = {
  title: string;
  description: string;
  role: string;
  period?: string;
  achievements: string[];
  technologies: string[];
  href: string;
};

export function ProjectCard({
  title,
  description,
  role,
  period,
  technologies,
  href,
}: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group -mx-4 block rounded-lg p-4 transition-colors hover:bg-muted/70 dark:hover:bg-neutral-900/50"
    >
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
        <ArrowUpRight className="mt-1.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
    </a>
  );
}

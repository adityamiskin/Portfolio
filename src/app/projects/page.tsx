import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import projectsData from "@/data/projects.json";

const ProjectCardItem = ({ project }) => {
  const projectLink = project.link || project.github;
  const placeholderImage =
    project.image || `https://picsum.photos/seed/${project.title}/1200/800`;

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const content = (
    <div className="flex flex-col h-full">
      <div className="relative w-full aspect-video overflow-hidden rounded-md mb-4">
        <Image
          src={placeholderImage}
          alt={`${project.title} preview`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex items-center justify-between gap-3 pe-3 mb-3">
        <h2 className="text-foreground min-w-0 flex-1 truncate text-xl font-semibold">
          {project.title}
        </h2>
        {project.date && (
          <p className="text-muted-foreground flex-shrink-0 text-xs whitespace-nowrap">
            {formatDate(project.date)}
          </p>
        )}
      </div>
      <p className="text-muted-foreground line-clamp-3 text-sm mb-3">
        {project.description}
      </p>
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 overflow-hidden pt-2 text-xs items-center mt-auto">
          <Tag className="size-4 text-muted-foreground" />
          {project.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <article className="h-full">
      {projectLink ? (
        <a
          href={projectLink}
          target="_blank"
          rel="noreferrer"
          className="group border-border bg-accent/40 hover:border-accent-foreground/30 block h-full rounded-xl border p-5 shadow-lg transition-colors duration-200"
        >
          {content}
        </a>
      ) : (
        <div className="border-border bg-accent/40 hover:border-accent-foreground/30 rounded-xl border p-5 shadow-lg h-full">
          {content}
        </div>
      )}
    </article>
  );
};

const Projects = () => {
  const projects = projectsData;

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCardItem key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

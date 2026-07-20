import { createFileRoute } from "@tanstack/react-router";
import { TextScramble } from "@/components/text-scramble";
import { ProjectCard } from "@/components/project-card";
import projectsData from "@/data/projects.json";
import { pageDescriptions } from "@/lib/seo";
import { pageHead } from "@/lib/meta";

export const Route = createFileRoute("/projects")({
  head: () =>
    pageHead({
      title: "Projects",
      description: pageDescriptions.projects,
      path: "/projects",
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="font-body">
      <h1 className="mb-8 text-4xl font-bold lowercase tracking-wider text-foreground">
        <span className="accent-glow mr-2 text-primary">*</span>
        <TextScramble as="span" className="font-geist-pixel">
          projects
        </TextScramble>
      </h1>
      <p className="mb-6 leading-relaxed lowercase text-foreground/60">
        here are some of the projects i&apos;ve worked on. i love building tools that make
        developers&apos; lives easier and exploring new technologies along the way.
      </p>
      <div className="space-y-6">
        {projectsData.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  );
}

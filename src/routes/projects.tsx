import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "@/components/project-card";
import { TextScramble } from "@/components/text-scramble";
import projectsData from "@/data/projects.json";
import { buildSeoHead, pageDescriptions, siteName } from "@/lib/seo";

type Project = {
  title: string;
  description: string;
  role: string;
  period?: string;
  href: string;
  technologies: string[];
  achievements: string[];
};

export const Route = createFileRoute("/projects")({
  head: () =>
    buildSeoHead({
      title: `Projects | ${siteName}`,
      description: pageDescriptions.projects,
      path: "/projects",
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = projectsData as Project[];

  return (
    <main className="font-body">
      <h1 className="mb-8 text-4xl font-medium lowercase text-foreground tracking-wider">
        <span className="accent-glow text-primary mr-2">*</span>
        <TextScramble as="span" className="font-geist-pixel font-medium">
          projects
        </TextScramble>
      </h1>
      <p className="mb-6 leading-relaxed lowercase text-foreground/60">
        here are some of the projects i&apos;ve worked on. i love building tools
        that make developers&apos; lives easier and exploring new technologies
        along the way.
      </p>
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  );
}

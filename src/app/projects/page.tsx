import type { Metadata } from "next";
import { TextScramble } from "@/components/text-scramble";
import { ProjectCard } from "@/components/project-card";
import projectsData from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
};

type Project = {
  title: string;
  description: string;
  role: string;
  period?: string;
  href: string;
  technologies: string[];
  achievements: string[];
};

export default function ProjectsPage() {
  const projects = projectsData as Project[];

  return (
    <main className="font-body">
      <h1 className="mb-8 text-4xl font-bold lowercase text-foreground">
        <span className="accent-glow text-primary mr-2">*</span>
        <TextScramble as="span">projects</TextScramble>
      </h1>
      <p className="mb-6 leading-relaxed lowercase text-foreground">
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

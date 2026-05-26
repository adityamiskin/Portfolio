import type { Metadata } from "next";
import { TextScramble } from "@/components/text-scramble";
import { ProjectCard } from "@/components/project-card";
import projectsData from "@/data/projects.json";
import { pageDescriptions } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description: pageDescriptions.projects,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Aditya Miskin",
    description: pageDescriptions.projects,
    url: "/projects",
  },
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
      <h1 className="mb-8 text-4xl font-bold lowercase text-foreground tracking-wider">
        <span className="accent-glow text-primary mr-2">*</span>
        <TextScramble as="span" className="font-geist-pixel">projects</TextScramble>
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

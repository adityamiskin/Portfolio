import portfolioData from "@/data/portfolio.json";
import projectsData from "@/data/projects.json";
import newProfilePhoto from "@/assets/images/new_profile.webp";
import { BlogSection } from "@/components/blog-section";
import { Footer } from "@/components/footer";
import { Markdown } from "@/components/markdown";
import { SectionList } from "@/components/section-list";
import { TextScramble } from "@/components/text-scramble";
import { UsesSection } from "@/components/uses-section";
import { buildSeoHead, pageDescriptions, siteName } from "@/lib/seo";
import { mapWorkToSectionItems, type WorkEntry } from "@/lib/work-section";
import { createFileRoute } from "@tanstack/react-router";

type ProjectEntry = {
  title: string;
  description: string;
  role: string;
  period?: string;
  href: string;
  technologies: string[];
  achievements: string[];
};

export const Route = createFileRoute("/")({
  head: () =>
    buildSeoHead({
      title: `${siteName} | Cofounder and Software Engineer`,
      description: pageDescriptions.home,
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  const projects = (projectsData as ProjectEntry[]).slice(0, 2);
  const workPreview = (portfolioData.work as WorkEntry[]).slice(0, 2);

  return (
    <main>
      <div className="space-y-12">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1 className="text-4xl font-medium text-foreground font-geist-pixel">
              <TextScramble as="span">{portfolioData.name}</TextScramble>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {portfolioData.tagline}
            </p>
            <Markdown className="leading-relaxed text-foreground">
              {portfolioData.about}
            </Markdown>
            {portfolioData.resumeUrl ? (
              <p className="leading-relaxed text-foreground">
                <a
                  href={portfolioData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4 decoration-muted-foreground/60 hover:text-brand hover:decoration-brand transition-colors"
                >
                  résumé (in case the portfolio wasn&apos;t enough)
                </a>
              </p>
            ) : null}
          </div>
          <div className="relative w-full shrink-0 overflow-hidden rounded-md border border-border shadow-xs aspect-4/3 lg:aspect-auto lg:h-[min(380px,52vh)] lg:w-[min(380px,42%)] lg:max-w-md">
            <img
              src={newProfilePhoto}
              alt="Profile photo"
              className="h-full w-full object-cover object-[50%_25%]"
            />
          </div>
        </div>

        <BlogSection />

        <SectionList
          title="work"
          items={mapWorkToSectionItems(workPreview)}
          viewAllHref="/work"
          viewAllText="all work"
        />

        <SectionList
          title="projects"
          items={projects.map((p) => ({
            title: p.title,
            href: p.href,
            role: p.role,
            period: p.period,
            description: p.description,
          }))}
          viewAllHref="/projects"
          viewAllText="all projects"
        />

        <section
          id="interests-setup"
          className="mb-12 scroll-mt-24 border-t border-border pt-10"
        >
          <h2 className="mb-6 flex items-center text-2xl font-medium text-foreground tracking-wider">
            <span className="text-brand accent-glow mr-2">*</span>
            <span className="font-geist-pixel font-medium">misc</span>
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:gap-4">
              <span className="text-sm text-muted-foreground sm:w-28 shrink-0 pt-px">
                interests
              </span>
              <span className="text-foreground">
                {portfolioData.interests.map((interest, index) => (
                  <span key={index}>
                    {interest === "Photography" ? (
                      <a
                        href="/photos"
                        className="underline underline-offset-4 decoration-muted-foreground/50 hover:text-brand hover:decoration-brand transition-colors"
                      >
                        {interest}
                      </a>
                    ) : (
                      interest
                    )}
                    {index < portfolioData.interests.length - 1 && "; "}
                  </span>
                ))}
              </span>
            </div>
            <UsesSection uses={portfolioData.uses} />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

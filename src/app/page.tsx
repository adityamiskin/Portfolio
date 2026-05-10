import portfolioData from "@/data/portfolio.json";
import projectsData from "@/data/projects.json";
import { TextScramble } from "@/components/text-scramble";
import { Markdown } from "@/components/markdown";
import { BlogSection } from "@/components/blog-section";
import { SectionList } from "@/components/section-list";
import { UsesSection } from "@/components/uses-section";
import { Footer } from "@/components/footer";
import Image from "next/image";
import newProfilePhoto from "@/assets/images/new_profile.webp";
import { mapWorkToSectionItems, type WorkEntry } from "@/lib/work-section";

type ProjectEntry = {
  title: string;
  description: string;
  role: string;
  period?: string;
  href: string;
  technologies: string[];
  achievements: string[];
};

export default function Home() {
  const projects = (projectsData as ProjectEntry[]).slice(0, 2);
  const workPreview = (portfolioData.work as WorkEntry[]).slice(0, 2);

  return (
    <main>
      <div className="space-y-12">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <h1 className="text-4xl font-medium text-foreground font-geist-pixel tracking-wider">
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
                  For when someone asks for a file…
                </a>
              </p>
            ) : null}
          </div>
          <div className="relative w-full shrink-0 overflow-hidden rounded-md border border-border shadow-xs aspect-4/3 lg:aspect-auto lg:h-[min(380px,52vh)] lg:w-[min(380px,42%)] lg:max-w-md">
            <Image
              src={newProfilePhoto}
              alt="Profile photo"
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              className="object-cover object-[50%_25%]"
              priority
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
          <h2 className="mb-6 flex items-center text-2xl font-semibold text-foreground tracking-wider">
            <span className="text-brand accent-glow mr-2">*</span>
            <span className="font-geist-pixel">misc</span>
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4">
              <span className="text-sm text-muted-foreground sm:w-28 shrink-0 pt-px">
                interests
              </span>
              <span className="text-foreground">
                {portfolioData.interests.map((interest, index) => (
                  <span key={index}>
                    {interest === "Photography" ? (
                      <a
                        href="/photo"
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

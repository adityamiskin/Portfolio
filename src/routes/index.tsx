import { Link, createFileRoute } from "@tanstack/react-router";
import portfolioData from "@/data/portfolio.json";
import projectsData from "@/data/projects.json";
import social from "@/data/social.json";
import { TextScramble } from "@/components/text-scramble";
import { Markdown } from "@/components/markdown";
import { BlogSection } from "@/components/blog-section";
import { SectionList } from "@/components/section-list";
import { UsesSection } from "@/components/uses-section";
import { Footer } from "@/components/footer";
import {
  EmailCard,
  GitHubCard,
  ResumeCard,
  XCard,
  socialInlineLinkClass,
} from "@/components/social-cards";
import { pageHead } from "@/lib/meta";
import { getResumePreviewUrl } from "@/lib/resume";

export const Route = createFileRoute("/")({
  head: () => {
    const base = pageHead();
    const resumePreview = getResumePreviewUrl();
    return {
      ...base,
      links: [
        ...base.links,
        ...(resumePreview
          ? [
              {
                rel: "preload" as const,
                as: "image" as const,
                href: resumePreview,
                // low so it doesn't fight the profile photo LCP
                fetchPriority: "low" as const,
              },
            ]
          : []),
      ],
    };
  },
  component: Home,
});

function Home() {
  const projects = projectsData.slice(0, 2);
  const workPreview = portfolioData.work.slice(0, 2);

  return (
    <main>
      <div className="space-y-12">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1 className="font-geist-pixel text-4xl font-medium tracking-wider text-foreground">
              <TextScramble as="span">{portfolioData.name}</TextScramble>
            </h1>
            <p className="leading-relaxed text-muted-foreground">{portfolioData.tagline}</p>
            <Markdown className="leading-relaxed text-foreground">{portfolioData.about}</Markdown>
            <p className="leading-relaxed text-muted-foreground">
              Find me at{" "}
              <XCard trigger={`@${social.x.handle}`} triggerClassName={socialInlineLinkClass} />,{" "}
              <GitHubCard trigger="GitHub" triggerClassName={socialInlineLinkClass} /> and{" "}
              <EmailCard
                trigger={social.email.address}
                triggerClassName={socialInlineLinkClass}
              />
            </p>
            {portfolioData.resumeUrl ? (
              <p className="leading-relaxed text-foreground">
                <ResumeCard
                  trigger="résumé (in case the portfolio wasn't enough)"
                  triggerClassName={socialInlineLinkClass}
                />
              </p>
            ) : null}
          </div>
          <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-md border border-border shadow-xs lg:aspect-auto lg:h-[min(380px,52vh)] lg:w-[min(380px,42%)] lg:max-w-md">
            <img
              src="/profile.webp"
              alt="Aditya Miskin"
              width={1280}
              height={1280}
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover object-[50%_25%]"
            />
          </div>
        </div>

        <BlogSection />

        <SectionList
          title="work"
          items={workPreview.map(({ company, url, role, period, description }) => ({
            title: company,
            href: url,
            role,
            period,
            description,
          }))}
          viewAllHref="/work"
          viewAllText="all work"
        />

        <SectionList
          title="projects"
          items={projects.map((project) => ({
            title: project.title,
            href: project.href,
            role: project.role,
            period: project.period,
            description: project.description,
          }))}
          viewAllHref="/projects"
          viewAllText="all projects"
          previewItems
        />

        <section id="interests-setup" className="mb-12 scroll-mt-24 border-t border-border pt-10">
          <h2 className="mb-6 flex items-center text-2xl font-semibold tracking-wider text-foreground">
            <span className="accent-glow mr-2 text-brand">*</span>
            <span className="font-geist-pixel">misc</span>
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:gap-4">
              <span className="shrink-0 pt-px text-sm text-muted-foreground sm:w-28">
                interests
              </span>
              <span className="text-foreground">
                {portfolioData.interests.map((interest, index) => (
                  <span key={interest}>
                    {interest === "Photography" ? (
                      <Link
                        to="/photos"
                        className="underline decoration-muted-foreground/50 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                      >
                        {interest}
                      </Link>
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

import type { Metadata } from "next";
import portfolioData from "@/data/portfolio.json";
import { TextScramble } from "@/components/text-scramble";
import { Elsewhere } from "@/components/elsewhere";
import { Markdown } from "@/components/markdown";
import Image from "next/image";
import newProfilePhoto from "@/assets/images/new_profile.webp";

export const metadata: Metadata = {
  title: "Home",
};

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">
      <div className="col-span-1 md:col-span-3 text-muted-foreground text-base font-medium mb-2 md:mb-0">
        {title}
      </div>
      <div className="col-span-1 md:col-span-9">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <div className="space-y-12">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <h1 className="text-4xl font-medium text-foreground">
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
          <div className="relative w-full shrink-0 overflow-hidden rounded-md border border-border shadow-sm aspect-[4/3] lg:aspect-auto lg:h-[min(380px,52vh)] lg:w-[min(380px,42%)] lg:max-w-md">
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

        <Section title="Experience">
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <div key={index}>
                <div className="mb-3 md:flex md:justify-between flex-col gap-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground font-medium hover:text-brand transition-colors"
                      href={exp.url}
                    >
                      {exp.company}
                    </a>
                    <span className="text-muted-foreground md:ml-2">
                      {exp.role}
                    </span>
                  </div>
                </div>
                <div className="leading-relaxed text-foreground mb-3">
                  {exp.description}
                </div>
                <div className="text-muted-foreground text-xs">
                  {exp.period} — {exp.location}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-foreground font-medium">
                {portfolioData.education.school}
              </span>
              <span className="text-muted-foreground">
                {portfolioData.education.period}
              </span>
            </div>
            <div className="text-foreground">
              {portfolioData.education.degree}
            </div>
          </div>
        </Section>

        <Section title="Interests">
          <div className="leading-relaxed text-foreground">
            {portfolioData.interests.map((interest, index) => (
              <span key={index}>
                {interest === "Photography" ? (
                  <a
                    href="/photo"
                    className="text-foreground hover:text-brand transition-colors"
                  >
                    {interest}
                  </a>
                ) : (
                  interest
                )}
                {index < portfolioData.interests.length - 1 && "; "}
              </span>
            ))}
          </div>
        </Section>

        <Elsewhere />
      </div>
    </main>
  );
}

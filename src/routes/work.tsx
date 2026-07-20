import { createFileRoute } from "@tanstack/react-router";
import { TextScramble } from "@/components/text-scramble";
import { SectionList } from "@/components/section-list";
import portfolioData from "@/data/portfolio.json";
import { pageDescriptions } from "@/lib/seo";
import { pageHead } from "@/lib/meta";

export const Route = createFileRoute("/work")({
  head: () =>
    pageHead({
      title: "Work",
      description: pageDescriptions.work,
      path: "/work",
    }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main className="font-body">
      <h1 className="mb-8 text-4xl font-bold lowercase tracking-wider text-foreground">
        <span className="accent-glow mr-2 text-primary">*</span>
        <TextScramble as="span" className="font-geist-pixel">
          work
        </TextScramble>
      </h1>
      <p className="mb-6 leading-relaxed lowercase text-foreground/60">
        roles and teams i&apos;ve been part of — building products, shipping features, and learning
        along the way.
      </p>
      <SectionList
        title="work"
        items={portfolioData.work.map(({ company, url, role, period, description }) => ({
          title: company,
          href: url,
          role,
          period,
          description,
        }))}
        showSectionBorder={false}
        showTitle={false}
      />
    </main>
  );
}

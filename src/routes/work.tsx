import { createFileRoute } from "@tanstack/react-router";
import { SectionList } from "@/components/section-list";
import { TextScramble } from "@/components/text-scramble";
import portfolioData from "@/data/portfolio.json";
import { buildSeoHead, pageDescriptions, siteName } from "@/lib/seo";
import { mapWorkToSectionItems, type WorkEntry } from "@/lib/work-section";

export const Route = createFileRoute("/work")({
  head: () =>
    buildSeoHead({
      title: `Work | ${siteName}`,
      description: pageDescriptions.work,
      path: "/work",
    }),
  component: WorkPage,
});

function WorkPage() {
  const items = mapWorkToSectionItems(portfolioData.work as WorkEntry[]);

  return (
    <main className="font-body">
      <h1 className="mb-8 text-4xl font-medium lowercase text-foreground tracking-wider">
        <span className="accent-glow text-primary mr-2">*</span>
        <TextScramble as="span" className="font-geist-pixel font-medium">
          work
        </TextScramble>
      </h1>
      <p className="mb-6 leading-relaxed lowercase text-foreground/60">
        roles and teams i&apos;ve been part of — building products, shipping
        features, and learning along the way.
      </p>
      <SectionList
        title="work"
        items={items}
        showSectionBorder={false}
        showTitle={false}
      />
    </main>
  );
}

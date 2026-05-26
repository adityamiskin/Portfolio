import type { Metadata } from "next";
import { TextScramble } from "@/components/text-scramble";
import { SectionList } from "@/components/section-list";
import portfolioData from "@/data/portfolio.json";
import { mapWorkToSectionItems, type WorkEntry } from "@/lib/work-section";
import { pageDescriptions } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work",
  description: pageDescriptions.work,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work | Aditya Miskin",
    description: pageDescriptions.work,
    url: "/work",
  },
};

export default function WorkPage() {
  const items = mapWorkToSectionItems(portfolioData.work as WorkEntry[]);

  return (
    <main className="font-body">
      <h1 className="mb-8 text-4xl font-bold lowercase text-foreground tracking-wider">
        <span className="accent-glow text-primary mr-2">*</span>
        <TextScramble as="span" className="font-geist-pixel">work</TextScramble>
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

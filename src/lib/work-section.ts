import type { Item } from "@/components/section-list";

export type WorkEntry = {
  company: string;
  url: string;
  role: string;
  description: string;
  period: string;
  location: string;
};

export function mapWorkToSectionItems(entries: WorkEntry[]): Item[] {
  return entries.map((exp) => ({
    title: exp.company,
    href: exp.url,
    role: exp.role,
    period: `${exp.period} · ${exp.location}`,
    description: exp.description,
  }));
}

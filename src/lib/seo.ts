import portfolioData from "@/data/portfolio.json";

export const siteUrl = "https://adityamiskin.com";
export const siteName = "Aditya Miskin";
export const siteHandle = "@ad1tyamiskin";

export const siteDescription =
  "Aditya Miskin is a Bangalore-based cofounder and software engineer building enterprise AI systems, developer tools, and thoughtful web products.";

export const pageDescriptions = {
  home: siteDescription,
  blog: "Writing by Aditya Miskin on software, building products, photography, and personal notes.",
  work: "Work experience from Aditya Miskin, including Zapsight, Carelon Global Solutions, and Magnimus.",
  projects:
    "Selected projects by Aditya Miskin across AI, web development, developer tools, and product engineering.",
  photos:
    "Photography by Aditya Miskin, featuring street, landscape, nature, portrait, and urban images.",
} as const;

export const socialLinks = [
  portfolioData.githubUrl,
  portfolioData.linkedinUrl,
  portfolioData.twitterUrl,
].filter(Boolean);

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

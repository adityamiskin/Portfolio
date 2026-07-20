import { absoluteUrl, siteDescription, siteHandle, siteName, siteUrl } from "@/lib/seo";

type PageMetaOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  twitterImage?: string;
  type?: "website" | "article";
};

export function pageHead({
  title,
  description = siteDescription,
  path = "/",
  image = "/opengraph-image.png",
  twitterImage = "/twitter-image.png",
  type = "website",
}: PageMetaOptions = {}) {
  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} | Cofounder and Software Engineer`;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const twitterImageUrl = absoluteUrl(twitterImage);

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "author", content: siteName },
      { name: "application-name", content: siteName },
      {
        name: "keywords",
        content:
          "Aditya Miskin, software engineer, cofounder, enterprise AI, AI systems, developer tools, TypeScript, Python, Bangalore, photography",
      },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: siteName },
      { property: "og:type", content: type },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: title ?? siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: siteHandle },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: twitterImageUrl },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

const defaultHead = pageHead();

export const baseHead = {
  ...defaultHead,
  meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    ...defaultHead.meta,
  ],
  links: [
    { rel: "icon", href: "/favicon.ico", sizes: "any" },
    {
      rel: "icon",
      href: "/icon.png",
      type: "image/png",
      sizes: "512x512",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
    { rel: "manifest", href: "/manifest.webmanifest" },
  ],
};

export { siteUrl };

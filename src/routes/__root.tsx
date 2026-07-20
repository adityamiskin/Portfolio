/// <reference types="vite/client" />

import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import { Oneko } from "@/components/oneko";
import {
  absoluteUrl,
  pageDescriptions,
  profileImagePath,
  siteName,
  siteUrl,
  socialLinks,
} from "@/lib/seo";
import { baseHead } from "@/lib/meta";
import Anya from "@/assets/images/anya-new.png";
import silkscreenRegular from "@/assets/fonts/silkscreen-latin-400-normal.woff2?url";
import silkscreenBold from "@/assets/fonts/silkscreen-latin-700-normal.woff2?url";
import jetbrainsMonoLatin from "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url";
import appCss from "@/styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    ...baseHead,
    links: [
      {
        rel: "preload",
        href: jetbrainsMonoLatin,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: silkscreenRegular,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: silkscreenBold,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      ...baseHead.links,
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
});

function SchemaTags() {
  const profileImageUrl = absoluteUrl(profileImagePath);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: siteName,
    alternateName: ["aditya miskin", "ad1tyamiskin"],
    givenName: "Aditya",
    familyName: "Miskin",
    url: siteUrl,
    mainEntityOfPage: absoluteUrl("/"),
    image: {
      "@type": "ImageObject",
      "@id": absoluteUrl(`${profileImagePath}#image`),
      url: profileImageUrl,
      contentUrl: profileImageUrl,
      width: 1280,
      height: 1280,
      caption: siteName,
    },
    jobTitle: "Cofounder and Software Engineer",
    description: pageDescriptions.home,
    email: "mailto:adityamiskin@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Enterprise AI",
      "Software Engineering",
      "Developer Tools",
      "TypeScript",
      "Python",
      "Photography",
    ],
    sameAs: socialLinks,
    worksFor: {
      "@type": "Organization",
      name: "Zapsight",
      url: "https://zapsight.com/",
    },
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteName,
    url: siteUrl,
    publisher: { "@id": absoluteUrl("/#person") },
    inLanguage: "en",
  };
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profile"),
    url: siteUrl,
    name: `${siteName} - Cofounder and Software Engineer`,
    description: pageDescriptions.home,
    primaryImageOfPage: { "@id": absoluteUrl(`${profileImagePath}#image`) },
    thumbnailUrl: profileImageUrl,
    mainEntity: { "@id": absoluteUrl("/#person") },
    isPartOf: { "@id": absoluteUrl("/#website") },
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([personSchema, websiteSchema, profilePageSchema]),
      }}
    />
  );
}

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-body">
        <SchemaTags />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Oneko />
          <main className="relative flex min-h-screen items-start justify-center overflow-x-hidden pt-16 md:pt-20">
            <div className="w-full max-w-5xl px-4 py-8 md:px-16 md:py-12">
              <Navbar />
              <Outlet />
            </div>
          </main>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <section className="mx-auto p-4 md:p-10">
      <title>{`Page not found | ${siteName}`}</title>
      <meta name="robots" content="noindex" />
      <h1 className="sr-only">Page not found</h1>
      <img
        src={Anya}
        width={500}
        height={500}
        alt="404 — page not found"
        className="mx-auto mt-10 w-[500px]"
      />
    </section>
  );
}

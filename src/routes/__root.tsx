import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Oneko } from "@/components/oneko";
import { ThemeProvider } from "@/components/theme-provider";
import Anya from "@/assets/images/anya-new.png";
import {
  absoluteUrl,
  buildSeoHead,
  pageDescriptions,
  siteName,
  siteUrl,
  socialLinks,
} from "@/lib/seo";
import appCss from "../app/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    ...buildSeoHead({
      title: `${siteName} | Cofounder and Software Engineer`,
      description: pageDescriptions.home,
      path: "/",
    }),
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "application-name", content: siteName },
      { name: "robots", content: "index, follow" },
      ...buildSeoHead({
        title: `${siteName} | Cofounder and Software Engineer`,
        description: pageDescriptions.home,
        path: "/",
      }).meta,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Silkscreen:wght@400;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      ...buildSeoHead({
        title: `${siteName} | Cofounder and Software Engineer`,
        description: pageDescriptions.home,
        path: "/",
      }).links,
    ],
  }),
  notFoundComponent: NotFoundPage,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-body">
        <script async defer src="https://platform.twitter.com/widgets.js" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": absoluteUrl("/#person"),
              name: siteName,
              url: siteUrl,
              image: absoluteUrl("/icon.png"),
              jobTitle: "Cofounder and Software Engineer",
              description: pageDescriptions.home,
              sameAs: socialLinks,
              worksFor: {
                "@type": "Organization",
                name: "Zapsight",
                url: "https://zapsight.com/",
              },
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Oneko />
          <main className="min-h-screen flex items-start justify-center pt-16 md:pt-20 relative overflow-x-hidden">
            <div className="w-full max-w-5xl px-4 md:px-16 py-8 md:py-12">
              <Navbar />
              <Analytics />
              {children}
              <SpeedInsights />
            </div>
          </main>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundPage() {
  return (
    <section className="mx-auto p-4 md:p-10">
      <img
        src={Anya}
        width={500}
        height={500}
        alt="404"
        className="mx-auto mt-10 w-[500px]"
      />
    </section>
  );
}

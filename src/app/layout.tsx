import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Oneko } from "@/components/oneko";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Aditya Miskin",
  description:
    "Passionate about creating meaningful software and exploring new technologies. I love building products that solve real problems and make people's lives better. When I'm not coding, you'll usually find me out with my camera, capturing moments and places that inspire me.",
  keywords:
    "data science, machine learning, ai, artificial intelligence, healthcare ai, web development, aditya miskin, photography, travel photography, street photography, urban photography, nature photography, portfolio, india, frontend developer, software engineer, associate data scientist, aditya, miskin, typescript, python",
  applicationName: "Aditya Miskin",
  metadataBase: new URL("https://adityamiskin.com"),

  openGraph: {
    title: "Aditya Miskin",
    description:
      "Passionate about creating meaningful software and exploring new technologies. I love building products that solve real problems and make people's lives better. When I'm not coding, you'll usually find me out with my camera, capturing moments and places that inspire me.",
    url: "https://adityamiskin.com",
    siteName: "Aditya Miskin",
    // If you add an opengraph-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
    // images: [
    //   {
    //     url: `https://${config.domainName}/share.png`,
    //     width: 1200,
    //     height: 660,
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    title: "Aditya Miskin",
    description:
      "Passionate about creating meaningful software and exploring new technologies. I love building products that solve real problems and make people's lives better. When I'm not coding, you'll usually find me out with my camera, capturing moments and places that inspire me.",
    // If you add an twitter-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
    // images: [openGraph?.image || defaults.og.image],
    card: "summary_large_image",
    creator: "@ad1tyamiskin",
  },
};

export const renderSchemaTags = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Person",
          name: "Aditya Miskin",
          description:
            "Passionate about creating meaningful software and exploring new technologies. I love building products that solve real problems and make people's lives better. When I'm not coding, you'll usually find me out with my camera, capturing moments and places that inspire me.",
          image: `https://adityamiskin.com/icon.png`,
          url: `https://adityamiskin.com`,
          sameAs: [
            "https://github.com/adityamiskin",
            "https://linkedin.com/in/adityamiskin",
            "https://twitter.com/ad1tyamiskin",
          ],
        }),
      }}
    ></script>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <script async defer src="https://platform.twitter.com/widgets.js" />
      <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      <body className={`${GeistMono.variable} font-body`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Oneko />
          <main className="min-h-screen flex items-start justify-center pt-16 md:pt-20 relative overflow-x-hidden">
            <div className="w-full max-w-4xl px-4 md:px-16 py-8 md:py-12">
              <Navbar />
              <Analytics />
              {children}
              <SpeedInsights />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

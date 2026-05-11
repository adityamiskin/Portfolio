import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import localFont from "next/font/local";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-stack-jetbrains",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

const departureMono = localFont({
  src: "./DepartureMono-Regular.woff2",
  display: "swap",
  variable: "--font-stack-departure",
  fallback: ["ui-monospace", "Courier New", "monospace"],
});

const siteTitle = "Aditya Miskin";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description:
    "Passionate about creating meaningful software and exploring new technologies. I love building products that solve real problems and make people's lives better. When I'm not coding, you'll usually find me out with my camera, capturing moments and places that inspire me.",
  keywords:
    "data science, machine learning, ai, artificial intelligence, healthcare ai, web development, aditya miskin, photography, travel photography, street photography, urban photography, nature photography, portfolio, india, frontend developer, software engineer, associate data scientist, aditya, miskin, typescript, python",
  applicationName: "Aditya Miskin",
  metadataBase: new URL("https://adityamiskin.com"),

  openGraph: {
    title: siteTitle,
    description:
      "Passionate about creating meaningful software and exploring new technologies. I love building products that solve real problems and make people's lives better. When I'm not coding, you'll usually find me out with my camera, capturing moments and places that inspire me.",
    url: "https://adityamiskin.com",
    siteName: "Aditya Miskin",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    title: siteTitle,
    description:
      "Passionate about creating meaningful software and exploring new technologies. I love building products that solve real problems and make people's lives better. When I'm not coding, you'll usually find me out with my camera, capturing moments and places that inspire me.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${ibmPlexMono.variable} ${departureMono.variable} ${GeistPixelSquare.variable}`}
    >
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
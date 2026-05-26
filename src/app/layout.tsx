import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Oneko } from "@/components/oneko";
import { ThemeProvider } from "@/components/theme-provider";
import {
  absoluteUrl,
  pageDescriptions,
  siteDescription,
  siteHandle,
  siteName,
  siteUrl,
  socialLinks,
} from "@/lib/seo";
import localFont from "next/font/local";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-stack-jetbrains",
});

const departureMono = localFont({
  src: "./DepartureMono-Regular.woff2",
  display: "swap",
  variable: "--font-stack-departure",
  fallback: ["ui-monospace", "Courier New", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  title: {
    default: `${siteName} | Cofounder and Software Engineer`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Aditya Miskin",
    "software engineer",
    "cofounder",
    "enterprise AI",
    "AI systems",
    "developer tools",
    "web development",
    "TypeScript",
    "Python",
    "Bangalore",
    "India",
    "photography",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} | Cofounder and Software Engineer`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: siteName,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: `${siteName} | Cofounder and Software Engineer`,
    description: siteDescription,
    card: "summary_large_image",
    creator: siteHandle,
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const renderSchemaTags = () => {
  return (
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
      className={`${jetbrainsMono.variable} ${departureMono.variable} ${GeistPixelSquare.variable}`}
    >
      <script async defer src="https://platform.twitter.com/widgets.js" />
      <body className="font-body">
        {renderSchemaTags()}
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
      </body>
    </html>
  );
}

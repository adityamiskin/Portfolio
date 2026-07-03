import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Oneko } from "@/components/oneko";
import { ThemeProvider } from "@/components/theme-provider";
import {
  absoluteUrl,
  pageDescriptions,
  profileImagePath,
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

const silkscreen = localFont({
  src: [
    {
      path: "./fonts/silkscreen-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/silkscreen-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-stack-silkscreen",
  fallback: ["ui-monospace", "Courier New", "monospace"],
});

const profileImageUrl = absoluteUrl(profileImagePath);

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
  other: {
    "image_src": profileImageUrl,
  },
  openGraph: {
    title: `${siteName} | Cofounder and Software Engineer`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: profileImagePath,
        width: 1280,
        height: 1280,
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
    images: [profileImagePath],
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
    description: siteDescription,
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
      className={`${jetbrainsMono.variable} ${departureMono.variable} ${silkscreen.variable}`}
    >
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

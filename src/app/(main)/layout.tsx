import { Navbar } from "@/components/navbar";
import { Oneko } from "@/components/oneko";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
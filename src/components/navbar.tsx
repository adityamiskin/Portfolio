"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { OnekoToggle } from "@/components/oneko-toggle";

export const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || theme) as "light" | "dark";

  return (
    <nav>
      <div className="border-b border-border/50 pb-6 mb-12">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto text-foreground text-sm md:gap-4">
            <div className="flex shrink-0 items-center gap-3 whitespace-nowrap md:gap-4">
              <Link className="hover:text-brand transition-colors" href="/">
                home
              </Link>
              <Link className="hover:text-brand transition-colors" href="/blog">
                blog
              </Link>
              <Link className="hover:text-brand transition-colors" href="/work">
                work
              </Link>
              <Link
                className="hover:text-brand transition-colors"
                href="/projects"
              >
                projects
              </Link>
              <Link className="hover:text-brand transition-colors" href="/photo">
                photo
              </Link>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <OnekoToggle />
            <ThemeSwitcher
              value={currentTheme}
              onChange={(newTheme) => setTheme(newTheme)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

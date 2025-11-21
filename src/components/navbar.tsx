"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { useTheme } from "next-themes";
import portfolio from "@/data/portfolio.json";
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { OnekoToggle } from "@/components/oneko-toggle";

export const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || theme) as "light" | "dark";

  return (
    <nav>
      <div className="border-b border-border/50 pb-6 mb-12">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-sm font-bold">{portfolio.name}</h1>
          <div className="flex items-center gap-2">
            <OnekoToggle />
            <ThemeSwitcher
              value={currentTheme}
              onChange={(newTheme) => setTheme(newTheme)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 md:gap-0">
          <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4">
            <nav className="flex flex-wrap gap-2 md:gap-4 text-muted-foreground text-sm">
              <Link
                className="hover:text-foreground transition-colors"
                href="/"
              >
                home
              </Link>
              <Link
                className="hover:text-foreground transition-colors"
                href="/blog"
              >
                blog
              </Link>
              <Link
                className="hover:text-foreground transition-colors"
                href="/work"
              >
                work
              </Link>
              <Link
                className="hover:text-foreground transition-colors"
                href="/photo"
              >
                photo
              </Link>
              <Link
                className="hover:text-foreground transition-colors"
                href="/uses"
              >
                uses
              </Link>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                href={portfolio.resumeUrl}
              >
                resume
              </a>
            </nav>
            <span className="text-border/60 hidden md:inline">|</span>
            <nav className="flex flex-wrap gap-3 md:gap-4 items-center text-muted-foreground">
              <a
                className="hover:text-foreground transition-colors"
                href={`mailto:${portfolio.email}`}
                aria-label="Email"
              >
                <LuMail size={18} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                href={portfolio.githubUrl}
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                href={portfolio.linkedinUrl}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                href={portfolio.twitterUrl}
                aria-label="Twitter"
              >
                <FaXTwitter size={18} />
              </a>
            </nav>
          </div>
          <div className="text-muted-foreground text-sm">
            {portfolio.location}
          </div>
        </div>
      </div>
    </nav>
  );
};

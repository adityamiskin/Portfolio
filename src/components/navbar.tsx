"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { OnekoToggle } from "@/components/oneko-toggle";

type NavItem = {
  href: string;
  label: string;
  key: string;
  shortcutTitle?: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "home", key: "h" },
  { href: "/blog", label: "blog", key: "b" },
  { href: "/work", label: "work", key: "w" },
  { href: "/projects", label: "projects", key: "p" },
  {
    href: "/photos",
    label: "photos",
    key: "o",
    shortcutTitle: "Keyboard: O (P is used for projects)",
  },
];

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.isContentEditable;
}

export const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || theme) as "light" | "dark";
  const router = useRouter();

  useEffect(() => {
    const isDesktop = () =>
      typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isDesktop()) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      if (isEditableTarget(e.target)) return;

      const k = e.key.toLowerCase();
      const item = NAV_ITEMS.find((entry) => entry.key === k);
      if (!item) return;

      e.preventDefault();
      router.push(item.href);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <nav aria-label="Primary">
      <div className="border-b border-border/50 pb-6 mb-12">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto text-foreground text-sm md:gap-4">
            <div className="flex shrink-0 items-center gap-3 whitespace-nowrap md:gap-4">
              {NAV_ITEMS.map(({ href, label, key, shortcutTitle }) => (
                <Link
                  key={href}
                  className="hover:text-brand transition-colors"
                  href={href}
                  aria-keyshortcuts={key}
                  title={
                    shortcutTitle ?? `${label} — keyboard: ${key.toUpperCase()}`
                  }
                >
                  <span className="hidden md:inline text-muted-foreground">
                    [{key}]{" "}
                  </span>
                  {label}
                </Link>
              ))}
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

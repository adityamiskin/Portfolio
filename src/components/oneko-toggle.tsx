"use client";

import { Cat } from "lucide-react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ONEKO_STORAGE_KEY = "oneko-enabled";

export const OnekoToggle = ({ className }: { className?: string }) => {
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Load preference from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(ONEKO_STORAGE_KEY);
    if (stored !== null) {
      setEnabled(stored === "true");
    }
    setMounted(true);
  }, []);

  // Update oneko visibility when enabled state or pathname changes
  useEffect(() => {
    if (!mounted) return;

    const updateOnekoVisibility = () => {
      const onekoElement = document.getElementById("oneko");
      if (!onekoElement) return;

      // If toggle is disabled, always hide
      if (!enabled) {
        onekoElement.style.display = "none";
        return;
      }

      // If toggle is enabled, respect pathname logic (same as Oneko component)
      const isPhotoSlugPage =
        pathname?.startsWith("/photo/") && pathname !== "/photo";

      if (isPhotoSlugPage) {
        onekoElement.style.display = "none";
      } else {
        onekoElement.style.display = "";
      }
    };

    // Update immediately
    updateOnekoVisibility();

    // Watch for when the oneko element is created by the script
    const observer = new MutationObserver(() => {
      updateOnekoVisibility();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also set up an observer on the oneko element itself if it exists
    // This will catch style changes made by other components
    let styleObserver: MutationObserver | null = null;
    const onekoElement = document.getElementById("oneko");
    if (onekoElement) {
      styleObserver = new MutationObserver(() => {
        updateOnekoVisibility();
      });
      styleObserver.observe(onekoElement, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    return () => {
      observer.disconnect();
      if (styleObserver) {
        styleObserver.disconnect();
      }
    };
  }, [enabled, mounted, pathname]);

  const handleToggle = useCallback(() => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    localStorage.setItem(ONEKO_STORAGE_KEY, String(newEnabled));
  }, [enabled]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label={enabled ? "Hide cat" : "Show cat"}
      className={cn(
        "relative h-6 w-6 rounded-full overflow-visible flex items-center justify-center",
        "ring-1 ring-border bg-background transition-colors",
        "hover:bg-secondary/50",
        className
      )}
      onClick={handleToggle}
      type="button"
    >
      {enabled && (
        <motion.div
          className="absolute inset-0 rounded-full bg-secondary"
          layoutId="onekoActive"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
      <Cat
        className={cn(
          "relative z-10 h-3 w-3 transition-colors",
          enabled ? "text-foreground" : "text-muted-foreground"
        )}
      />
    </button>
  );
};

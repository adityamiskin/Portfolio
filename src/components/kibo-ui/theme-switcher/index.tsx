"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
    color: "text-yellow-500",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
    color: "text-slate-400",
  },
];

// Star component for dark theme hover
const Star = ({ delay = 0, size = 2, x = 0, y = 0 }: { delay?: number; size?: number; x?: number; y?: number }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-slate-300"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        delay,
        duration: 0.3,
        ease: "easeOut",
      }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
      }}
    />
  );
};

// Light beam component for light theme hover
const LightBeam = ({ delay = 0, rotation = 0, length = 8 }: { delay?: number; rotation?: number; length?: number }) => {
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{
        delay,
        duration: 0.4,
        ease: "easeOut",
      }}
      style={{
        width: "1px",
        height: `${length}px`,
        background: "linear-gradient(to bottom, rgba(251, 191, 36, 0.7), transparent)",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-${length / 2}px)`,
        transformOrigin: "center top",
      }}
    />
  );
};

export type ThemeSwitcherProps = {
  value?: "light" | "dark";
  onChange?: (theme: "light" | "dark") => void;
  defaultValue?: "light" | "dark";
  className?: string;
};

export const ThemeSwitcher = ({
  value,
  onChange,
  defaultValue = "light",
  className,
}: ThemeSwitcherProps) => {
  const [theme, setTheme] = useControllableState({
    defaultProp: defaultValue,
    prop: value,
    onChange,
  });
  const [mounted, setMounted] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<"light" | "dark" | null>(null);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark") => {
      setTheme(themeKey);
    },
    [setTheme]
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Generate star positions for dark theme
  const starPositions = [
    { x: 20, y: 15, size: 1.5, delay: 0 },
    { x: 60, y: 25, size: 1, delay: 0.1 },
    { x: 35, y: 50, size: 1.2, delay: 0.15 },
    { x: 75, y: 40, size: 1, delay: 0.2 },
    { x: 15, y: 70, size: 1.5, delay: 0.1 },
    { x: 50, y: 80, size: 1, delay: 0.25 },
    { x: 80, y: 65, size: 1.2, delay: 0.2 },
  ];

  // Generate light beam rotations for light theme
  const lightBeams = Array.from({ length: 8 }, (_, i) => ({
    rotation: (i * 360) / 8,
    delay: i * 0.05,
    length: 6 + Math.random() * 2,
  }));

  return (
    <div
      className={cn(
        "relative isolate flex h-6 rounded-full bg-background p-0.5 ring-1 ring-border",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label, color }) => {
        const isActive = theme === key;
        const isHovered = hoveredTheme === key;

        return (
          <button
            aria-label={label}
            className="relative h-5 w-5 rounded-full overflow-visible"
            key={key}
            onClick={() => handleThemeClick(key as "light" | "dark")}
            onMouseEnter={() => setHoveredTheme(key as "light" | "dark")}
            onMouseLeave={() => setHoveredTheme(null)}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            
            {/* Stars effect for dark theme */}
            {key === "dark" && (
              <AnimatePresence>
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    {starPositions.map((star, index) => (
                      <Star
                        key={index}
                        x={star.x}
                        y={star.y}
                        size={star.size}
                        delay={star.delay}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            )}

            {/* Light beams effect for light theme */}
            {key === "light" && (
              <AnimatePresence>
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    {lightBeams.map((beam, index) => (
                      <LightBeam
                        key={index}
                        rotation={beam.rotation}
                        delay={beam.delay}
                        length={beam.length}
                      />
                    ))}
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-yellow-400/20 blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </AnimatePresence>
            )}

            <Icon className={cn("relative z-10 m-auto h-3 w-3", color)} />
          </button>
        );
      })}
    </div>
  );
};

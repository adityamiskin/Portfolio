"use client";

import type { LucideIcon } from "lucide-react";
import { CalendarCheck, Linkedin, Mail, X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import portfolio from "@/data/portfolio.json";
import social from "@/data/social.json";
import { getResumePreviewUrl, prefetchResumePreview } from "@/lib/resume";
import {
  GITHUB_USER,
  type GitHubLive,
  getSocialLive,
  type SocialLive,
  type XLive,
  X_HANDLE,
} from "@/lib/social";
import { cn } from "@/lib/utils";

const WEEKS = 26;
const DAYS = 7;

const LEVEL_BG = [
  "bg-foreground/10",
  "bg-foreground/30",
  "bg-foreground/50",
  "bg-foreground/75",
  "bg-foreground",
] as const;

/** Underlined inline style for links inside body copy */
export const socialInlineLinkClass =
  "underline decoration-muted-foreground/60 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand";

let livePromise: Promise<SocialLive> | null = null;

function loadSocialLive() {
  if (!livePromise) {
    livePromise = getSocialLive().catch((err) => {
      livePromise = null;
      throw err;
    });
  }
  return livePromise;
}

function useSocialLive() {
  const [data, setData] = useState<SocialLive | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadSocialLive()
      .then((live) => {
        if (!cancelled) setData(live);
      })
      .catch(() => {
        /* keep null; cards fall back to handles-only */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

function SocialPreviewCard({
  href,
  external = true,
  children,
  popup,
  className,
  triggerClassName,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
  popup: ReactNode;
  className?: string;
  triggerClassName?: string;
}) {
  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        <a
          href={href}
          className={cn("transition-colors hover:text-brand", triggerClassName)}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        className={cn(
          "pointer-events-none flex w-64 select-none flex-col gap-2 rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-md",
          className,
        )}
      >
        {popup}
      </HoverCardContent>
    </HoverCard>
  );
}

function CardHead({
  name,
  sub,
  icon: Icon,
  iconClassName,
  avatar = "/profile.webp",
}: {
  name: string;
  sub: string;
  icon: LucideIcon;
  iconClassName?: string;
  avatar?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={avatar}
        alt=""
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-full object-cover ring-1 ring-border"
      />
      <div className="min-w-0 flex-1 leading-snug">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
      <Icon className={cn("size-4 shrink-0 self-start text-muted-foreground", iconClassName)} aria-hidden />
    </div>
  );
}

function CardBio({ children }: { children: ReactNode }) {
  return <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{children}</p>;
}

function CardStat({ children }: { children: ReactNode }) {
  return (
    <div className="mt-0.5 flex flex-wrap items-center gap-x-1 gap-y-0.5 border-t border-border pt-2 text-[11px] tracking-wide text-muted-foreground tabular-nums">
      {children}
    </div>
  );
}

function ContribGrid({ levels }: { levels: string }) {
  const cells = levels.slice(-WEEKS * DAYS);
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: WEEKS }, (_, w) => (
        <div key={w} className="flex flex-col gap-0.5">
          {Array.from({ length: DAYS }, (_, d) => {
            const level = Number(cells[w * DAYS + d] ?? "0");
            return (
              <span
                key={d}
                className={cn("size-1.5 rounded-[2px]", LEVEL_BG[level] ?? LEVEL_BG[0])}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function XCard({
  trigger = "x.com",
  triggerClassName,
}: {
  trigger?: ReactNode;
  triggerClassName?: string;
}) {
  const live = useSocialLive();
  const data: XLive = live?.x ?? {
    name: "Aditya Miskin",
    handle: social.x.handle || X_HANDLE,
    bio: "",
    avatar: `https://unavatar.io/x/${social.x.handle || X_HANDLE}`,
    followers: "",
    following: "",
    url: social.x.url,
  };

  return (
    <SocialPreviewCard
      href={data.url}
      triggerClassName={triggerClassName}
      popup={
        <>
          <CardHead name={data.name} sub={`@${data.handle}`} icon={X} avatar={data.avatar} />
          {data.bio ? <CardBio>{data.bio}</CardBio> : null}
          {(data.following || data.followers) && (
            <CardStat>
              {data.following ? (
                <span>
                  <span className="font-medium text-foreground">{data.following}</span> following
                </span>
              ) : null}
              {data.followers && data.following ? <span aria-hidden>·</span> : null}
              {data.followers ? (
                <span>
                  <span className="font-medium text-foreground">{data.followers}</span> followers
                </span>
              ) : null}
            </CardStat>
          )}
        </>
      }
    >
      {trigger}
    </SocialPreviewCard>
  );
}

export function GitHubCard({
  trigger = "github",
  triggerClassName,
}: {
  trigger?: ReactNode;
  triggerClassName?: string;
}) {
  const live = useSocialLive();
  const data: GitHubLive = live?.github ?? {
    user: social.github.user || GITHUB_USER,
    name: "Aditya Miskin",
    bio: "",
    avatar: "",
    followers: 0,
    total: 0,
    levels: "0".repeat(WEEKS * DAYS),
    url: social.github.url,
  };
  const ready = Boolean(live?.github);

  return (
    <SocialPreviewCard
      href={data.url}
      triggerClassName={triggerClassName}
      popup={
        <>
          <ContribGrid levels={data.levels} />
          <CardStat>
            <span>
              <span className="font-medium text-foreground">
                {ready ? data.total.toLocaleString() : "…"}
              </span>{" "}
              contributions
            </span>
            {ready ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  <span className="font-medium text-foreground">{data.followers}</span> followers
                </span>
              </>
            ) : null}
          </CardStat>
        </>
      }
    >
      {trigger}
    </SocialPreviewCard>
  );
}

export function LinkedInCard({
  trigger = "linkedin",
  triggerClassName,
}: {
  trigger?: ReactNode;
  triggerClassName?: string;
}) {
  const data = social.linkedin;
  return (
    <SocialPreviewCard
      href={data.url}
      triggerClassName={triggerClassName}
      popup={
        <>
          <CardHead name={data.name} sub={data.title} icon={Linkedin} />
          <CardBio>{data.bio}</CardBio>
          <CardStat>
            <span>{data.location}</span>
            <span aria-hidden>·</span>
            <span>/{data.handle}</span>
          </CardStat>
        </>
      }
    >
      {trigger}
    </SocialPreviewCard>
  );
}

export function ResumeCard({
  trigger = "résumé",
  triggerClassName,
}: {
  trigger?: ReactNode;
  triggerClassName?: string;
}) {
  const href = portfolio.resumeUrl;
  const previewSrc = getResumePreviewUrl(href);
  const [imgFailed, setImgFailed] = useState(false);

  // Prefetch as soon as the link is on the page (not only on hover)
  useEffect(() => {
    if (!previewSrc) return;
    void prefetchResumePreview(previewSrc);
  }, [previewSrc]);

  if (!href) return null;

  return (
    <SocialPreviewCard
      href={href}
      triggerClassName={triggerClassName}
      className="w-[13.5rem] overflow-hidden rounded-sm border-0 bg-transparent p-0 shadow-none"
      popup={
        <div
          className="relative w-full overflow-hidden rounded-[2px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_28px_rgba(0,0,0,0.18)] ring-1 ring-black/10"
          aria-hidden
        >
          {/* stacked pages behind */}
          <div className="pointer-events-none absolute inset-x-1.5 -bottom-1 h-2 rounded-b-[2px] bg-white ring-1 ring-black/8" />
          <div className="pointer-events-none absolute inset-x-3 -bottom-2 h-2 rounded-b-[2px] bg-white/90 ring-1 ring-black/6" />

          <div className="relative aspect-[8.5/11] w-full bg-[#f3f3f3]">
            {previewSrc && !imgFailed ? (
              <img
                src={previewSrc}
                alt=""
                width={720}
                height={930}
                decoding="async"
                className="absolute inset-0 size-full object-cover object-top"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col gap-2 bg-[#fafafa] p-4 text-[#1a1a1a]">
                <div className="space-y-1 border-b border-black/10 pb-2">
                  <p className="text-[11px] font-semibold tracking-wide uppercase">
                    {portfolio.name}
                  </p>
                  <p className="text-[8px] text-black/50">{portfolio.tagline}</p>
                </div>
                {portfolio.work.slice(0, 3).map((job) => (
                  <div key={job.company} className="space-y-0.5">
                    <div className="flex justify-between gap-1 text-[8px] font-medium">
                      <span className="truncate">
                        {job.role} · {job.company}
                      </span>
                      <span className="shrink-0 text-black/45">{job.period}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-black/8" />
                    <div className="h-1 w-4/5 rounded-full bg-black/6" />
                  </div>
                ))}
              </div>
            )}

            {/* soft bottom fade like a viewer chrome */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>
      }
    >
      {trigger}
    </SocialPreviewCard>
  );
}

export function EmailCard({
  trigger = "email",
  triggerClassName,
}: {
  trigger?: ReactNode;
  triggerClassName?: string;
}) {
  const data = social.email;
  const stampMonth = new Date().toLocaleString("en-US", { month: "short" }).toUpperCase();
  const stampDay = String(new Date().getDate()).padStart(2, "0");

  return (
    <SocialPreviewCard
      href={`mailto:${data.address}`}
      external={false}
      triggerClassName={triggerClassName}
      className="w-64 overflow-hidden border-[#1a1814]/25 bg-[#f7f4ee] p-0 shadow-md dark:border-[#ebe6dc]/15 dark:bg-[#1c1a17]"
      popup={
        <div
          className="email-envelope relative h-[9.25rem] overflow-hidden text-[#1a1814] dark:text-[#ebe6dc]"
          aria-hidden
        >
          <div className="email-envelope-flap absolute inset-x-0 bottom-0 h-[66%] bg-[#1a1814]/[0.03] dark:bg-[#ebe6dc]/[0.06]" />

          <div className="absolute top-4 left-4 z-[1] font-mono text-[7px] leading-[1.45] tracking-[0.08em] text-[#1a1814]/80 dark:text-[#ebe6dc]/80">
            <span className="mb-px block text-[6px] tracking-[0.16em] opacity-70">FROM</span>
            {data.fromName}
            <br />
            {data.fromCity}
          </div>

          <div className="absolute top-2.5 right-3 z-[2] flex items-start gap-0.5">
            <div className="email-envelope-stamp flex h-[3.65rem] w-12 rotate-2 flex-col items-center justify-center border-[3px] border-dotted border-[#f7f4ee] bg-[color-mix(in_oklab,oklch(0.58_0.12_25)_11%,#f7f4ee)] shadow-[0_0_0_1px_color-mix(in_oklab,#1a1814_36%,transparent)] dark:border-[#1c1a17] dark:bg-[color-mix(in_oklab,oklch(0.58_0.12_25)_18%,#1c1a17)] dark:shadow-[0_0_0_1px_color-mix(in_oklab,#ebe6dc_30%,transparent)]">
              <img
                src="/profile.webp"
                alt=""
                width={32}
                height={32}
                className="size-8 object-cover grayscale contrast-110"
              />
              <span className="mt-0.5 text-[5px] tracking-[0.06em]">ADI · 20</span>
            </div>
            <div className="email-envelope-stamp mt-1 flex h-[2.85rem] w-9 -rotate-3 flex-col items-center justify-center border-[3px] border-dotted border-[#f7f4ee] bg-[color-mix(in_oklab,oklch(0.53_0.09_245)_10%,#f7f4ee)] shadow-[0_0_0_1px_color-mix(in_oklab,#1a1814_36%,transparent)] dark:border-[#1c1a17] dark:bg-[color-mix(in_oklab,oklch(0.53_0.09_245)_16%,#1c1a17)] dark:shadow-[0_0_0_1px_color-mix(in_oklab,#ebe6dc_30%,transparent)]">
              <Mail className="size-3.5 text-[oklch(0.53_0.09_245)] opacity-80" aria-hidden />
              <span className="mt-0.5 text-[5px] tracking-[0.06em]">POST · 26</span>
            </div>
          </div>

          <div className="email-envelope-postmark absolute top-[1.35rem] right-[4.2rem] z-[3] size-[2.1rem] -rotate-8 rounded-full border border-[#1a1814]/60 opacity-70 dark:border-[#ebe6dc]/55">
            <span className="absolute inset-0 grid place-items-center font-mono text-[5px] tracking-[0.04em]">
              {stampDay} {stampMonth}
            </span>
            <span className="email-envelope-postmark-bars absolute top-2 left-[1.65rem] h-4 w-[2.8rem]" />
          </div>

          <div className="absolute top-[5.45rem] left-5 z-[2] max-w-[calc(100%-2.5rem)] overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[11px] leading-snug tracking-[0.02em] text-[#1a1814]/90 dark:text-[#ebe6dc]/90">
            <span className="mb-1 block text-[6px] tracking-[0.18em] opacity-70">TO</span>
            {data.address}
          </div>
        </div>
      }
    >
      {trigger}
    </SocialPreviewCard>
  );
}

export function CalCard({
  href,
  trigger = "book a call",
  triggerClassName,
}: {
  href?: string;
  trigger?: ReactNode;
  triggerClassName?: string;
}) {
  if (!href) return null;

  return (
    <SocialPreviewCard
      href={href}
      triggerClassName={triggerClassName}
      className="w-72 overflow-hidden rounded-md border-border bg-popover p-3 text-popover-foreground shadow-md"
      popup={
        <div className="space-y-3">
          <CardHead name="Aditya Miskin" sub="book a meeting" icon={CalendarCheck} />
          <div className="rounded-md border border-border bg-muted/40 p-3">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>availability</span>
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                all days
              </span>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 font-mono text-[10px] text-muted-foreground">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <span
                  key={`${day}-${index}`}
                  className="grid aspect-square place-items-center rounded-sm border border-border/70 bg-background"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
          <CardStat>
            <span>cal.com/adityamiskin</span>
          </CardStat>
        </div>
      }
    >
      {trigger}
    </SocialPreviewCard>
  );
}

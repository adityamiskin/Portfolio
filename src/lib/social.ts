import { createServerFn } from "@tanstack/react-start";

export const GITHUB_USER = "adityamiskin";
export const X_HANDLE = "ad1tyamiskin";

export type GitHubLive = {
  user: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  total: number;
  levels: string;
  url: string;
};

export type XLive = {
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  followers: string;
  following: string;
  url: string;
};

export type SocialLive = {
  github: GitHubLive;
  x: XLive;
};

const WEEKS = 26;
const DAYS = 7;
const LEVELS_LEN = WEEKS * DAYS;
const CACHE_TTL_MS = 10 * 60 * 1000;

let cache: { data: SocialLive; expiresAt: number } | undefined;
let pending: Promise<SocialLive> | undefined;

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

async function fetchGitHub(): Promise<GitHubLive> {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "adityamiskin-portfolio",
  };

  const [userRes, contribRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
    fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
      headers: { "User-Agent": "adityamiskin-portfolio" },
    }),
  ]);

  if (!userRes.ok) {
    throw new Error(`GitHub user ${userRes.status}`);
  }

  const user = (await userRes.json()) as {
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    followers: number;
    html_url: string;
  };

  let total = 0;
  let levels = "0".repeat(LEVELS_LEN);

  if (contribRes.ok) {
    const html = await contribRes.text();
    const totalMatch = html.match(/([\d,]+)\s+contributions/i);
    if (totalMatch) {
      total = Number(totalMatch[1].replace(/,/g, "")) || 0;
    }
    const cells = [...html.matchAll(/data-level="([0-4])"/g)].map((m) => m[1]);
    if (cells.length > 0) {
      levels = cells.slice(-LEVELS_LEN).join("").padStart(LEVELS_LEN, "0");
    }
  }

  return {
    user: user.login,
    name: user.name ?? user.login,
    bio: user.bio ?? "",
    avatar: user.avatar_url,
    followers: user.followers,
    total,
    levels,
    url: user.html_url,
  };
}

async function fetchX(): Promise<XLive> {
  const res = await fetch(`https://api.fxtwitter.com/${X_HANDLE}`, {
    headers: { "User-Agent": "adityamiskin-portfolio" },
  });
  if (!res.ok) {
    throw new Error(`X profile ${res.status}`);
  }

  const body = (await res.json()) as {
    user?: {
      screen_name?: string;
      name?: string;
      description?: string;
      avatar_url?: string;
      followers?: number;
      following?: number;
      url?: string;
    };
  };

  const user = body.user;
  if (!user?.screen_name) {
    throw new Error("X profile missing user");
  }

  // fxtwitter often returns _normal avatar; prefer higher-res
  const avatar = (user.avatar_url ?? "").replace("_normal.", "_400x400.");

  return {
    name: user.name ?? user.screen_name,
    handle: user.screen_name,
    bio: user.description ?? "",
    avatar: avatar || `https://unavatar.io/x/${user.screen_name}`,
    followers: formatCount(user.followers ?? 0),
    following: formatCount(user.following ?? 0),
    url: user.url ?? `https://x.com/${user.screen_name}`,
  };
}

async function loadSocialLive(): Promise<SocialLive> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return cache.data;
  }
  if (pending) return pending;

  pending = Promise.all([fetchGitHub(), fetchX()])
    .then(([github, x]) => {
      const data = { github, x };
      cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
      return data;
    })
    .finally(() => {
      pending = undefined;
    });

  return pending;
}

/** Live GitHub + X profile data (server-side fetch, ~10 min cache). */
export const getSocialLive = createServerFn({ method: "GET" }).handler(loadSocialLive);

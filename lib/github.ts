import "server-only";

import { communityStats } from "@/constants/communityStats";
import { contributors as fallbackContributors } from "@/constants/contributorsData";
import { currentRelease, mapRelease, stableRelease, type ApiRelease, type Release } from "./releases";
export type { Release, ReleaseAsset } from "./releases";

export const GITHUB_ORG = "soplang";
export const GITHUB_REPO = "soplang/soplang";
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

// Pages that read GitHub data are regenerated at most once an hour.
const REVALIDATE_SECONDS = 3600;

export type Contributor = {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
};

export type RepoStats = {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  contributors: number;
  downloads: number;
  goodFirstIssues: number;
  license: string | null;
  lastPushAt: string | null;
};

async function githubFetch<T>(path: string): Promise<T | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: a token raises the API limit from 60 to 5,000 requests an hour.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(`https://api.github.com/${path}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
    });
    if (!response.ok) {
      console.error(`GitHub API ${path} returned ${response.status}`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`GitHub API ${path} failed`, error);
    return null;
  }
}

type ApiRepo = {
  stargazers_count: number;
  forks_count: number;
  subscribers_count: number;
  open_issues_count: number;
  pushed_at: string;
  license: { spdx_id: string } | null;
};

type ApiContributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
};

export async function getContributors(): Promise<Contributor[]> {
  const data = await githubFetch<ApiContributor[]>(
    `repos/${GITHUB_REPO}/contributors?per_page=100`,
  );
  const list = data ?? fallbackContributors;

  return list
    .filter((contributor) => contributor.type === "User")
    .map((contributor) => ({
      login: contributor.login,
      avatarUrl: contributor.avatar_url,
      profileUrl: contributor.html_url,
      contributions: contributor.contributions,
    }));
}

export async function getReleases(): Promise<Release[]> {
  const data = await githubFetch<ApiRelease[]>(`repos/${GITHUB_REPO}/releases?per_page=30`);
  return data ? data.filter((release) => !release.draft).map(mapRelease) : [currentRelease];
}

export async function getLatestRelease(): Promise<Release> {
  // GitHub's latest endpoint excludes drafts and prereleases.
  return stableRelease(await githubFetch<ApiRelease>(`repos/${GITHUB_REPO}/releases/latest`));
}

export async function getRepoStats(): Promise<RepoStats> {
  const [repo, contributors, releases, goodFirstIssues] = await Promise.all([
    githubFetch<ApiRepo>(`repos/${GITHUB_REPO}`),
    getContributors(),
    getReleases(),
    githubFetch<unknown[]>(
      `repos/${GITHUB_REPO}/issues?labels=${encodeURIComponent("good first issue")}&state=open&per_page=100`,
    ),
  ]);

  const downloads = releases.reduce(
    (total, release) =>
      total + release.assets.reduce((sum, asset) => sum + asset.downloads, 0),
    0,
  );

  return {
    stars: repo?.stargazers_count ?? communityStats.stars,
    forks: repo?.forks_count ?? communityStats.forks,
    watchers: repo?.subscribers_count ?? 0,
    openIssues: repo?.open_issues_count ?? 0,
    contributors: contributors.length || communityStats.contributors,
    downloads: releases.length > 0 ? downloads : communityStats.downloads,
    goodFirstIssues: goodFirstIssues?.length ?? 0,
    license: repo?.license?.spdx_id ?? "MIT",
    lastPushAt: repo?.pushed_at ?? null,
  };
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(
    value,
  );
}

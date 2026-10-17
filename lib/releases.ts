import { latestVersion } from "../constants/latestVersion";

export type ReleaseAsset = { name: string; url: string; size: number; downloads: number };
export type Release = {
  tag: string;
  name: string;
  url: string;
  publishedAt: string | null;
  prerelease: boolean;
  assets: ReleaseAsset[];
};
export type ApiRelease = {
  tag_name: string;
  name: string | null;
  html_url: string;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
  assets: { name: string; browser_download_url: string; size: number; download_count: number }[];
};

// Published v3 assets remain available when GitHub's API is rate limited or offline.
export const currentRelease: Release = {
  tag: latestVersion,
  name: `Soplang ${latestVersion}`,
  url: `https://github.com/soplang/soplang/releases/tag/${latestVersion}`,
  publishedAt: "2026-10-17T02:54:31Z",
  prerelease: false,
  assets: [
    ["SHA256SUMS", 471],
    ["soplang-3.0.0-linux-x86_64.tar.gz", 43552148],
    ["soplang-3.0.0-macos-arm64.tar.gz", 38563269],
    ["soplang-3.0.0-windows-AMD64.zip", 48635748],
    ["soplang-setup.exe", 30867375],
    ["soplang_3.0.0_amd64.deb", 32750436],
  ].map(([name, size]) => ({
    name: String(name), size: Number(size), downloads: 0,
    url: `https://github.com/soplang/soplang/releases/download/${latestVersion}/${name}`,
  })),
};

export function mapRelease(release: ApiRelease): Release {
  return {
    tag: release.tag_name,
    name: release.name || release.tag_name,
    url: release.html_url,
    publishedAt: release.published_at,
    prerelease: release.prerelease,
    assets: release.assets.map((asset) => ({
      name: asset.name, url: asset.browser_download_url,
      size: asset.size, downloads: asset.download_count,
    })),
  };
}

export function stableRelease(release: ApiRelease | null): Release {
  return release && !release.draft && !release.prerelease ? mapRelease(release) : currentRelease;
}

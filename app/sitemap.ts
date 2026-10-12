import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

const staticPages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/downloads", priority: 0.9, changeFrequency: "weekly" },
  { path: "/docs", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contribute", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contribute/security", priority: 0.4, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/trademarks", priority: 0.2, changeFrequency: "yearly" },
  { path: "/site-map", priority: 0.1, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const docs = source
    .getPages()
    .filter((page) => page.url !== "/docs")
    .map((page) => ({
      url: absoluteUrl(page.url),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...pages, ...docs];
}

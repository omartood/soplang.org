import { siteStructure } from "@/constants/sitemap";
import { source } from "@/lib/source";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page on the Soplang website, grouped by section.",
  alternates: { canonical: "/site-map" },
  openGraph: {
    title: "Sitemap",
    description: "Every page on the Soplang website, grouped by section.",
    url: "/site-map",
    images: "/og.png",
  },
};

const cleanName = (name: string) => name.replace(/ Home$/, "");

export default function SitemapPage() {
  const sections = [
    ...siteStructure
      .filter((section) => section.title !== "Docs")
      .map((section) => ({
        title: section.title,
        links: section.links.map((link) => ({ name: cleanName(link.name), href: link.href })),
      })),
    {
      title: "Documentation",
      links: source.getPages().map((page) => ({ name: page.data.title, href: page.url })),
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">Sitemap</p>
          <h1 className="type-title mt-5">Every page on the site</h1>
        </div>
      </section>
      <section className="section-tight pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {sections.map((section) => (
            <div key={section.title} className={section.title === "Documentation" ? "lg:col-span-2" : undefined}>
              <h2 className="text-sm font-bold text-ink">{section.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

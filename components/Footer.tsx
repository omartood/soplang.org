import { siteStructure } from "@/constants/sitemap";
import { getCurrentYear } from "@/lib/formatDate";
import Link from "next/link";
import { NavLogo } from "./Navbar";

const findSitemapLink = (sectionTitle: string, linkName: string) => {
  const section = siteStructure.find((s) => s.title === sectionTitle);
  return section?.links.find((l) => l.name === linkName);
};

const getSectionHome = (sectionTitle: string) => {
  const section = siteStructure.find((s) => s.title === sectionTitle);
  return section?.links.find(
    (l) => l.name.endsWith("Home") || l.name === sectionTitle,
  );
};

const footerLinks = [
  {
    title: "Learn",
    links: [
      { ...getSectionHome("Docs"), name: "Documentation" },
      findSitemapLink("Docs", "Getting Started with Soplang"),
      { ...getSectionHome("Downloads"), name: "Downloads" },
    ].filter(Boolean) as { name: string; href: string; target?: string }[],
  },
  {
    title: "Project",
    links: [
      {
        name: "GitHub",
        href: "https://github.com/soplang",
        target: "_blank",
      },
      { ...getSectionHome("Contribute"), name: "Contribute" },
      findSitemapLink("Contribute", "Security"),
      {
        name: "Somast",
        href: "https://www.somast.so/",
        target: "_blank",
      },
    ].filter(Boolean) as { name: string; href: string; target?: string }[],
  },
];

const legalLinks = [
  getSectionHome("Privacy"),
  getSectionHome("Terms"),
  getSectionHome("Trademarks"),
]
  .filter((link) => link !== undefined)
  .map((link) => ({ ...link, name: link.name.replace(/ Home$/, "") }));

export default function Footer() {
  const currentYear = getCurrentYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-2">
            <NavLogo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The first programming language with Somali syntax. Built so more
              people can learn and write software in their own language.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-bold text-ink">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                      {...(link.target
                        ? { target: link.target, rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Soplang. Created by{" "}
            <Link
              href="https://www.sharafdin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink hover:text-primary"
            >
              Sharafdin Yusuf
            </Link>
            . Developed and maintained by{" "}
            <Link
              href="https://www.somast.so/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink hover:text-primary"
            >
              Somast
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary">
                {link.name}
              </Link>
            ))}
            <span>Mogadishu, Somalia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

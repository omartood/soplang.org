import { JsonLd, ids } from "@/components/JsonLd";
import { absoluteUrl, CONTACT_EMAIL } from "@/lib/site";
import { Icon } from "@iconify/react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Soplang team at info@soplang.org with questions, feedback, or partnership requests.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description:
      "Contact the Soplang team at info@soplang.org with questions, feedback, or partnership requests.",
    url: "/contact",
    images: "/og.png",
  },
};

const channels = [
  {
    icon: "lucide:github",
    title: "GitHub",
    description: "Report bugs, request features, or contribute code.",
    link: "https://github.com/soplang",
  },
  {
    icon: "lucide:mail",
    title: "Email",
    description: "Direct support for partnerships and other inquiries.",
    link: "mailto:info@soplang.org",
  },
  {
    icon: "lucide:building-2",
    title: "Somast",
    description: "The team that develops and maintains Soplang.",
    link: "https://www.somast.so/",
  },
  {
    icon: "lucide:book-open",
    title: "Documentation",
    description: "Guides and references for the language.",
    link: "/docs",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface">
      <JsonLd
        data={{
          "@type": "ContactPage",
          url: absoluteUrl("/contact"),
          name: "Contact Soplang",
          isPartOf: { "@id": ids.website },
          mainEntity: {
            "@id": ids.maintainer,
            contactPoint: {
              "@type": "ContactPoint",
              email: CONTACT_EMAIL,
              contactType: "customer support",
              availableLanguage: ["English", "Somali"],
            },
          },
        }}
      />
      <section className="page-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="eyebrow">Contact</p>
          <h1 className="type-title mt-5">Get in touch</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Questions, feedback, or a partnership. Open an issue on GitHub for
            bugs and features, or email info@soplang.org for anything else.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 sm:grid-cols-2">
          {channels.map((channel) => (
            <a
              key={channel.title}
              href={channel.link}
              target={channel.link.startsWith("http") ? "_blank" : undefined}
              rel={channel.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="panel-sm block p-6 sm:p-7"
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon icon={channel.icon} className="h-[17px] w-[17px]" />
              </span>
              <h2 className="text-lg font-semibold text-ink">{channel.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {channel.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="panel p-8 sm:p-10">
            <p className="eyebrow">Response time</p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink/75">
              Email usually gets a reply within one or two business days.
              GitHub issues are answered by the maintainers and contributors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

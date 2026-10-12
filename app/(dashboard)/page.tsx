import { JsonLd, softwareSchema } from "@/components/JsonLd";
import { Faq } from "@/components/home/Faq";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { KeywordGlossary } from "@/components/home/KeywordGlossary";
import { Sponsors } from "@/components/home/Sponsors";
import { getLatestRelease } from "@/lib/github";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: "/og.png",
  },
};

const steps = [
  {
    title: "Install",
    body: "Download the installer for your system, or run Soplang with Docker.",
    command: "soplang --version",
    href: "/downloads",
    label: "Go to downloads",
  },
  {
    title: "Write",
    body: "Create a file that ends in .sop and write your first line.",
    command: 'qor("Salaan!")',
    href: "/docs/00_getting-started",
    label: "Read the guide",
  },
  {
    title: "Run",
    body: "Run the file from your terminal, or open the REPL to try ideas.",
    command: "soplang salaan.sop",
    href: "/docs/19_cli-and-repl",
    label: "CLI and REPL",
  },
];

export default async function Home() {
  const release = await getLatestRelease();

  return (
    <div className="min-h-screen bg-surface">
      <JsonLd data={softwareSchema(release.tag)} />
      <Hero />

      <Sponsors />

      <KeywordGlossary />

      <Features />

      <section className="section-tight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">Get started</p>
          <h2 className="type-section mt-3">From install to first program</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="panel-sm flex flex-col p-6 sm:p-7">
                <span className="font-mono text-sm font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                  {step.body}
                </p>
                <code className="mt-5 block overflow-x-auto rounded-xl bg-fd-card-foreground px-4 py-3 font-mono text-[13px] text-gray-200">
                  {step.command}
                </code>
                <Link
                  href={step.href}
                  className="mt-5 inline-flex text-sm font-bold text-primary hover:text-primary-hover"
                >
                  {step.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq />

      <section className="section-tight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <figure className="max-w-3xl">
            <blockquote className="text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
              &ldquo;Dhis software adigoo adeegsanaya afkaaga hooyo.&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-[15px] text-muted-foreground">
              Build software in your mother tongue.
            </figcaption>
          </figure>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/70">
            Soplang started in 2023 so that the first obstacle to learning
            code would be the idea, not the language it is written in.
          </p>
          <Link
            href="/about"
            className="mt-5 inline-flex text-sm font-bold text-primary hover:text-primary-hover"
          >
            Read our story
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-[2rem] bg-fd-card-foreground px-8 py-12 sm:px-12 sm:py-16">
            <h2 className="text-[clamp(1.75rem,1.5rem+1vw,2.25rem)] font-semibold leading-tight tracking-tight text-white">
              Ready to write your first line?
            </h2>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-gray-300">
              Install Soplang, open the guide, and run a program in Somali in
              a few minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/downloads" className="btn-primary">
                Install Soplang
              </Link>
              <Link
                href="/docs"
                className="btn-ghost-dark"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { JsonLd, breadcrumbSchema, ids } from "@/components/JsonLd";
import SoplangCodeWindow from "@/components/SoplangCodeWindow";
import { absoluteUrl } from "@/lib/site";
import { getLatestRelease } from "@/lib/github";
import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "About Soplang: History, Mission and Creator",
  description:
    "Why Soplang exists, who created it, and who maintains it. Soplang is the first Somali programming language, created by Sharafdin Yusuf and developed and maintained by Somast.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Soplang: History, Mission and Creator",
    description:
      "Why Soplang exists, who created it, and who maintains it. Soplang is the first Somali programming language, created by Sharafdin Yusuf and developed and maintained by Somast.",
    url: "/about",
    images: "/og.png",
  },
};

const exampleCode = `door qiimo = 150
door canshuur = 0.1
door wadarta = qiimo + (qiimo * canshuur)

haddii (wadarta > 100) {
    qor("Qiimaha wuu sareeyaa: " + wadarta)
} ugudambeyn {
    qor("Qiimuhu waa macquul: " + wadarta)
}`;

export const revalidate = 3600;

export default async function AboutPage() {
  const release = await getLatestRelease();
  const latestVersion = release.tag;

  const facts = [
    {
      title: "History",
      body: "Started in February 2023 and officially released in October 2023.",
    },
    {
      title: "Built with",
      body: "The v2.0.0 release runs on a Python interpreter. The next release is a compiler written in Rust, already on the main branch.",
    },
    {
      title: "Ecosystem",
      body: "Language, standard library, REPL, documentation, and a VS Code extension.",
    },
    {
      title: "Goal",
      body: "Digital inclusion, and a place for the Somali language in software.",
    },
  ];

  const details = [
    ["Name", "Soplang"],
    ["Stands for", "Somali Programming Language"],
    ["First release", "October 2023"],
    ["Current version", latestVersion],
    ["Syntax", "Somali keywords"],
    ["Created by", "Sharafdin Yusuf"],
    ["Maintained by", "Somast"],
    ["Home", "Somalia"],
  ];

  return (
    <div className="min-h-screen bg-surface">
      <JsonLd
        data={[
          {
            "@type": "AboutPage",
            url: absoluteUrl("/about"),
            name: "About Soplang",
            about: { "@id": ids.language },
            isPartOf: { "@id": ids.website },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <section className="page-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="eyebrow">The story of Soplang</p>
          <h1 className="type-title mt-5">
            Empowering Somalia with native technology
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-ink/75 sm:text-2xl">
            A Somali programming language designed to bring coding closer to
            Somali speakers and promote programming in the local language.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Created by{" "}
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
        </div>
      </section>

      <section className="section-tight">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="eyebrow">Our story</p>
          <h2 className="type-section mt-3">Why we started</h2>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink/70">
            <p>
              Programming lessons almost always arrive in another language
              first. Keywords, errors, and examples assume English, so the
              first obstacle is not the idea. It is the words.
            </p>
            <p>
              Soplang started in 2023 to remove that obstacle. Keywords such as
              door, qor, haddii, and hawl are Somali, so a learner can read a
              program the way they read a sentence. Error messages are in
              Somali too, and the docs are written around that syntax.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div className="panel p-8 sm:p-10">
            <p className="eyebrow">First of its kind</p>
            <h2 className="type-section mt-3">Somali syntax, from the first line</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
              Soplang is the first Somali programming language, created to make
              coding accessible to Somali speakers using native Somali syntax
              and keywords.
            </p>
          </div>
          <SoplangCodeWindow
            title="example.sop"
            code={exampleCode}
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-12">
          <div className="panel p-8 sm:p-10 lg:col-span-7">
            <p className="eyebrow">Our mission</p>
            <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
              Software you can write in Somali.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Dhis software adigoo adeegsanaya afkaaga hooyo. Every keyword,
              tutorial, and release is meant to make the next Somali speaker
              more at home in code.
            </p>
          </div>
          <div className="panel p-8 sm:p-10 lg:col-span-5">
            <p className="eyebrow">Language details</p>
            <dl className="mt-5 divide-y divide-line">
              {details.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="text-right text-sm font-bold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">At a glance</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.title} className="panel-sm p-6">
                <h3 className="text-lg font-semibold text-ink">{fact.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {fact.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="eyebrow">Coming soon</p>
          <h2 className="type-section mt-3">The future of Soplang</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/70">
            The next release replaces the interpreter with a compiler written
            in Rust: faster programs, standalone binaries, and type checks
            before your code runs. More of the language is being documented in
            Somali and English.
          </p>
        </div>
      </section>
    </div>
  );
}

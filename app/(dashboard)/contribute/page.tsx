import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import CodeWindow from "@/components/SoplangCodeWindow";
import { GITHUB_URL, formatCount, getContributors, getRepoStats } from "@/lib/github";
import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Help build Soplang, the open-source Somali programming language. Fix bugs in the Rust compiler, improve the docs, write examples, or proofread Somali text.",
  alternates: { canonical: "/contribute" },
  openGraph: {
    title: "Contribute to Soplang",
    description:
      "Code, documentation, examples and Somali proofreading: ways to help build the first Somali programming language.",
    url: "/contribute",
    images: "/og.png",
  },
};

const GOOD_FIRST_ISSUES_URL = `${GITHUB_URL}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`;

const ways = [
  {
    icon: "lucide:cpu",
    title: "Compiler",
    body: "Fix bugs and add features in the Rust compiler: the lexer, parser, type checker, and the Cranelift and LLVM backends.",
    href: GOOD_FIRST_ISSUES_URL,
    label: "Good first issues",
  },
  {
    icon: "lucide:book-open",
    title: "Documentation",
    body: "Correct examples, explain concepts more clearly, and add pages for parts of the language that are missing.",
    href: "https://github.com/soplang/soplang-site",
    label: "Website repository",
  },
  {
    icon: "lucide:languages",
    title: "Somali language",
    body: "Proofread Somali text in the docs and error messages, and suggest clearer words for keywords and terms.",
    href: `${GITHUB_URL}/issues/new`,
    label: "Suggest a change",
  },
  {
    icon: "lucide:bug",
    title: "Bug reports",
    body: "Found a program that behaves wrongly? Open an issue with the code, what you expected, and what happened.",
    href: `${GITHUB_URL}/issues/new`,
    label: "Open an issue",
  },
];

const workflow = [
  ["Fork and clone", "Fork soplang/soplang on GitHub, then clone your fork."],
  ["Create a branch", "Keep each change on its own branch, named after what it does."],
  ["Build and test", "Run cargo test and the pre-commit hooks before you commit."],
  ["Open a pull request", "Target the main branch and describe what changed and why."],
];

export default async function ContributePage() {
  const [stats, contributors] = await Promise.all([getRepoStats(), getContributors()]);

  const metrics = [
    { label: "GitHub stars", value: formatCount(stats.stars) },
    { label: "Forks", value: formatCount(stats.forks) },
    { label: "Contributors", value: formatCount(stats.contributors) },
    { label: "Downloads", value: formatCount(stats.downloads) },
    { label: "Open issues", value: formatCount(stats.openIssues) },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contribute", path: "/contribute" },
        ])}
      />
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">Open source · {stats.license} license</p>
          <h1 className="type-title mt-5 max-w-3xl">Help build Soplang</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Soplang is built in the open by students, teachers, and developers.
            Code, documentation, examples, and Somali proofreading all move the
            language forward.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`${GITHUB_URL}/blob/main/docs/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Read the contributing guide
            </a>
            <a href={GOOD_FIRST_ISSUES_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {stats.goodFirstIssues > 0
                ? `${stats.goodFirstIssues} good first issues`
                : "Browse open issues"}
            </a>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-label="Project statistics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((metric) => (
              <div key={metric.label} className="panel-sm p-6">
                <dt className="text-[13px] text-muted-foreground">{metric.label}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-ink">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[13px] text-muted-foreground">
            Live from GitHub, updated every hour.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">Ways to help</p>
          <h2 className="type-section mt-3">Pick what suits you</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {ways.map((way) => (
              <div key={way.title} className="panel-sm flex flex-col p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon icon={way.icon} className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{way.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/70">{way.body}</p>
                <a
                  href={way.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm font-bold text-primary hover:text-primary-hover"
                >
                  {way.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Development setup</p>
            <h2 className="type-section mt-3">Build it locally</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink/70">
              The compiler is written in Rust. Install the toolchain from{" "}
              <a href="https://rustup.rs/" className="font-semibold text-primary hover:text-primary-hover">
                rustup.rs
              </a>
              , or use the Docker setup if you would rather not install
              anything.
            </p>
            <ol className="mt-8 space-y-5">
              {workflow.map(([title, body], index) => (
                <li key={title} className="flex gap-4">
                  <span className="font-mono text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink/70">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <CodeWindow
              title="Local (Rust)"
              code={`git clone https://github.com/soplang/soplang.git
cd soplang

cargo build --release
cargo test

# Run a program, or open the REPL
make run FILE=examples/hello.sop
make shell`}
            />
            <CodeWindow
              title="Docker"
              code={`docker-compose build
docker-compose up -d

docker-compose exec soplang soplang -i
docker-compose exec soplang cargo test`}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">Contributors</p>
          <h2 className="type-section mt-3">
            {contributors.length} people have contributed
          </h2>
          <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {contributors.map((contributor) => (
              <li key={contributor.login}>
                <a
                  href={contributor.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center rounded-2xl p-3 text-center transition-colors hover:bg-surface2"
                >
                  <img
                    src={`${contributor.avatarUrl}&s=128`}
                    alt=""
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-16 w-16 rounded-full border border-line"
                  />
                  <span className="mt-2 w-full truncate text-[13px] font-semibold text-ink group-hover:text-primary">
                    {contributor.login}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    {contributor.contributions} {contributor.contributions === 1 ? "commit" : "commits"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight pb-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2">
          <div className="panel-sm p-7">
            <h2 className="text-lg font-semibold text-ink">Report a security issue</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
              Please do not open a public issue for a vulnerability. Email{" "}
              <a href="mailto:info@soplang.org" className="font-semibold text-primary hover:text-primary-hover">
                info@soplang.org
              </a>{" "}
              and read the{" "}
              <Link href="/contribute/security" className="font-semibold text-primary hover:text-primary-hover">
                security policy
              </Link>
              .
            </p>
          </div>
          <div className="panel-sm p-7">
            <h2 className="text-lg font-semibold text-ink">Code of conduct</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
              Be kind and patient, especially with people writing their first
              program. Read the{" "}
              <a
                href={`${GITHUB_URL}/blob/main/CODE_OF_CONDUCT.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary-hover"
              >
                code of conduct
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

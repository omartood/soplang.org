import { InstallTabs } from "@/components/downloads/InstallTabs";
import { JsonLd, breadcrumbSchema, softwareSchema } from "@/components/JsonLd";
import CodeWindow from "@/components/SoplangCodeWindow";
import { platforms } from "@/constants/installData";
import { GITHUB_URL, getLatestRelease, getReleases, type ReleaseAsset } from "@/lib/github";
import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Download for Windows, macOS and Linux",
  description:
    "Download Soplang, the first Somali programming language, for Windows, macOS or Linux, or install it from the command line with winget, Cargo or Docker.",
  alternates: { canonical: "/downloads" },
  openGraph: {
    title: "Download Soplang",
    description:
      "Install Soplang on Windows, macOS or Linux and start writing code in Somali.",
    url: "/downloads",
    images: "/og.png",
  },
};

function formatSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

function fileType(asset: ReleaseAsset): string {
  const match = asset.name.match(/\.(tar\.gz|[a-z0-9]+)$/i);
  return match ? `.${match[1]}` : asset.name;
}

export default async function DownloadsPage() {
  const [release, releases] = await Promise.all([getLatestRelease(), getReleases()]);

  return (
    <div className="min-h-screen bg-surface">
      <JsonLd
        data={[
          softwareSchema(release.tag),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Downloads", path: "/downloads" },
          ]),
        ]}
      />
      <section className="page-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">
            {release.tag} is the latest release
            {release.publishedAt && ` · ${formatDate(release.publishedAt)}`}
          </p>
          <h1 className="type-title mt-5 max-w-3xl">Install Soplang</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Download an installer for your system, or install from the command
            line. Every download comes from the official{" "}
            <a href={release.url} className="font-semibold text-primary hover:text-primary-hover">
              GitHub release
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="manual-download">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="manual-download" className="sr-only">
            Manual download
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {platforms.map((platform) => {
              const files = release.assets.filter((asset) => platform.assetPattern.test(asset.name));
              return (
                <div key={platform.id} className="panel flex flex-col p-7 sm:p-8">
                  <Icon icon={platform.icon} className="h-9 w-9 text-ink" aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
                    {platform.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {platform.requirements.join(" · ")}
                  </p>

                  <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
                    {files.length > 0 ? (
                      files.map((file) => (
                        <a key={file.url} href={file.url} className="btn-primary w-full">
                          <Icon icon="lucide:download" className="h-4 w-4" aria-hidden="true" />
                          Download {fileType(file)}
                          <span className="font-normal opacity-80">{formatSize(file.size)}</span>
                        </a>
                      ))
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed text-ink/70">
                          No {platform.name} installer in {release.tag} yet. Install
                          with Cargo or Docker instead.
                        </p>
                        <a href="#command-line" className="btn-ghost w-full">
                          <Icon icon="lucide:terminal" className="h-4 w-4" aria-hidden="true" />
                          Command-line install
                        </a>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            After installing, check it works:{" "}
            <code className="rounded-md bg-surface2 px-2 py-1 font-mono text-[13px] text-ink">
              soplang --version
            </code>
          </p>
        </div>
      </section>

      <section id="command-line" className="section scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">Command line</p>
          <h2 className="type-section mt-3">Install from the terminal</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            winget installs the stable release. Cargo builds the newest
            compiler from the main branch, which is what the docs describe.
          </p>
          <div className="mt-8">
            <InstallTabs />
          </div>
        </div>
      </section>

      {releases.length > 0 && (
        <section className="section-tight" aria-labelledby="release-history">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow">Releases</p>
            <h2 id="release-history" className="type-section mt-3">
              Release history
            </h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {releases.map((item) => (
                <li key={item.tag} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <span className="font-semibold text-ink">{item.name}</span>
                    {item.publishedAt && (
                      <span className="ml-3 text-sm text-muted-foreground">
                        {formatDate(item.publishedAt)}
                      </span>
                    )}
                  </div>
                  <a href={item.url} className="text-sm font-bold text-primary hover:text-primary-hover">
                    Release notes
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-tight pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Source</p>
            <h2 className="type-section mt-3">Build from source</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
              Soplang is open source under the MIT license. Clone the
              repository and build it with Cargo on any system.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View repository
              </a>
              <Link href="/docs/00_installation" className="btn-ghost">
                Installation guide
              </Link>
            </div>
          </div>
          <CodeWindow
            code={`git clone https://github.com/soplang/soplang.git
cd soplang
cargo build --release
./target/release/soplang --version`}
            title="Terminal"
          />
        </div>
      </section>
    </div>
  );
}

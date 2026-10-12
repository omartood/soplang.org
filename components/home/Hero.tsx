import { sample_codeSnippet } from "@/constants/codeSnippetData";
import { formatCount, getLatestRelease, getRepoStats, GITHUB_URL } from "@/lib/github";
import Link from "next/link";
import CodeWindow from "../SoplangCodeWindow";

export const Hero = async () => {
  const [release, stats] = await Promise.all([getLatestRelease(), getRepoStats()]);

  return (
    <section className="page-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{release.tag} is stable</p>
          <h1 className="type-title mt-5">
            The first Somali programming language
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Write programs with Somali keywords. Soplang is free and open
            source, built for students, teachers, and developers who think in
            Somali.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/downloads" className="btn-primary">
              Install Soplang
            </Link>
            <Link href="/docs/00_getting-started" className="btn-ghost">
              Write your first program
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            <a href={GITHUB_URL} className="font-semibold text-ink hover:text-primary">
              {formatCount(stats.stars)} stars on GitHub
            </a>
            {" · "}
            {formatCount(stats.contributors)} contributors · {stats.license} license
          </p>
        </div>
        <div className="min-w-0">
          <CodeWindow code={sample_codeSnippet} title="salaan.sop" />
          <div className="-mt-1 rounded-lg border border-line bg-surface2 px-4 py-3 font-mono text-[13px] text-ink/80">
            <span className="select-none text-muted-foreground">$ </span>
            soplang salaan.sop
            <div className="text-muted-foreground">Salaan, Adduunka!</div>
            <div className="text-muted-foreground">Salaan, Hodan!</div>
          </div>
        </div>
      </div>
    </section>
  );
};

import Link from "next/link";
import type { Metadata } from "next";

import CommonBadge from "@/components/CommonBadge";
import CodeWindow from "@/components/SoplangCodeWindow";
import { platforms } from "@/constants/downloadData";
import { packageManagers } from "@/constants/packageManagersData";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
  title: "Download Soplang - Install the Somali Programming Language",
  description:
    "Download Soplang, the first Somali programming language, for your preferred platform, or install it via your favorite package manager.",
  openGraph: {
    title: "Download Soplang",
    description:
      "Download Soplang for your operating system or install it via your favorite package manager to start coding in Somali.",
    images: "/og.png",
  },
};

export default function DownloadsPage() {
  return (
    <div className="min-h-screen pb-24 overflow-hidden bg-background transition-colors duration-300">
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
      </div>

      <div className="container-custom pt-10 md:pt-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <CommonBadge text="v2.0.0 is Now Stable" />

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Install <span className="text-gradient-primary">Soplang</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Get started with the first programming language designed for the
            Somali community. Choose your platform below.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="flex flex-wrap justify-center gap-8 mb-24 relative z-10 items-start">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`group relative p-8 rounded-2xl bg-card backdrop-blur-xl border border-border  transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-sm overflow-hidden w-full md:max-w-md`}
            >
              {/* Hover Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-muted/50 border border-border mb-6 group-hover:scale-110 transition-transform duration-300">
                  {platform.icon}
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {platform.name}
                </h3>
                <p className="text-muted-foreground mb-1">
                  {platform.version} • {platform.type}
                </p>
                <p className="text-xs text-muted-foreground/60 mb-8">
                  {platform.size}
                </p>

                <div className="w-full space-y-3">
                  {
                    platform.files && platform.files.length > 0 ?
                      platform.files.map((file: any, idx: number) => (
                        <Link
                          key={idx}
                          href={file.url}
                          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-primary hover:opacity-95 text-primary-foreground font-semibold transition-all shadow-lg shadow-primary/20"
                        >
                          <Icon icon="lucide:download" className="w-5 h-5" />
                          Download {file.extension}
                        </Link>
                      ))
                      // Fallback button if no files array (legacy or empty)
                    : <Link
                        href={platform.downloadUrl || "#"}
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-primary hover:opacity-95 text-primary-foreground font-semibold transition-all shadow-lg shadow-primary/20"
                      >
                        <Icon icon="lucide:download" className="w-5 h-5" />
                        Download
                      </Link>

                  }

                  <div className="flex flex-col gap-2 pt-6 border-t border-gray-100 dark:border-white/5">
                    {platform.requirements.map((req: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-muted-foreground"
                      >
                        <Icon
                          icon={req.icon}
                          className="w-4 h-4 mt-0.5 text-primary shrink-0"
                        />
                        <span>{req.text}</span>
                      </div>
                    ))}

                    {platform.instructions.map((inst: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-muted-foreground"
                      >
                        <Icon
                          icon="lucide:check"
                          className="w-4 h-4 mt-0.5 text-primary shrink-0"
                        />
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Ways to Download */}
        <div className="relative container-custom mx-auto mb-24 pb-24">
          {/* Gradient Border Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-primary opacity-50" />

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Other Ways to Download
            </h2>
            <p className="text-muted-foreground">
              Install via command line for quick setup.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {packageManagers.map((pm, idx) => (
              <div
                key={idx}
                className="w-full md:w-[calc(50%-1.5rem)] lg:max-w-2xl p-6 rounded-xl bg-card border border-border transition-all flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  {pm.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {pm.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{pm.desc}</p>
                  </div>
                </div>
                <div className="flex-grow flex flex-col">
                  <CodeWindow
                    code={pm.command}
                    title="Terminal"
                    className="h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Code CTA */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-card border border-border p-6 md:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-12 bg-primary/5 rounded-bl-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center md:justify-start gap-3">
                <Icon icon="lucide:github" className="w-8 h-8" />
                Open Source
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Soplang is built for the community. Contributing is simple and
                encouraged.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
                <a
                  href="https://github.com/soplang/soplang"
                  target="_blank"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View Repository{" "}
                  <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                </a>
                <a
                  href="/contribute"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contribution Guide
                </a>
              </div>
            </div>

            <div className="w-full md:w-[450px]">
              <CodeWindow
                code="git clone https://github.com/soplang/soplang.git"
                title="Terminal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

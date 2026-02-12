import { blog } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const page = blog.getPage([slug]);
  if (!page) notFound();

  const MDX = page.data.body;
  const date =
    page.data.date ?
      new Date(
        typeof page.data.date === "string" ? page.data.date : page.data.date,
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            ← Back to Blog
          </Link>

          <article>
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {page.data.title}
              </h1>
              {page.data.description && (
                <p className="text-lg text-muted-foreground mb-4">
                  {page.data.description}
                </p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {date && <span>{date}</span>}
                {page.data.author && (
                  <>
                    <span>·</span>
                    <span>By {page.data.author}</span>
                  </>
                )}
              </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <InlineTOC items={page.data.toc} />
              <MDX components={getMDXComponents()} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return blog
    .getPages()
    .filter((page) => page.slugs[0] != null)
    .map((page) => ({
      slug: page.slugs[0] as string,
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = blog.getPage([slug]);
  if (!page) notFound();

  return {
    title: `${page.data.title} | Soplang Blog`,
    description: page.data.description,
  };
}

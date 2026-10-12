import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";
import { JsonLd, breadcrumbSchema, ids } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { getPageImage, source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const gitConfig = {
    user: "soplang",
    repo: "soplang-site",
    branch: "main",
  };

  const articleSchema = {
    "@type": "TechArticle",
    headline: page.data.title,
    description: page.data.description,
    url: absoluteUrl(page.url),
    image: absoluteUrl(getPageImage(page).url),
    inLanguage: ["so", "en"],
    about: { "@id": ids.language },
    author: { "@id": ids.maintainer },
    publisher: { "@id": ids.maintainer },
    isPartOf: { "@id": ids.website },
  };
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Docs", path: "/docs" },
    ...(page.url === "/docs" ? [] : [{ name: page.data.title, path: page.url }]),
  ];

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <JsonLd data={[articleSchema, breadcrumbSchema(crumbs)]} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: page.url },
    openGraph: {
      type: "article",
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      images: getPageImage(page).url,
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: getPageImage(page).url,
    },
  };
}

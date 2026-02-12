import { type InferPageType, loader, multiple } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { blogPosts, docs } from "fumadocs-mdx:collections/server";

// Blog at /content - markdown posts from content/blog
export const blog = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogPosts, []),
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader(
  multiple({
    docs: docs.toFumadocsSource(),
  }),
  {
    baseUrl: "/docs",
    plugins: [lucideIconsPlugin()],
  },
);

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title}

   ${processed}`;
}

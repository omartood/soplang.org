import { blog } from "@/lib/source";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Soplang",
  description: "Blog posts and updates about Soplang",
};

export default function ContentPage() {
  const posts = blog.getPages();

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Articles and updates
          </p>
          <div className="grid gap-6">
            {posts.map((post) => {
              const date =
                post.data.date ?
                  new Date(
                    typeof post.data.date === "string" ?
                      post.data.date
                    : post.data.date,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : null;

              return (
                <Link
                  key={post.url}
                  href={post.url}
                  className="block p-6 rounded-xl border border-border bg-card hover:bg-card/80 hover:border-primary/30 transition-all duration-200 group"
                >
                  <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {post.data.title}
                  </h2>
                  {post.data.description && (
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {post.data.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {date && <span>{date}</span>}
                    {post.data.author && (
                      <>
                        <span>·</span>
                        <span>{post.data.author}</span>
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {posts.length === 0 && (
            <p className="text-muted-foreground">
              No posts yet.
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                /blog/
              </code>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

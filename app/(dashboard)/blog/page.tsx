import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Soplang",
  description:
    "Explore news, updates, and articles about Soplang, the first Somali programming language. Our blog is currently under development—check back soon!",
  openGraph: {
    title: "Blog - Soplang",
    description:
      "Stay up to date with news, stories, and updates from the Soplang community. The blog is under development—check back soon!",
    images: "/og.png",
  },
};

export default function BlogPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center bg-primary">
      <div className="size-[200px] rounded-2xl">
        <Image
          src={"/cat.jpg"}
          width={400}
          height={400}
          alt={"cat image"}
          className="w-full h-full aspect-square rounded-full"
        />
      </div>
      <h1 className="text-2xl font-semibold">Under Development</h1>
      <p className="text-muted-foreground max-w-md">
        The blog is currently being built. Check back soon!
      </p>
    </div>
  );
}

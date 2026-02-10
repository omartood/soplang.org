import Image from "next/image";

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

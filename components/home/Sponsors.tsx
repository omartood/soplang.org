import Image from "next/image";

export const Sponsors = () => {
  return (
    <section className="pb-4" aria-label="Supported by">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-line py-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.04em] text-muted-foreground">
            Supported by
          </p>
          <a href="https://www.somast.so/" className="rounded-md transition-opacity hover:opacity-75">
            <Image src="/sponsors/somast.svg" alt="Somast" width={248} height={64} className="h-8 w-auto" />
          </a>
          <a href="https://dugsiiye.com/" className="rounded-lg bg-[#0b1118] px-3 py-1 transition-opacity hover:opacity-85">
            <Image src="/sponsors/dugsiiye.webp" alt="Dugsiiye" width={224} height={80} className="h-14 w-auto" />
          </a>
          <a href="https://www.docker.com/" className="flex items-center gap-2 rounded-md font-semibold text-ink transition-opacity hover:opacity-75">
            <Image src="/sponsors/Docker.svg" alt="" width={32} height={32} />
            Docker
          </a>
        </div>
      </div>
    </section>
  );
};

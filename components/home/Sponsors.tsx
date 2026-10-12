export const Sponsors = () => {
  return (
    <section className="pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-line py-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.04em] text-muted-foreground">
            Supported by
          </p>
          <img src="/sponsors/Docker.svg" alt="Docker" className="h-8" />
        </div>
      </div>
    </section>
  );
};

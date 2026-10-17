import Link from "next/link";

const keywords = [
  ["qor", "print"],
  ["door", "variable"],
  ["hawl", "function"],
  ["celi", "return"],
  ["haddii", "if"],
  ["kale", "else"],
  ["intay", "while"],
  ["kuceli", "for"],
  ["qaab", "class"],
  ["cusub", "new"],
  ["tijaabi", "try"],
  ["qabo", "catch"],
  ["keen", "import"],
  ["run", "true"],
  ["been", "false"],
  ["maran", "null"],
];

export const KeywordGlossary = () => {
  return (
    <section className="section-tight">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="panel p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Ereybixin</p>
              <h2 className="type-section mt-3">Somali keywords, plain meaning</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Each keyword is an everyday Somali word. If you already know
                another language, this is the whole translation.
              </p>
              <Link
                href="/docs/14_keywords-reference"
                className="mt-6 inline-flex text-sm font-bold text-primary hover:text-primary-hover"
              >
                All keywords
              </Link>
            </div>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-8">
              {keywords.map(([somali, english]) => (
                <div
                  key={somali}
                  className="rounded-2xl border border-line bg-surface px-4 py-3"
                >
                  <dt className="font-mono text-[15px] font-semibold text-primary">
                    {somali}
                  </dt>
                  <dd className="mt-0.5 text-[13px] text-muted-foreground">
                    {english}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

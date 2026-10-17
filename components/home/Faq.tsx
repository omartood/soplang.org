const questions = [
  {
    question: "What is Soplang?",
    answer:
      "Soplang (Somali Programming Language) is a free, open-source programming language whose keywords are Somali words. qor prints to the screen, haddii means if, intay means while, and hawl defines a function. It supports both dynamic and static typing, classes and inheritance, modules, and error handling with tijaabi and qabo.",
  },
  {
    question: "Who created Soplang?",
    answer:
      "Soplang was created by Sharafdin Yusuf and first released in October 2023. It is developed and maintained by Somast, with help from open-source contributors on GitHub.",
  },
  {
    question: "Who is Soplang for?",
    answer:
      "Students, teachers, and developers who think in Somali. A beginner can read a Soplang program like a sentence before learning the English words most languages use, and error messages are written in Somali too.",
  },
  {
    question: "Is Soplang free?",
    answer:
      "Yes. Soplang is released under the MIT license, so you can use it for learning, teaching, and commercial work. The source code is on GitHub.",
  },
  {
    question: "Which systems does Soplang run on?",
    answer:
      "Soplang 3 has packages for Windows x64, macOS Apple Silicon, and Linux x86_64. A Linux amd64 Docker image includes the native build tools. See Downloads for system requirements.",
  },
  {
    question: "How do I write my first program?",
    answer:
      'Install Soplang, create a file called hello.sop containing qor("Salaan, Adduunka!"), and run soplang hello.sop in your terminal. The getting-started guide walks through each step.',
  },
];

export const Faq = () => {
  return (
    <section className="section-tight" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-heading" className="type-section mt-3">
          Questions about Soplang
        </h2>
        <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {questions.map((item) => (
            <div key={item.question}>
              <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export type TerminalLine = {
  kind: "command" | "output" | "error";
  text: string;
};

export type Feature = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  file: string;
  code?: string;
  terminal?: TerminalLine[];
};

export const features: Feature[] = [
  {
    eyebrow: "Readable",
    title: "Code that reads like Somali",
    description:
      "Keywords say what they do. A learner can follow a loop before learning the English word for it.",
    points: ["intay means while", "kuceli counts from one value to another", "qor prints to the screen"],
    file: "liisas.sop",
    code: `teed miro = ["moos", "liin", "canbe"]

kuceli (i 0 ilaa 2) {
    qor(i + ": " + miro[i])
}

door tiro = 3
intay (tiro > 0) {
    qor(tiro)
    tiro = tiro - 1
}`,
  },
  {
    eyebrow: "Dual typing",
    title: "Start dynamic, add types when they help",
    description:
      "Use door for quick scripts. Use abn, qoraal, or teed when you want explicit type checks at analysis time and runtime.",
    points: ["Typed parameters and return values", "Known type mismatches are caught before running", "--strict requires a type on every variable"],
    file: "noocyo.sop",
    code: `door magac = "Hodan"     // dynamic
abn da = 21              // static: abn

hawl laban(abn x): abn {
    celi x * 2
}

qor(laban(da))           // 42
qor(nooc(magac))         // qoraal`,
  },
  {
    eyebrow: "Object oriented",
    title: "Classes and inheritance",
    description:
      "qaab defines a class, cusub creates an instance, and dhaxal inherits from a parent class.",
    points: ["dhis is the constructor", "nafta refers to the current instance", "Child classes override parent methods"],
    file: "xayawaan.sop",
    code: `qaab Xayawaan {
    hawl dhis(magac) {
        nafta.magac = magac
    }
}

qaab Eey dhaxal Xayawaan {
    hawl cod() {
        celi nafta.magac + ": Waf!"
    }
}

door e = cusub Eey("Libaax")
qor(e.cod())             // Libaax: Waf!`,
  },
  {
    eyebrow: "Helpful errors",
    title: "Error messages in Somali",
    description:
      "Diagnostics name the source file, line and column, and point at the problem. Some also suggest a fix. Catch runtime errors with tijaabi and qabo.",
    points: ["Errors are written in Somali", "Each message shows the line it came from", "tijaabi and qabo work like try and catch"],
    file: "terminal",
    terminal: [
      { kind: "command", text: "soplang luqad.sop" },
      {
        kind: "error",
        text: "Khalad nooc: Ma bedeli kartid qiimaha doorsamaha madoor 'luqad' [E020] safka 2, tiirka 1",
      },
      { kind: "output", text: "     --> luqad.sop:2:1" },
      { kind: "output", text: `   2 │   luqad = "English"` },
      { kind: "output", text: "     │   ^^^^^" },
      {
        kind: "output",
        text: "     └─ Doorsamaha madoor ma beddeli karaan qiimahooda. Isticmaal 'door' haddii aad rabto mid beddeli kara.",
      },
    ],
  },
];

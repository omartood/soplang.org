import type { TerminalLine } from "@/constants/FeaturesData";

type TerminalWindowProps = {
  lines: TerminalLine[];
  title?: string;
};

const lineColor: Record<TerminalLine["kind"], string> = {
  command: "text-white",
  output: "text-gray-400",
  error: "text-red-300",
};

export function TerminalWindow({ lines, title = "terminal" }: TerminalWindowProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-fd-card-foreground shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-2" aria-hidden="true">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="font-mono text-xs text-gray-300">{title}</div>
        <div className="w-12" />
      </div>
      <pre className="whitespace-pre-wrap break-words px-5 pb-5 pt-2 font-mono text-[13px] leading-relaxed">
        {lines.map((line, index) => (
          <div key={index} className={lineColor[line.kind]}>
            {line.kind === "command" && (
              <span className="select-none text-primary">$ </span>
            )}
            {line.text}
          </div>
        ))}
      </pre>
    </div>
  );
}

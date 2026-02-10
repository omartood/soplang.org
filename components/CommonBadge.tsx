import { Icon } from "@iconify/react";

interface Props {
  text: string;
}

export default function CommonBadge({ text }: Props) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border  text-sm font-semibold text-primary shadow-[0_0_10px_rgba(var(--primary),0.1)] backdrop-blur-sm animate-fade-in-up">
      <Icon icon="streamline-sharp:star-2" className="w-4 h-4 text-primary" />
      <span className="text-primary">{text}</span>
    </div>
  );
}

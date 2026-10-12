interface Props {
  text: string;
}

export default function CommonBadge({ text }: Props) {
  return <p className="eyebrow">{text}</p>;
}

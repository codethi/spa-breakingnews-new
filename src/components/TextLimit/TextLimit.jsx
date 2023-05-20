export function TextLimit({ text, limit }) {
  const textLimited =
    text?.length > limit ? `${text.substring(0, limit)}...` : text;

  return <p>{textLimited}</p>;
}

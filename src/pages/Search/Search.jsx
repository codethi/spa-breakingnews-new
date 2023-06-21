import { useParams } from "react-router-dom";

export function Search() {
  const { title } = useParams();

  return <h1>{title}</h1>;
}

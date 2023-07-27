import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export function Profile() {
  const { user } = useContext(UserContext);
  return <h1>{user.name}</h1>;
}

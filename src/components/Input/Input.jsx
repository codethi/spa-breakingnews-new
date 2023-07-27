import { InputSpace } from "./InputStyled";

export function Input({ type, placeholder, name, register }) {
  return (
    <InputSpace type={type} placeholder={placeholder} {...register(name)} />
  );
}

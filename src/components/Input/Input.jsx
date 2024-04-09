import { useState } from "react";
import { InputSpace, TextareaSpace } from "./InputStyled";

export function Input({
  type,
  placeholder,
  name,
  register,
  isInput = true,
  value: initialValue,
}) {
  const [value, setValue] = useState(initialValue);
  let inputProps = {
    type,
    placeholder,
    ...register(name),
    onChange: (e) => setValue(e.target.value),
  };
  if (value) inputProps.value = value;

  return (
    <>
      {isInput ? (
        <InputSpace {...inputProps} />
      ) : (
        <TextareaSpace {...inputProps} />
      )}
    </>
  );
}

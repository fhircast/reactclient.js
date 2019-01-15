import React from "react";
import { useInput } from "../hooks";

export default function FormInput({
  name,
  type = "text",
  value,
  onChange,
  isReadOnly
}) {
  const input = useInput({
    initialValue: value,
    onChange
  });
  const nameNoDots = name.replace(".", "-");

  const inputClass = isReadOnly ? "form-control-plaintext" : "form-control";
  return (
    <div className="form-group">
      <label htmlFor={nameNoDots}>{name}</label>
      <input
        readOnly={isReadOnly}
        type={type}
        className={inputClass}
        id={nameNoDots}
        name={nameNoDots}
        value={input.value}
        onChange={input.onChange}
      />
    </div>
  );
}

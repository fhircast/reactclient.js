import React from "react";
import { useInput } from "../hooks";

export default function FormInput({ name, type = "text", value, onChange }) {
  const input = useInput(value, onChange);
  const nameNoDots = name.replace(".", "-");

  return (
    <div className="form-group">
      <label htmlFor={nameNoDots}>{name}</label>
      <input
        type={type}
        className="form-control"
        id={nameNoDots}
        name={nameNoDots}
        value={input.value}
        onChange={input.onChange}
      />
    </div>
  );
}

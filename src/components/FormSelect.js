import React from "react";
import ReactSelect from "react-select";
import { useSelect } from "../hooks";

export default function FormSelect({
  isMulti,
  name,
  options,
  value,
  onChange
}) {
  const select = useSelect({ initialValue: value, onChange });
  const nameNoDots = name.replace(".", "-");

  return (
    <div className="form-group row">
      <label className="col-4 col-form-label" htmlFor={nameNoDots}>
        {name}
      </label>
      <div className="col-8">
        <ReactSelect
          options={options}
          defaultValue={select.value}
          onChange={select.onChange}
          isMulti={isMulti}
          id={nameNoDots}
          name={nameNoDots}
        />
      </div>
    </div>
  );
}

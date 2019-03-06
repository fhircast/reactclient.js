import React from "react";
import PropTypes from "prop-types";
import { useInput } from "../../hooks";

function FormInput({ name, type = "text", value, onChange, isReadOnly }) {
  const input = useInput({
    initialValue: value,
    onChange
  });
  const nameNoDots = name.replace(".", "-");

  const inputClass = isReadOnly ? "form-control-plaintext" : "form-control";
  return (
    <div className="form-group row">
      <label className="col-3 col-form-label" htmlFor={nameNoDots}>
        {name}
      </label>
      <input
        readOnly={isReadOnly}
        type={type}
        className={`col-9 ${inputClass}`}
        id={nameNoDots}
        name={nameNoDots}
        value={input.value}
        onChange={input.onChange}
      />
    </div>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number"]),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool
};

export default FormInput;

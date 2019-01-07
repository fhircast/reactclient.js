import { useState } from "react";

export const useInput = (initial, onChangeCallback = null) => {
  const [value, setValue] = useState(initial);
  const onChange = e => {
    const value = e.target.value;
    setValue(value);

    if (onChangeCallback) {
      onChangeCallback(value);
    }
  };

  return {
    value,
    setValue,
    hasValue: value !== undefined && value !== null,
    onChange
  };
};

export const useSelect = (initial, onChangeCallback = null) => {
  const [value, setValue] = useState(initial);
  const onChange = value => {
    setValue(value);

    if (onChangeCallback) {
      onChangeCallback(value);
    }
  };

  return {
    value,
    setValue,
    onChange
  };
};

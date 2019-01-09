import { useState, useRef } from "react";

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

export const useInput = ({
  initialValue = "",
  onChange = null,
  isDeferred = false
} = {}) => {
  const [value, setValue] = useState(initialValue);
  const intervalRef = useRef();

  const notifyChange = (newValue, triggerTimer = false) => {
    if (!onChange) {
      return;
    }

    if (triggerTimer) {
      clearInterval(intervalRef.current);
      intervalRef.current = setTimeout(() => onChange(newValue), WAIT_INTERVAL);
    } else {
      onChange(newValue);
    }
  };

  const handleChange = e => {
    const newValue = e.target.value;
    setValue(newValue);
    notifyChange(newValue, isDeferred);
  };

  const handleKeyDown = e => {
    if (isDeferred && e.keyCode === ENTER_KEY) {
      notifyChange(value, false);
    }
  };

  return {
    value,
    setValue,
    hasValue: value !== undefined && value !== null,
    onChange: handleChange,
    onKeyDown: handleKeyDown
  };
};

export const useSelect = ({ initialValue, onChangeCallback = null } = {}) => {
  const [value, setValue] = useState(initialValue);
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

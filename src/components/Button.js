import React from "react";
import PropTypes from "prop-types";

function Button({
  className,
  text,
  isDisabled,
  isLoading,
  loadingText,
  onClick
} = {}) {
  const disabledClass = isDisabled ? "disabled" : "";
  return (
    <button
      className={`btn ${className} ${disabledClass}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="position-absolute">
            <div
              className="spinner-border spinner-border-sm mr-1"
              role="status"
            >
              <span className="sr-only">{loadingText}</span>
            </div>
          </div>
        </div>
      ) : null}
      <span>{text}</span>
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;

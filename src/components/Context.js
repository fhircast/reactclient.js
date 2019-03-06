import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import { hasContext } from "../utils";

const shouldNodeCollapse = ({ namespace }) => {
  return namespace.length > 3;
};

function Context({ context } = {}) {
  const alertType = hasContext(context) ? "alert-success" : "";
  return (
    <div className="fc-card">
      <div className="card">
        <div className={`card-header alert ${alertType}`}>
          <h5 className="d-inline">Context</h5>
        </div>
        <div className="card-body">
          <div className="overflow-auto">
            <ReactJson
              src={context}
              name={false}
              shouldCollapse={shouldNodeCollapse}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Context.propTypes = {
  context: PropTypes.array
}

export default Context;

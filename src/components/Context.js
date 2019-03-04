import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";

const shouldNodeCollapse = ({ namespace }) => {
  return namespace.length > 3;
};

function Context({ context } = {}) {
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">Context</h5>
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

import React from "react";
import PropTypes from "prop-types";
import ImageViewer from "./ImageViewer";

function Context({ context } = {}) {
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">Context</h5>
        <div className="card-body" >
          <ImageViewer />
        </div>
      </div>
    </div>
  );
}

export default Context;
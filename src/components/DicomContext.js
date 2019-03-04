import React from "react";
import PropTypes from "prop-types";
import DicomViewer from "./DicomViewer";

const shouldNodeCollapse = ({ namespace }) => {
  return namespace.length > 2;
};


function Context() {
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">DICOM Context</h5>
        <div className="card-body">
          <DicomViewer />
        </div>
      </div>
    </div>
  );
}

export default Context;

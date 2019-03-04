import React from "react";
import PropTypes from "prop-types";
import DicomViewer from "./DicomViewer";

const getDcmUrls = (context) => {
  return ["https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/bbmri-53323851.dcm"];
}

function Context({ context } = {}) {
  const urls = getDcmUrls(context);
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">DICOM Context</h5>
        <div className="card-body">
          <DicomViewer urls={urls} />
        </div>
      </div>
    </div>
  );
}

Context.propTypes = {
  context: PropTypes.object
}


export default Context;

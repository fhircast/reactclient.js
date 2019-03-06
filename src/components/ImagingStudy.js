import React from "react";
import PropTypes from "prop-types";
import DicomViewer from "./DicomViewer";
import { hasContext } from "../utils";

const getDcmUrls = context => {
  if (!hasContext(context)) {
    return [];
  }

  return [
    "https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/bbmri-53323851.dcm"
  ];
};


function ImagingStudy({ context } = {}) {
  const urls = getDcmUrls(context);
  const hasUrls = urls.length > 0;
  const alertType = hasUrls ? "alert-success" : "";

  return (
    <div className="fc-card">
      <div className="card">
        <div className={`card-header alert ${alertType}`}>
          <h5 className="d-inline">Imaging Study</h5>
        </div>
        <div className="card-body">
          {hasUrls ? <DicomViewer urls={urls} /> : null}
        </div>
      </div>
    </div>
  );
}

ImagingStudy.propTypes = {
  context: PropTypes.array
};

export default ImagingStudy;

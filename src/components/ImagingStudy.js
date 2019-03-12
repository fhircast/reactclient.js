import React from "react";
import PropTypes from "prop-types";
import DicomViewer from "./DicomViewer";
import { hasContext } from "../utils";

const getDcmUrls = imagingStudy => {
  if (!imagingStudy) {
    return [];
  }

  return [
    "https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/bbmri-53323851.dcm"
  ];
};

function ImagingStudy({ imagingStudy } = {}) {
  const urls = getDcmUrls(imagingStudy);
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
  imagingStudy: PropTypes.object
};

export default ImagingStudy;

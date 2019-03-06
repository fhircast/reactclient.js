import React from "react";
import PropTypes from "prop-types";
import DicomViewer from "./DicomViewer";

const getDcmUrls = (context) => {
  if (!isContext(context)) {
    return [];
  }

  return ["https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/bbmri-53323851.dcm"];
}

const isContext = ctx => Array.isArray(ctx) && ctx.length > 0;

function ImagingStudy({ context } = {}) {
  const urls = getDcmUrls(context);
  const hasUrls = urls.length > 0;
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">Imaging study</h5>
        <div className="card-body">
          {hasUrls ? <DicomViewer urls={urls} /> : null} 
        </div>
      </div>
    </div>
  );
}

ImagingStudy.propTypes = {
  context: PropTypes.array
}

export default ImagingStudy;

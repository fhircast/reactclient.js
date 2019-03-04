import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import "./DicomViewer.css";
import dwv from "dwv";

dwv.utils.decodeQuery = dwv.utils.base.decodeQuery;
dwv.gui.displayProgress = function() {};
dwv.gui.getElement = dwv.gui.base.getElement;
dwv.gui.refreshElement = dwv.gui.base.refreshElement;

// Image decoders (for web workers)
dwv.image.decoderScripts = {
  jpeg2000: "assets/dwv/decoders/pdfjs/decode-jpeg2000.js",
  "jpeg-lossless": "assets/dwv/decoders/rii-mango/decode-jpegloss.js",
  "jpeg-baseline": "assets/dwv/decoders/pdfjs/decode-jpegbaseline.js"
};

function useDwv() {
  const dwvRef = useRef(null);

  useEffect(() => {
    const app = new dwv.App();
    app.init({
      containerDivId: "dwv",
      isMobile: true
    });

    app.loadURLs([
      "https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/bbmri-53323851.dcm"
    ]);
  }, []);

  return dwvRef;
}

function DicomViewer() {
  useDwv();

  return (
    <div className="imageViewer">
      <div id="dwv">
        <div className="layerContainer">
          <canvas className="imageLayer" />
        </div>
      </div>
    </div>
  );
}

export default DicomViewer;

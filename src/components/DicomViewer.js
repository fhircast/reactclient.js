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

function useDwv(urls) {
  const dwvAppRef = useRef(new dwv.App());
  
  useEffect(() => {
    dwvAppRef.current.loadURLs(urls);
  }, [urls]);

  dwvAppRef.current.init({
    containerDivId: "dwv",
    isMobile: true
  });

  return dwvAppRef.current;
}

function DicomViewer({ urls } = {}) {
  useDwv(urls);

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

DicomViewer.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string)
}

export default DicomViewer;

import React from "react";
import ReactJson from "react-json-view";

function EventNotification({ id, eventType, context, closeToast }) {
  return (
    <div>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={closeToast}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div>
        <small>Received</small>
      </div>
      <strong>{eventType}</strong>
      <br />
      <small>{id}</small>
      <div className="overflow-auto">
        <ReactJson src={context} name={false} collapsed={true} />
      </div>
    </div>
  );
}

export default EventNotification;
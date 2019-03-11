import React from "react";
import ReactJson from "react-json-view";
import "./EventNotification.css";

function EventNotification({ id, timestamp, eventType, context, closeToast }) {
  return (
    <div className="eventNotification">
      <div className="eventNotification-header">
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={closeToast}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <span role="img" aria-label="fire">
          🔥
        </span>{" "}
        <strong>{eventType}</strong>
      </div>
      <div className="eventNotification-body">
        <small>
          {new Date(timestamp).toUTCString()}
        </small>
        <br/>
        <small>{id}</small>
        <div className="overflow-auto">
          <ReactJson src={context} name={false} collapsed={true} />
        </div>
      </div>
    </div>
  );
}

export default EventNotification;

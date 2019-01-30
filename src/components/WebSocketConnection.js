import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import ReceivedEvents from "./ReceivedEvents";
import PublishEvent from "./PublishEvent";
import { useFhircastWebSocket } from "../hooks";
import { WebSocketStatus } from "../types";
import { DEFAULT_WS_URL } from "../constants";

const STATUS_ALERT_TYPE = {
  [WebSocketStatus.Closed]: "",
  [WebSocketStatus.Opening]: "alert-info",
  [WebSocketStatus.Open]: "alert-info"
};

const STATUS_TEXT = {
  [WebSocketStatus.Closed]: "Closed",
  [WebSocketStatus.Opening]: "Opening...",
  [WebSocketStatus.Open]: "Waiting for confirmation..."
};

function StatusText({ status, isBound, endpoint }) {
  if (isBound) {
    return (
      <span>
        Bound to
        <br />
        <strong>{endpoint}</strong>
      </span>
    );
  }

  return <span>{STATUS_TEXT[status]}</span>;
}

function WebSocketConnection({ endpoint, connect }) {
  const [url, setUrl] = useState(DEFAULT_WS_URL);
  const [receivedEvents, setReceivedEvents] = useState([]);
  const { status, isBound, publishEvent } = useFhircastWebSocket({
    url,
    endpoint,
    connect,
    onEvent: evt => handleEvent(evt)
  });

  const handleEvent = eventMsg =>
    setReceivedEvents(prevEvents => [eventMsg, ...prevEvents]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const alertType = isBound ? "alert-success" : STATUS_ALERT_TYPE[status];
  return (
    <div>
      <div className="fc-card">
        <div className="card">
          <div className={`card-header alert ${alertType} mb-0`}>
            <h5 className="d-inline">WebSocket</h5>
            <small className="d-inline float-right">
              <StatusText
                status={status}
                isBound={isBound}
                endpoint={endpoint}
              />
            </small>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <FormInput
                name="URL"
                value={url}
                onChange={setUrl}
                isReadOnly={isBound}
              />
            </form>
          </div>
        </div>
      </div>
      <ReceivedEvents events={receivedEvents} />
      <PublishEvent isPublishAllowed={isBound} onPublishEvent={publishEvent} />
    </div>
  );
}

WebSocketConnection.propTypes = {
  endpoint: PropTypes.string.isRequired,
  connect: PropTypes.bool.isRequired
};

export default WebSocketConnection;

import React, { useState } from "react";
import FormInput from "./FormInput";
import Events from "./Events";
import { useFhircastWebsocket } from "../hooks";
import { WebsocketStatus } from "../types";
import { DEFAULT_WS_URL } from "../constants";

const STATUS_ALERT_TYPE = {
  [WebsocketStatus.Closed]: "",
  [WebsocketStatus.Opening]: "alert-info",
  [WebsocketStatus.Open]: "alert-info"
};

const STATUS_TEXT = {
  [WebsocketStatus.Closed]: "Closed",
  [WebsocketStatus.Opening]: "Opening...",
  [WebsocketStatus.Open]: "Waiting for confirmation..."
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

export default function WebsocketConnection({ endpoint, connect }) {
  const [url, setUrl] = useState(DEFAULT_WS_URL);
  const [receivedEvents, setReceivedEvents] = useState([]);
  const { status, isBound, publishEvent } = useFhircastWebsocket({
    url,
    endpoint,
    connect,
    onEvent: evt => handleEvent(evt)
  });

  const handleEvent = evt =>
    setReceivedEvents(prevEvents => [evt, ...prevEvents]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handlePublishEvent = () =>
    publishEvent({
      "hub.topic": "DrXRay",
      "hub.event": "open-patient-chart",
      context: []
    });

  const alertType = isBound ? "alert-success" : STATUS_ALERT_TYPE[status];
  return (
    <div>
      <div className="fc-card">
        <div className="card mb-4">
          <div className={`card-header alert ${alertType} mb-0`}>
            <h5 className="d-inline">Websocket</h5>
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
      <Events
        received={receivedEvents}
        onPublishEvent={handlePublishEvent}
        isPublishAllowed={isBound}
      />
    </div>
  );
}

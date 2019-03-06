import React from "react";
import PublishEvent from "./PublishEvent";
import { WebSocketStatus } from "../types";

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

function StatusText({ status, isBound, topic }) {
  // if (isBound) {
  console.warn("Fix WebSocketConnection StatusText");
  if (topic) {  
    return (
      <span>
        Bound to
        <br />
        <strong>{topic}</strong>
      </span>
    );
  }

  return <span>{STATUS_TEXT[status]}</span>;
}

function WebSocketConnection({ websocket, topic }) {
  const { status, isBound, publishEvent } = websocket;
  
  // const alertType = isBound ? "alert-success" : STATUS_ALERT_TYPE[status];
  console.warn("Fix WebSocketConnection alert type");
  const alertType = topic ? "alert-success" : STATUS_ALERT_TYPE[status];
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
                topic={topic}
              />
            </small>
          </div>
          <div className="card-body">
          
          </div>
        </div>
      </div>
      <PublishEvent topic={topic} isPublishAllowed={isBound} onPublishEvent={publishEvent} />
    </div>
  );
}

export default WebSocketConnection;

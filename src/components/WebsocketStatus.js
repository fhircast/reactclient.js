import React from "react";
import { useFhircastWebsocket } from "../hooks";
import { WebsocketStatus } from "../types";

const STATUS_BG_COLORS = {
  [WebsocketStatus.Closed]: "bg-dark",
  [WebsocketStatus.Opening]: "bg-info",
  [WebsocketStatus.Open]: "bg-info"
};

export default function WebsocketStatusComponent({
  websocketUrl,
  endpoint,
  connect,
  onEvent,
  onBind,
  onUnbind
}) {
  const { status, isBound, publishEvent } = useFhircastWebsocket({
    url: websocketUrl,
    endpoint,
    connect,
    onEvent,
    onBind,
    onUnbind
  });

  const handleClick = () =>
    publishEvent({
      "hub.topic": "DrXRay",
      "hub.event": "open-patient-chart",
      context: []
    });

  const getBgColor = () => {
    if (isBound) {
      return "bg-success";
    }

    console.log(status, STATUS_BG_COLORS[status]);
    return STATUS_BG_COLORS[status];
  };

  const bgColor = getBgColor();
  return (
    <div className="fc-card">
      <div className={`card text-white ${bgColor} h-100`}>
        <div className="card-header">Websocket</div>
        <div className="card-body">
          <button className="btn btn-primary" onClick={handleClick}>
            Publish event
          </button>
        </div>
      </div>
    </div>
  );
}

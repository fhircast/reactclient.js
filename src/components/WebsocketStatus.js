import React, { useState, useEffect } from "react";
import uuid from "uuid";

const Status = {
  NotConnected: "NotConnected",
  Connecting: "Connecting",
  Connected: "Connected"
};

const STATUS_BG_COLORS = {
  [Status.NotConnected]: "bg-dark",
  [Status.Connecting]: "bg-info",
  [Status.Connected]: "bg-success"
};

let ws = null;

const openWebsocket = ({
  url,
  setStatus,
  onEvent,
  onConnect,
  onDisconnect
}) => {
  if (ws) {
    closeWebsocket();
  }

  setStatus(Status.Connecting);

  ws = new WebSocket(url);
  ws.onopen = e => {
    console.log("websocket is connected ...", e);
  };

  ws.onmessage = e => {
    console.log("websocket message ...", e);
    const data = JSON.parse(e.data);
    if (data.bound) {
      setStatus(Status.Connected);
      if (onConnect) {
        onConnect(url);
      }
      return;
    }

    if (onEvent) {
      onEvent(data.event);
    }
  };

  ws.onclose = e => {
    console.log("websocket is closed ...", e);
    setStatus(Status.NotConnected);
    if (onDisconnect) {
      onDisconnect();
    }
  };
};

const closeWebsocket = ({ setStatus }) => {
  if (!ws) {
    return;
  }

  ws.close();
  ws = null;
  setStatus(Status.NotConnected);
};

const publishEvent = () => {
  if (!ws) {
    return;
  }

  const msg = {
    timestamp: new Date().toJSON(),
    id: uuid.v4(),
    event: {
      "hub.topic": "DrXRay",
      "hub.event": "open-patient-chart",
      context: []
    }
  };
  ws.send(JSON.stringify(msg));
};

export default function WebsocketStatus({
  websocketUrl,
  endpoint,
  connect,
  onEvent,
  onConnect,
  onDisconnect
}) {
  const [status, setStatus] = useState(Status.NotConnected);

  useEffect(
    () => {
      if (connect) {
        openWebsocket({
          url: `${websocketUrl}/${endpoint}`,
          setStatus,
          onEvent,
          onConnect,
          onDisconnect
        });
      } else {
        closeWebsocket({ setStatus });
      }

      return () => closeWebsocket({ setStatus });
    },
    [endpoint, connect]
  );

  const getStatusText = () => {
    if (status === Status.Connected) {
      return (
        <span>
          <strong>Connected to</strong>
          <br />
          {endpoint}
        </span>
      );
    }

    return status === Status.Connecting ? "Connecting..." : "Not connected";
  };

  const handleClick = () => publishEvent();

  const bgColor = STATUS_BG_COLORS[status];
  return (
    <div className="fc-card">
      <div className={`card text-white ${bgColor} h-100`}>
        <div className="card-header">Websocket</div>
        <div className="card-body">
          <p>{getStatusText()}</p>
          <button className="btn btn-primary" onClick={handleClick}>
            Publish event
          </button>
        </div>
      </div>
    </div>
  );
}

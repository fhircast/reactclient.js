import React, { useState } from "react";
import uuid from "uuid";
import "./App.css";
import WebsocketConnection from "./components/WebsocketConnection";
import Subscriptions from "./components/Subscriptions";

export default function App() {
  const [connectWebsocket, setConnectWebsocket] = useState(false);
  const [wsEndpoint, setWsEndpoint] = useState(uuid.v4());

  const handleSubscriptionsChange = subs => {
    const emptySubs = subs.length === 0;
    if (emptySubs) {
      setWsEndpoint(uuid.v4());
    }
    setConnectWebsocket(!emptySubs);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md">
          <Subscriptions
            wsEndpoint={wsEndpoint}
            onSubscriptionsChange={handleSubscriptionsChange}
          />
        </div>
        <div className="col-md">
          <WebsocketConnection
            endpoint={wsEndpoint}
            connect={connectWebsocket}
          />
        </div>
      </div>
    </div>
  );
}

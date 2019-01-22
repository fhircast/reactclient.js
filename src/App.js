import React, { useState } from "react";
import uuid from "uuid";
import "./App.css";
import Header from "./components/Header";
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
    <div>
      <Header />
      <div className="container-fluid mx-auto w-100 cover-container">
        <div className="row">
          <div className="col-lg mx-auto">
            <Subscriptions
              wsEndpoint={wsEndpoint}
              onSubscriptionsChange={handleSubscriptionsChange}
            />
          </div>
          <div className="col-lg mx-auto">
            <WebsocketConnection
              endpoint={wsEndpoint}
              connect={connectWebsocket}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Sticky from "react-sticky-fill";
import uuid from "uuid";
import "./App.css";
import Header from "./components/Header";
import WebSocketConnection from "./components/WebSocketConnection";
import Subscriptions from "./components/Subscriptions";
import Context from "./components/Context";
import DicomContext from "./components/DicomContext";

export default function App() {
  const [connectWebSocket, setConnectWebSocket] = useState(false);
  const [wsEndpoint, setWsEndpoint] = useState(uuid.v4());

  const handleSubscriptionsChange = subs => {
    const emptySubs = subs.length === 0;
    if (emptySubs) {
      setWsEndpoint(uuid.v4());
    }
    setConnectWebSocket(!emptySubs);
  };

  return (
    <div>
      <Sticky>
        <Header />
      </Sticky>
      <div className="container-fluid mx-auto w-100 cover-container">
        <div className="row">
          <div className="col-lg mx-auto">
            <Context />
            <DicomContext />
            <Subscriptions
              wsEndpoint={wsEndpoint}
              onSubscriptionsChange={handleSubscriptionsChange}
            />
          </div>
          <div className="col-lg mx-auto">
            <WebSocketConnection
              endpoint={wsEndpoint}
              connect={connectWebSocket}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

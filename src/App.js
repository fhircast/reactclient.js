import React, { useState } from "react";
import uuid from "uuid";
import "./App.css";
import WebsocketConnection from "./components/WebsocketConnection";
import Subscriptions from "./components/Subscriptions";

const WS_ENDPOINT = uuid.v4();

export default function App() {
  const [hasSubcriptions, setHasSubcriptions] = useState(false);

  const handleSubscriptionsChange = subs => setHasSubcriptions(subs.length > 0);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md top-buffer">
          <Subscriptions
            wsEndpoint={WS_ENDPOINT}
            onSubscriptionsChange={handleSubscriptionsChange}
          />
        </div>
        <div className="col-md top-buffer">
          <WebsocketConnection
            endpoint={WS_ENDPOINT}
            connect={hasSubcriptions}
          />
        </div>
      </div>
    </div>
  );
}

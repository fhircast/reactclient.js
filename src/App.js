import React, { useState } from "react";
import uuid from "uuid";
import "./App.css";
import Urls from "./components/Urls";
import Subscriptions from "./components/Subscriptions";
import Events from "./components/Events";
import WebsocketStatus from "./components/WebsocketStatus";

const WS_URL = "ws://localhost:3000/bind";

const WS_ENDPOINT = uuid.v4();

export default function App() {
  const [wsUrl, setWsUrl] = useState(WS_URL);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [events, setEvents] = useState([]);

  const handleEvent = evt => {
    setEvents(prevEvents => [evt, ...prevEvents]);
  };

  const handleWsBound = () => {
    setIsWsConnected(true);
  };

  const handleWsUnbound = () => {
    setIsWsConnected(false);
    setEvents([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md top-buffer">
          <Urls
            websocketUrl={wsUrl}
            onWebsocketUrlChange={setWsUrl}
            isReadOnly={isWsConnected}
          />
        </div>
        <div className="col-md top-buffer">
          <Subscriptions wsEndpoint={WS_ENDPOINT} />
        </div>
        <div className="col-md top-buffer">
          <Events subs={[]} received={events} />
        </div>
        <div className="col-md top-buffer">
          <WebsocketStatus
            websocketUrl={wsUrl}
            endpoint={WS_ENDPOINT}
            connect={false}
            onEvent={evt => handleEvent(evt)}
            onBound={handleWsBound}
            onUnbound={handleWsUnbound}
          />
        </div>
      </div>
    </div>
  );
}

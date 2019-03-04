import React, { useState } from "react";
import Sticky from "react-sticky-fill";
import uuid from "uuid";
import "./App.css";
import Header from "./components/Header";
import WebSocketConnection from "./components/WebSocketConnection";
import Subscriptions from "./components/Subscriptions";
import Context from "./components/Context";
import DicomContext from "./components/DicomContext";
import Topic from "./components/Topic";

import { DEFAULT_HUB_URL, DEFAULT_CONTEXT } from "./constants";

export default function App() {
  const [connectWebSocket, setConnectWebSocket] = useState(false);
  const [wsEndpoint, setWsEndpoint] = useState(uuid.v4());
  const [context /*setContext*/] = useState(DEFAULT_CONTEXT);
  const [hubUrl, setHubUrl] = useState(DEFAULT_HUB_URL);
  const [topic, setTopic] = useState(null);

  const handleSubscriptionsChange = subs => {
    const emptySubs = subs.length === 0;
    if (emptySubs) {
      setWsEndpoint(uuid.v4());
    }
    setConnectWebSocket(!emptySubs);
  };

  const handleTopicChange = newTopic => {
    setTopic(newTopic);
  };

  return (
    <div>
      <Sticky>
        <Header />
      </Sticky>
      <div className="container-fluid mx-auto w-100 cover-container">
        <div className="row">
          <div className="col-lg mx-auto">
            <Topic
              hubUrl={hubUrl}
              topic={topic}
              onHubUrlChange={setHubUrl}
              onTopicChange={handleTopicChange}
            />
            <Context context={context} />
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

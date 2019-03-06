import React, { useState } from "react";
import Sticky from "react-sticky-fill";
import "./App.css";
import Header from "./components/Header";
import WebSocketConnection from "./components/WebSocketConnection";
import Context from "./components/Context";
import ImagingStudy from "./components/ImagingStudy";
import Topic from "./components/Topic";

import { useFhircastWebSocket } from "./hooks";
import {
  DEFAULT_HUB_URL,
  DEFAULT_CONTEXT,
  EMPTY_CONTEXT,
  EVENT_TYPES
} from "./constants";
import { SubscriptionMode } from "./types";
import { createSubscriptionJson } from "./utils";

export default function App() {
  const [hubUrl, setHubUrl] = useState(DEFAULT_HUB_URL);
  const [secret, setSecret] = useState("EF25A906-1C48-4E87-AC1F-0E483666AAEEB");
  const [topic, setTopic] = useState(null);
  const [isTopicLoading, setIsLoadingTopic] = useState(false);
  const [context, setContext] = useState(EMPTY_CONTEXT);
  const [subcribedEvents, setSubscribedEvents] = useState([]);

  const websocket = useFhircastWebSocket({
    hubUrl,
    topic,
    onEvent: evt => {}
  });

  const handleTopicRequested = async (username, secret) => {
    await updateTopic();
    await subscribeToEvents();
    await establishWebSocketConnection();
    await updateContext();
  };

  const updateTopic = async () => {
    setIsLoadingTopic(true);

    // TODO: fetch from hub
    const newTopic = "1A3DF21C-1451-4DC5-8B59-3F824D3A7ED7";
    setTopic(newTopic);

    setIsLoadingTopic(false);
    return true;
  };

  const subscribeToEvents = async () => {
    const subJson = createSubscriptionJson({
      topic,
      secret,
      eventTypes: EVENT_TYPES,
      mode: SubscriptionMode.subscribe
    });
    // TODO: POST to hub
    setSubscribedEvents(EVENT_TYPES);
  };

  const establishWebSocketConnection = async () => {
    // TODO: use the actual websocket
    // websocket.open();
  };

  const updateContext = async () => {
    // TODO: fetch from hub
    setContext(DEFAULT_CONTEXT);
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
              secret={secret}
              topic={topic}
              isLoading={isTopicLoading}
              subscribedEvents={subcribedEvents}
              onHubUrlChange={setHubUrl}
              onSecretChange={setSecret}
              onTopicRequested={handleTopicRequested}
            />
            <ImagingStudy context={context} />
            <Context context={context} />
          </div>
          <div className="col-lg mx-auto">
            <WebSocketConnection websocket={websocket} topic={topic} />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Sticky from "react-sticky-fill";
import uuid from "uuid";
import "./App.css";
import Header from "./components/Header";
import WebSocketConnection from "./components/WebSocketConnection";
import Context from "./components/Context";
import DicomContext from "./components/DicomContext";
import Topic from "./components/Topic";

import { DEFAULT_HUB_URL, DEFAULT_CONTEXT, EMPTY_CONTEXT } from "./constants";
import { SubscriptionMode, EventType } from "./types";
import { createSubscriptionJson } from "./utils";

const EVENT_TYPES = [
  EventType.OpenImagingStudy,
  EventType.SwitchImagingStudy,
  EventType.CloseImagingStudy,
  EventType.LogoutUser
];

export default function App() {
  const [connectWebSocket, setConnectWebSocket] = useState(false);
  const [wsEndpoint, setWsEndpoint] = useState(uuid.v4());
  const [context, setContext] = useState(EMPTY_CONTEXT);
  const [hubUrl, setHubUrl] = useState(DEFAULT_HUB_URL);
  const [secret, setSecret] = useState("EF25A906-1C48-4E87-AC1F-0E483666AAEEB");
  const [topic, setTopic] = useState(null);
  const [isTopicLoading, setIsLoadingTopic] = useState(false);
  const [subcribedEvents, setSubscribedEvents] = useState([]);
  const [receivedEvents, setReceivedEvents] = useState([]);

  // const handleSubscriptionsChange = subs => {
  //   const emptySubs = subs.length === 0;
  //   if (emptySubs) {
  //     setWsEndpoint(uuid.v4());
  //   }
  //   setConnectWebSocket(!emptySubs);
  // };

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
    // TODO
  };

  const updateContext = async () => {
    // TODO
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
            <Context context={context} />
            <DicomContext context={context} />
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

import React, { useState } from "react";
import Sticky from "react-sticky-fill";
import uuid from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import PublishEventCard from "./components/PublishEventCard";
import Context from "./components/Context";
import ImagingStudy from "./components/ImagingStudy";
import Topic from "./components/Topic";
import EventNotification from "./components/EventNotification";

import { useFhircastWebSocket } from "./hooks";
import { DEFAULT_HUB_URL, EMPTY_CONTEXT, EVENT_TYPES } from "./constants";
import { EventParams, EventType } from "./types";
import { findResourceFromContext, /*createSubscriptionJson*/ } from "./utils";

export default function App() {
  const [hubUrl, setHubUrl] = useState(DEFAULT_HUB_URL);
  const [secret, setSecret] = useState("EF25A906-1C48-4E87-AC1F-0E483666AAEEB");
  const [topic, setTopic] = useState(null);
  const [isTopicLoading, setIsLoadingTopic] = useState(false);
  const [context, setContext] = useState(EMPTY_CONTEXT);
  const [subcribedEvents, setSubscribedEvents] = useState([]);
  const [sentEventId, setSentEventId] = useState();

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

  const handlePublishEvent = evt => {
    const ctx = evt.context || [];
    setContext(ctx);

    const eventType = evt[EventParams.Event];
    if (eventType === EventType.LogoutUser) {
      setTopic(null);
      setSubscribedEvents([]);
      setSentEventId();
    }

    //websocket.publishEvent(evt);
    const eventId = uuid.v4();
    const timestamp = new Date().toJSON();
    setSentEventId(eventId);

    toast(
      <EventNotification
        id={eventId}
        timestamp={timestamp}
        eventType={eventType}
        context={ctx}
      />,
      {
        className: "eventNotificationWrapper alert",
        bodyClassName: "w-100",
        position: toast.POSITION.TOP_RIGHT,
        closeButton: false,
      }
    );
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
    // const subJson = createSubscriptionJson({
    //   topic,
    //   secret,
    //   eventTypes: EVENT_TYPES,
    //   mode: SubscriptionMode.subscribe
    // });
    // TODO: POST to hub
    setSubscribedEvents(EVENT_TYPES);
  };

  const establishWebSocketConnection = async () => {
    // TODO: use the actual websocket
    // websocket.open();
  };

  const updateContext = async () => {
    // TODO: fetch from hub
    setContext(EMPTY_CONTEXT);
  };

  const imagingStudy = findResourceFromContext("study", context);

  return (
    <div>
      <Sticky>
        <Header />
      </Sticky>
      <ToastContainer
        draggable={false}
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={false}
      />
      <div className="container-fluid mx-auto w-100 cover-container">
        <div className="row">
          <div className="col-lg mx-auto">
            <Topic
              hubUrl={hubUrl}
              secret={secret}
              topic={topic}
              isLoading={isTopicLoading}
              subscribedEvents={subcribedEvents}
              websocketStatus={websocket.status}
              onHubUrlChange={setHubUrl}
              onSecretChange={setSecret}
              onTopicRequested={handleTopicRequested}
            />
            <PublishEventCard
              status={websocket.status}
              isBound={websocket.isBound}
              topic={topic}
              sentEventId={sentEventId}
              onPublishEvent={handlePublishEvent}
            />
          </div>
          <div className="col-lg mx-auto">
            <ImagingStudy imagingStudy={imagingStudy} />
            <Context context={context} />
          </div>
        </div>
      </div>
    </div>
  );
}

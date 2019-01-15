import React, { useState } from "react";
import uuid from "uuid";
import "./App.css";
import Urls from "./components/Urls";
import Subscription from "./components/Subscription";
import SubList from "./components/SubList";
import WebsocketStatus from "./components/WebsocketStatus";
import Events from "./components/Events";

const HUB_URL = "http://localhost:3000/api/hub";
const CLIENT_URL = "http://localhost:3000/client";
const WS_URL = "ws://localhost:3000/bind";

const WS_ENDPOINT = uuid.v4();

export default function App() {
  const [hubUrl, setHubUrl] = useState(HUB_URL);
  const [clientUrl, setClientUrl] = useState(CLIENT_URL);
  const [subscriptions, setSubscriptions] = useState({});
  const [wsUrl, setWsUrl] = useState(WS_URL);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [events, setEvents] = useState([]);

  const getSubKey = ({ hubUrl, clientUrl, topic }) =>
    hubUrl + clientUrl + topic;

  const handleSub = sub => {
    setSubscriptions({ ...subscriptions, [getSubKey(sub)]: sub });
  };

  const handleUnsub = sub => {
    const subKey = getSubKey(sub);
    const { [subKey]: foundSub, ...restSubs } = subscriptions;
    if (!foundSub) {
      return;
    }

    const remainingEvents = foundSub.events.filter(
      e => !sub.events.includes(e)
    );

    if (remainingEvents.length === 0) {
      setSubscriptions(restSubs);
      return;
    }

    const newSub = {
      ...foundSub,
      events: remainingEvents
    };
    setSubscriptions({
      ...subscriptions,
      [subKey]: newSub
    });
  };

  const handleEvent = evt => {
    setEvents([evt, ...events]);
  };

  const handleWsConnect = () => {
    setIsWsConnected(true);
  };

  const handleWsDisconnect = () => {
    setIsWsConnected(false);
    setEvents([]);
  };

  const hasSubscriptions = () => {
    return Object.keys(subscriptions).length > 0;
  };

  const getSubArray = () => {
    return Object.values(subscriptions).filter(sub => Boolean(sub));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md">
          <Urls
            hubUrl={hubUrl}
            onHubUrlChange={setHubUrl}
            clientUrl={clientUrl}
            onClientUrlChange={setClientUrl}
            websocketUrl={wsUrl}
            onWebsocketUrlChange={setWsUrl}
            isReadOnly={isWsConnected}
          />
        </div>
        <div className="col-md">
          <Subscription
            hubUrl={hubUrl}
            clientUrl={clientUrl}
            wsEndpoint={WS_ENDPOINT}
            onSubscribe={handleSub}
            onUnsubscribe={handleUnsub}
          />
        </div>
        <div className="col-md">
          <SubList subs={getSubArray()} />
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <WebsocketStatus
            websocketUrl={wsUrl}
            endpoint={WS_ENDPOINT}
            connect={hasSubscriptions()}
            onEvent={evt => handleEvent(evt)}
            onConnect={handleWsConnect}
            onDisconnect={handleWsDisconnect}
          />
        </div>
        <div className="col-md">
          <Events events={events} />
        </div>
        <div className="col-md" />
      </div>
    </div>
  );
}

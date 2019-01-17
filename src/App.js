import React, { useState } from "react";
import uuid from "uuid";
import "./App.css";
import Urls from "./components/Urls";
import Subscription from "./components/Subscription";
import SubList from "./components/SubList";
import WebsocketStatus from "./components/WebsocketStatus";
import Events from "./components/Events";

const WS_URL = "ws://localhost:3000/bind";

const WS_ENDPOINT = uuid.v4();

export default function App() {
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
    setEvents(prevEvents => [evt, ...prevEvents]);
  };

  const handleWsBound = () => {
    setIsWsConnected(true);
  };

  const handleWsUnbound = () => {
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
          <Subscription
            wsEndpoint={WS_ENDPOINT}
            areUrlsReadOnly={hasSubscriptions()}
            onSubscribe={handleSub}
            onUnsubscribe={handleUnsub}
          />
        </div>
        <div className="col-md top-buffer">
          <SubList subs={getSubArray()} />
        </div>
        <div className="col-md top-buffer">
          <WebsocketStatus
            websocketUrl={wsUrl}
            endpoint={WS_ENDPOINT}
            connect={hasSubscriptions()}
            onEvent={evt => handleEvent(evt)}
            onBound={handleWsBound}
            onUnbound={handleWsUnbound}
          />
        </div>
        <div className="col-md top-buffer">
          <Events events={events} />
        </div>
        <div className="col-md top-buffer" />
      </div>
    </div>
  );
}

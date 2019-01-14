import React, { useState } from "react";
import "./App.css";
import Urls from "./components/Urls";
import Subscription from "./components/Subscription";
import SubList from "./components/SubList";

const HUB_URL = "http://localhost:3000/api/hub";
const CLIENT_URL = "http://localhost:3000/client";

export default function App() {
  const [hubUrl, setHubUrl] = useState(HUB_URL);
  const [clientUrl, setClientUrl] = useState(CLIENT_URL);
  const [subscriptions, setSubscriptions] = useState({});

  const getSubKey = ({ hubUrl, clientUrl, topic }) =>
    hubUrl + clientUrl + topic;

  const handleSub = sub => {
    setSubscriptions({ ...subscriptions, [getSubKey(sub)]: sub });
  };

  const handleUnsub = sub => {
    const subKey = getSubKey(sub);
    const foundSub = subscriptions[subKey];
    if (!foundSub) {
      return;
    }

    const remainingEvents = foundSub.events.filter(
      e => !sub.events.includes(e)
    );
    const newSub =
      remainingEvents.length === 0
        ? null
        : {
            ...foundSub,
            events: remainingEvents
          };
    setSubscriptions({
      ...subscriptions,
      [subKey]: newSub
    });
  };

  const getSubArray = () => {
    return Object.values(subscriptions).filter(sub => Boolean(sub));
  };

  return (
    <div className="container">
      <Urls
        hubUrl={hubUrl}
        onHubUrlChange={hubUrl => setHubUrl(hubUrl)}
        clientUrl={clientUrl}
        onClientUrlChange={clientUrl => setClientUrl(clientUrl)}
      />
      <Subscription
        hubUrl={hubUrl}
        clientUrl={clientUrl}
        onSubscribe={handleSub}
        onUnsubscribe={handleUnsub}
      />
      <SubList subs={getSubArray()} />
    </div>
  );
}

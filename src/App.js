import React, { useState } from "react";
import "./App.css";
import Urls from "./components/Urls";
import Subscription from "./components/Subscription";
import SubList from "./components/SubList";

const HUB_URL = "http://localhost:3000/api/hub";
const CLIENT_URL = "http://localhost:3000/client";

const initialState = {
  hubUrl: HUB_URL,
  clientUrl: CLIENT_URL,
  subscriptions: {}
};

export default function App() {
  const [state, setState] = useState(initialState);

  const getSubKey = ({ hubUrl, clientUrl, topic }) =>
    hubUrl + clientUrl + topic;

  const handleSub = sub => {
    const subscriptions = {
      ...state.subscriptions,
      [getSubKey(sub)]: sub
    };
    setState({ ...state, subscriptions });
  };

  const handleUnsub = sub => {
    const subKey = getSubKey(sub);
    const foundSub = state.subscriptions[subKey];
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
    const subscriptions = {
      ...state.subscriptions,
      [subKey]: newSub
    };
    setState({ ...state, subscriptions });
  };

  const getSubArray = () => {
    return Object.values(state.subscriptions).filter(sub => Boolean(sub));
  };

  return (
    <div className="container">
      <Urls
        hubUrl={state.hubUrl}
        onHubUrlChange={hubUrl =>
          setState({
            ...state,
            hubUrl
          })
        }
        clientUrl={state.clientUrl}
        onClientUrlChange={clientUrl =>
          setState({
            ...state,
            clientUrl
          })
        }
      />
      <Subscription
        hubUrl={state.hubUrl}
        clientUrl={state.clientUrl}
        onSubscribe={handleSub}
        onUnsubscribe={handleUnsub}
      />
      <SubList subs={getSubArray()} />
    </div>
  );
}

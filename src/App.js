import React, { useState, useEffect } from "react";
import "./App.css";
import HubSelector from "./components/Hub";
import Subscription from "./components/Subscription";

const HUB_URL = "http://localhost:3000";
const HUB_ENDPOINT = "/api/hub/";

const initialState = {
  hubUrl: HUB_URL,
  hubEndpoint: HUB_ENDPOINT
};

export default function App() {
  const [state, setState] = useState(initialState);
  useEffect(() => {});

  const handleHubUrlChange = hubUrl =>
    setState({
      hubUrl,
      ...state
    });

  const handleHubEndpointChange = hubEndpoint =>
    setState({
      hubEndpoint,
      ...state
    });

  return (
    <div className="app">
      <HubSelector
        url={HUB_URL}
        endpoint={HUB_ENDPOINT}
        onUrlChange={handleHubUrlChange}
        onEndpointChange={handleHubEndpointChange}
      />
      <Subscription url={HUB_URL + HUB_ENDPOINT} />
    </div>
  );
}

import React, { useState } from "react";
import "./App.css";
import HubSelector from "./components/HubSelector";

const HUB_URL = "http://localhost:3006";
const HUB_ENDPOINT = "/api/hub/";

const initialState = {
  hubUrl: "",
  hubEndpoint: ""
};

export default function App() {
  const [state, setState] = useState(initialState);

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
    </div>
  );
}

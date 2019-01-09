import React, { useState } from "react";
import "./App.css";
import HubSelector from "./components/Hub";
import Subscription from "./components/Subscription";

const HUB_URL = "http://localhost:3000/api/hub";

const initialState = {
  hubUrl: HUB_URL
};

export default function App() {
  const [state, setState] = useState(initialState);

  const handleHubUrlChange = hubUrl => {
    setState({
      ...state,
      hubUrl
    });
  };

  return (
    <div className="app">
      <HubSelector url={state.hubUrl} onUrlChange={handleHubUrlChange} />
      <Subscription url={state.hubUrl} />
    </div>
  );
}

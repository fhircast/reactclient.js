import React, { useState, useEffect } from "react";
import "./App.css";
import HubSelector from "./components/Hub";
import Subscription from "./components/Subscription";

const HUB_URL = "http://localhost:3000/api/hub/";

const initialState = {
  hubUrl: HUB_URL
};

export default function App() {
  const [state, setState] = useState(initialState);
  useEffect(() => {});

  const handleHubUrlChange = hubUrl => {
    console.log(hubUrl);
    setState({
      hubUrl,
      ...state
    });
  };

  return (
    <div className="app">
      <HubSelector url={HUB_URL} onUrlChange={handleHubUrlChange} />
      <Subscription url={HUB_URL} />
    </div>
  );
}

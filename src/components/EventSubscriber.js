import React, { useState } from "react";
import Input from "./Input";

const initialState = {
  callback: "http://localhost:3000/client",
  mode: "subscribe",
  events: "open-patient-chart",
  secret: "secret",
  topic: "DrXRay",
  lease: 999,
  channelType: "websocket",
  channelEndPoint: ""
};

export default function EventSubscriber() {
  const [state, setState] = useState(initialState);

  return (
    <div className="event-subscription">
      <div className="card">
        <div className="card-header">Subscribe to an event</div>
        <div className="card-body">
          <form>
            <Input
              name="hub.callback"
              value={state.callback}
              onChange={callback => setState({ ...state, callback })}
            />
            <Input
              name="hub.mode"
              value={state.mode}
              onChange={mode => setState({ ...state, mode })}
            />
            <Input
              name="hub.events"
              value={state.events}
              onChange={events => setState({ ...state, events })}
            />
            <Input
              name="hub.secret"
              value={state.secret}
              onChange={secret => setState({ ...state, secret })}
            />
            <Input
              name="hub.topic"
              value={state.topic}
              onChange={topic => setState({ ...state, topic })}
            />
            <Input
              name="hub.channel.type"
              value={state.channelType}
              onChange={channelType => setState({ ...state, channelType })}
            />
            <Input
              name="hub.channel.endpoint"
              value={state.channelEndPoint}
              onChange={channelEndPoint =>
                setState({ ...state, channelEndPoint })
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
}

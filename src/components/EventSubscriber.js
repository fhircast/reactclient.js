import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

const INITIAL_STATE = {
  callback: "http://localhost:3000/client",
  mode: "subscribe",
  events: ["open-patient-chart"],
  secret: "secret",
  topic: "DrXRay",
  lease: 999,
  channelType: "websocket",
  channelEndPoint: ""
};

const MODES = [
  { value: "subscribe", label: "subscribe" },
  { value: "unsubscribe", label: "unsubscribe" }
];

const EVENTS = [
  { value: "open-patient-chart", label: "open-patient-chart" },
  { value: "switch-patient-chart", label: "switch-patient-chart" },
  { value: "close-patient-chart", label: "close-patient-chart" },
  { value: "open-imaging-study", label: "open-imaging-study" },
  { value: "switch-imaging-study", label: "switch-imaging-study" },
  { value: "close-imaging-study", label: "close-imaging-study" },
  { value: "logout-user", label: "logout-user" },
  { value: "hibernate-user", label: "hibernate-user" }
];

export default function EventSubscriber() {
  const [state, setState] = useState(INITIAL_STATE);

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
            <Select
              name="hub.mode"
              isMulti={false}
              options={MODES}
              value={MODES[0]}
              onChange={({ value }) => setState({ ...state, mode: value })}
            />
            <Select
              name="hub.events"
              isMulti={true}
              options={EVENTS}
              value={[EVENTS[0]]}
              onChange={options =>
                setState({ ...state, events: options.map(o => o.value) })
              }
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

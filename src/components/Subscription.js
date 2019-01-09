import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { sendSubscription } from "../services/fhircast";

const SubscriptionParams = {
  callback: "hub.callback",
  mode: "hub.mode",
  events: "hub.events",
  secret: "hub.secret",
  topic: "hub.topic",
  lease: "hub.lease",
  channelType: "channel.type",
  channelEndpoint: "channel.endpoint"
};

const INITIAL_STATE = {
  subscription: {
    [SubscriptionParams.callback]: "http://localhost:3000/client",
    [SubscriptionParams.events]: ["open-patient-chart"],
    [SubscriptionParams.secret]: "secret",
    [SubscriptionParams.topic]: "DrXRay",
    [SubscriptionParams.lease]: 999,
    [SubscriptionParams.channelType]: "websocket",
    [SubscriptionParams.channelEndpoint]: ""
  },
  response: undefined
};

const SubscriptionMode = {
  subscribe: "subscribe",
  unsubscribe: "unsubscribe"
};

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

const SubscriptionInput = ({ param, state, setState }) => {
  return (
    <FormInput
      name={param}
      value={state[param]}
      onChange={value => setState({ ...state, [param]: value })}
    />
  );
};

const SubscriptionStatus = ({ response }) => {
  if (response === undefined) {
    return null;
  }

  const wasSuccessful =
    response && response.status >= 200 && response.status < 300;
  const alertType = wasSuccessful ? "alert-success" : "alert-danger";
  const alertText = wasSuccessful ? response.statusText : "Error";
  return <small className={`alert ${alertType}`}>{alertText}</small>;
};

export default function Subscription(props) {
  const [state, setState] = useState(INITIAL_STATE);
  const { url } = props;

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleSubscribe = async mode => {
    const { subscription } = state;
    const response = await sendSubscription(url, {
      ...subscription,
      [SubscriptionParams.mode]: mode
    });
    setState({ ...state, response });
  };

  return (
    <div className="event-subscription">
      <div className="card">
        <div className="card-header">Subscribe to an event</div>
        <div className="card-body">
          <div className="my-4">
            <form onSubmit={handleSubmit}>
              <SubscriptionInput
                param={SubscriptionParams.callback}
                state={state}
                setState={setState}
              />
              <FormSelect
                name={SubscriptionParams.events}
                isMulti={true}
                options={EVENTS}
                value={[EVENTS[0]]}
                onChange={options =>
                  setState({ ...state, events: options.map(o => o.value) })
                }
              />
              <SubscriptionInput
                param={SubscriptionParams.secret}
                state={state}
                setState={setState}
              />
              <SubscriptionInput
                param={SubscriptionParams.topic}
                state={state}
                setState={setState}
              />
              <SubscriptionInput
                param={SubscriptionParams.channelType}
                state={state}
                setState={setState}
              />
              <SubscriptionInput
                param={SubscriptionParams.channelEndpoint}
                state={state}
                setState={setState}
              />
              <button
                className="btn btn-primary mr-1"
                onClick={() => handleSubscribe(SubscriptionMode.subscribe)}
              >
                Subscribe
              </button>
              <button
                className="btn btn-secondary mr-1"
                onClick={() => handleSubscribe(SubscriptionMode.unsubscribe)}
              >
                Unsubscribe
              </button>
            </form>
          </div>
          <SubscriptionStatus response={state.response} />
        </div>
      </div>
    </div>
  );
}

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

const SubscriptionMode = {
  subscribe: "subscribe",
  unsubscribe: "unsubscribe"
};

const EventType = {
  OpenPatientChart: "open-patient-chart",
  SwitchPatientChart: "switch-patient-chart",
  ClosePatientChart: "close-patient-chart",
  OpenImagingStudy: "open-imaging-study",
  SwitchImagingStudy: "switch-imaging-study",
  CloseImagingStudy: "close-imaging-study",
  LogoutUser: "logout-user",
  HibernateUser: "hibernate-user"
};

const INITIAL_STATE = {
  subscription: {
    [SubscriptionParams.callback]: "http://localhost:3000/client",
    [SubscriptionParams.events]: [
      EventType.OpenPatientChart,
      EventType.ClosePatientChart
    ],
    [SubscriptionParams.secret]: "secret",
    [SubscriptionParams.topic]: "DrXRay",
    [SubscriptionParams.lease]: 999,
    [SubscriptionParams.channelType]: "websocket",
    [SubscriptionParams.channelEndpoint]: ""
  },
  response: undefined
};

const SubscriptionInput = ({ param, sub, setState: setSub }) => {
  return (
    <FormInput
      name={param}
      value={sub[param]}
      onChange={value => setSub({ ...sub, [param]: value })}
    />
  );
};

const SubscriptionStatus = ({ response }) => {
  if (response === undefined) {
    return null;
  }

  const wasSuccessful = isSuccess(response);
  const alertType = wasSuccessful ? "alert-success" : "alert-danger";
  const alertText = wasSuccessful ? response.statusText : "Error";
  return <small className={`alert ${alertType}`}>{alertText}</small>;
};

const isSuccess = response =>
  response && response.status >= 200 && response.status < 300;

export default function Subscription(props) {
  const [sub, setSub] = useState(INITIAL_STATE.subscription);
  const [response, setResponse] = useState(INITIAL_STATE.response);
  const { url, onSubscribe, onUnsubscribe } = props;

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleSubscribe = async mode => {
    const newResponse = await sendSubscription(url, {
      ...sub,
      [SubscriptionParams.mode]: mode
    });

    setResponse(newResponse);

    if (isSuccess(newResponse)) {
      const callback =
        mode === SubscriptionMode.subscribe ? onSubscribe : onUnsubscribe;
      callback({
        hubUrl: url,
        callback: sub[SubscriptionParams.callback],
        topic: sub[SubscriptionParams.topic],
        events: sub[SubscriptionParams.events]
      });
    }
  };

  const toSelectOptions = values => values.map(v => ({ value: v, label: v }));

  return (
    <div className="event-subscription">
      <div className="card">
        <div className="card-header">Subscribe to an event</div>
        <div className="card-body">
          <div className="my-4">
            <form onSubmit={handleSubmit}>
              <SubscriptionInput
                param={SubscriptionParams.callback}
                sub={sub}
                setSub={setSub}
              />
              <FormSelect
                name={SubscriptionParams.events}
                isMulti={true}
                options={toSelectOptions(Object.values(EventType))}
                value={toSelectOptions(sub[SubscriptionParams.events])}
                onChange={options =>
                  setSub({
                    ...sub,
                    [SubscriptionParams.events]: options.map(o => o.value)
                  })
                }
              />
              <SubscriptionInput
                param={SubscriptionParams.secret}
                sub={sub}
                setSub={setSub}
              />
              <SubscriptionInput
                param={SubscriptionParams.topic}
                sub={sub}
                setSub={setSub}
              />
              <SubscriptionInput
                param={SubscriptionParams.channelType}
                sub={sub}
                setSub={setSub}
              />
              <SubscriptionInput
                param={SubscriptionParams.channelEndpoint}
                sub={sub}
                setSub={setSub}
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
          <SubscriptionStatus response={response} />
        </div>
      </div>
    </div>
  );
}

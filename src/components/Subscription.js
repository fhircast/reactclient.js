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
  channelType: "hub.channel.type",
  channelEndpoint: "hub.channel.endpoint"
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

const INITIAL_SUB = {
  [SubscriptionParams.events]: [
    EventType.OpenPatientChart,
    EventType.ClosePatientChart
  ],
  [SubscriptionParams.secret]: "secret",
  [SubscriptionParams.topic]: "DrXRay",
  [SubscriptionParams.lease]: 999,
  [SubscriptionParams.channelType]: "websocket"
};

const isSuccess = response =>
  response && response.status >= 200 && response.status < 300;

const SubscriptionStatus = ({ response }) => {
  if (response === undefined) {
    return null;
  }

  const wasSuccessful = isSuccess(response);
  const alertType = wasSuccessful ? "alert-success" : "alert-danger";
  const alertText = response ? response.statusText : "Network Error";
  return <small className={`d-block alert ${alertType}`}>{alertText}</small>;
};

export default function Subscription(props) {
  const [sub, setSub] = useState(INITIAL_SUB);
  const [response, setResponse] = useState(undefined);
  const { hubUrl, clientUrl, wsEndpoint, onSubscribe, onUnsubscribe } = props;

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleSubscribe = async mode => {
    const newResponse = await sendSubscription(hubUrl, {
      ...sub,
      [SubscriptionParams.callback]: clientUrl,
      [SubscriptionParams.mode]: mode,
      [SubscriptionParams.channelEndpoint]: wsEndpoint
    });

    setResponse(newResponse);

    if (isSuccess(newResponse)) {
      const callback =
        mode === SubscriptionMode.subscribe ? onSubscribe : onUnsubscribe;
      callback({
        hubUrl,
        clientUrl,
        topic: sub[SubscriptionParams.topic],
        events: sub[SubscriptionParams.events]
      });
    }
  };

  const toSelectOptions = values => values.map(v => ({ value: v, label: v }));

  return (
    <div className="event-subscription">
      <div className="card">
        <div className="card-header">Subscribe to events</div>
        <div className="card-body">
          <div className="mb-3">
            <form onSubmit={handleSubmit}>
              <FormInput
                name="Topic"
                value={sub[SubscriptionParams.topic]}
                onChange={value =>
                  setSub({ ...sub, [SubscriptionParams.topic]: value })
                }
              />
              <FormSelect
                name="Events"
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

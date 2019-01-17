import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { sendSubscription } from "../services/fhircast";
import { SubscriptionParams, SubscriptionMode, EventType } from "../types";
import {
  DEFAULT_HUB_URL,
  DEFAULT_CLIENT_URL,
  DEFAULT_SECRET,
  DEFAULT_TOPIC,
  DEFAULT_LEASE,
  WEBSOCKET_CHANNEL_TYPE
} from "../constants";

const INITIAL_SUB = {
  [SubscriptionParams.events]: [
    EventType.OpenPatientChart,
    EventType.ClosePatientChart
  ],
  [SubscriptionParams.secret]: DEFAULT_SECRET,
  [SubscriptionParams.topic]: DEFAULT_TOPIC,
  [SubscriptionParams.lease]: DEFAULT_LEASE,
  [SubscriptionParams.channelType]: WEBSOCKET_CHANNEL_TYPE
};

const isSuccess = response =>
  response && response.status >= 200 && response.status < 300;

export default function Subscription(props) {
  const [sub, setSub] = useState(INITIAL_SUB);
  const [hubUrl, setHubUrl] = useState(DEFAULT_HUB_URL);
  const [clientUrl, setClientUrl] = useState(DEFAULT_CLIENT_URL);
  const { wsEndpoint, areUrlsReadOnly, onSubscribe, onUnsubscribe } = props;

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
    <div className="fc-card">
      <div className="card">
        <div className="card-header">Subscribe</div>
        <div className="card-body">
          <div className="mb-3">
            <form onSubmit={handleSubmit}>
              <FormInput
                name="Hub URL"
                value={hubUrl}
                onChange={setHubUrl}
                isReadOnly={areUrlsReadOnly}
              />
              <FormInput
                name="Client URL"
                value={clientUrl}
                onChange={setClientUrl}
                isReadOnly={areUrlsReadOnly}
              />
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
              <div className="float-right">
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

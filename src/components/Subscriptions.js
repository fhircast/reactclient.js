import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import SubscriptionList from "./SubscriptionList";
import { sendSubscription } from "../services/fhircast";
import { toSelectOptions } from "../utils";
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

export default function Subscriptions({ wsEndpoint, onSubscriptionsChange }) {
  const [subscription, setSubscription] = useState(INITIAL_SUB);
  const [hubUrl, setHubUrl] = useState(DEFAULT_HUB_URL);
  const [clientUrl, setClientUrl] = useState(DEFAULT_CLIENT_URL);
  const [subscriptions, setSubscriptions] = useState({});

  const handleSubmit = e => e.preventDefault();

  const handleSubscribe = async mode => {
    const response = await sendSubscription(hubUrl, {
      ...subscription,
      [SubscriptionParams.callback]: clientUrl,
      [SubscriptionParams.mode]: mode,
      [SubscriptionParams.channelEndpoint]: wsEndpoint
    });

    const isSuccess =
      response && response.status >= 200 && response.status < 300;
    if (!isSuccess) {
      return;
    }

    const handleFunc =
      mode === SubscriptionMode.subscribe ? replaceSub : removeSubEvents;
    const newSubs = handleFunc({
      hubUrl,
      clientUrl,
      topic: subscription[SubscriptionParams.topic],
      events: subscription[SubscriptionParams.events]
    });

    if (onSubscriptionsChange && newSubs) {
      onSubscriptionsChange(Object.values(newSubs));
    }
  };

  const getSubKey = ({ hubUrl, clientUrl, topic }) =>
    hubUrl + clientUrl + topic;

  const replaceSub = sub => {
    const subs = { ...subscriptions, [getSubKey(sub)]: sub };
    setSubscriptions(subs);
    return subs;
  };

  const removeSubEvents = sub => {
    const subKey = getSubKey(sub);
    const { [subKey]: foundSub, ...restSubs } = subscriptions;
    if (!foundSub) {
      return;
    }

    const remainingEvents = foundSub.events.filter(
      e => !sub.events.includes(e)
    );

    if (remainingEvents.length === 0) {
      setSubscriptions(restSubs);
      return restSubs;
    }

    const newSub = {
      ...foundSub,
      events: remainingEvents
    };
    const subs = {
      ...subscriptions,
      [subKey]: newSub
    };
    setSubscriptions(subs);
    return subs;
  };

  const getSubArray = () => {
    return Object.values(subscriptions).filter(sub => Boolean(sub));
  };

  const hasSubscriptions = Object.keys(subscriptions).length > 0;

  const isButtonDisabled =
    !hubUrl || !clientUrl || !subscription[SubscriptionParams.topic];
  const buttonDisabledClass = isButtonDisabled ? "disabled" : "";

  return (
    <div>
      <div className="fc-card">
        <div className="card">
          <h5 className="card-header">Subscribe to events</h5>
          <div className="card-body">
            <form className="mb-4" onSubmit={handleSubmit}>
              <FormInput
                name="Hub URL"
                value={hubUrl}
                onChange={setHubUrl}
                isReadOnly={hasSubscriptions}
              />
              <FormInput
                name="Client URL"
                value={clientUrl}
                onChange={setClientUrl}
                isReadOnly={hasSubscriptions}
              />
              <FormInput
                name="Topic"
                value={subscription[SubscriptionParams.topic]}
                onChange={value =>
                  setSubscription({
                    ...subscription,
                    [SubscriptionParams.topic]: value
                  })
                }
              />
              <FormSelect
                name="Events"
                isMulti={true}
                options={toSelectOptions(Object.values(EventType))}
                value={toSelectOptions(subscription[SubscriptionParams.events])}
                onChange={options =>
                  setSubscription({
                    ...subscription,
                    [SubscriptionParams.events]: options.map(o => o.value)
                  })
                }
              />
              <div className="form-group text-right">
                <button
                  className={`btn btn-primary mr-1 ${buttonDisabledClass}`}
                  disabled={isButtonDisabled}
                  onClick={() => handleSubscribe(SubscriptionMode.subscribe)}
                >
                  Subscribe
                </button>
                <button
                  className={`btn btn-outline-primary ${buttonDisabledClass}`}
                  disabled={isButtonDisabled}
                  onClick={() => handleSubscribe(SubscriptionMode.unsubscribe)}
                >
                  Unsubscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SubscriptionList subs={getSubArray()} />
    </div>
  );
}

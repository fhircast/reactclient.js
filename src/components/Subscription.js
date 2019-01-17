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

function SubRow({ sub }) {
  const { topic, events } = sub;
  return (
    <tr>
      <td>{topic}</td>
      <td>
        {events.map(e => (
          <span key={e} className="badge badge-pill badge-info">
            {e}
          </span>
        ))}
      </td>
    </tr>
  );
}

export default function Subscription(props) {
  const [sub, setSub] = useState(INITIAL_SUB);
  const [hubUrl, setHubUrl] = useState(DEFAULT_HUB_URL);
  const [clientUrl, setClientUrl] = useState(DEFAULT_CLIENT_URL);
  const [subscriptions, setSubscriptions] = useState({});
  const { wsEndpoint } = props;

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleSubscribe = async mode => {
    const response = await sendSubscription(hubUrl, {
      ...sub,
      [SubscriptionParams.callback]: clientUrl,
      [SubscriptionParams.mode]: mode,
      [SubscriptionParams.channelEndpoint]: wsEndpoint
    });

    const isSuccess =
      response && response.status >= 200 && response.status < 300;

    if (isSuccess) {
      const callback =
        mode === SubscriptionMode.subscribe ? handleSub : handleUnsub;
      callback({
        hubUrl,
        clientUrl,
        topic: sub[SubscriptionParams.topic],
        events: sub[SubscriptionParams.events]
      });
    }
  };

  const getSubKey = ({ hubUrl, clientUrl, topic }) =>
    hubUrl + clientUrl + topic;

  const handleSub = sub => {
    setSubscriptions({ ...subscriptions, [getSubKey(sub)]: sub });
  };

  const handleUnsub = sub => {
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
      return;
    }

    const newSub = {
      ...foundSub,
      events: remainingEvents
    };
    setSubscriptions({
      ...subscriptions,
      [subKey]: newSub
    });
  };

  const getSubArray = () => {
    return Object.values(subscriptions).filter(sub => Boolean(sub));
  };

  const toSelectOptions = values => values.map(v => ({ value: v, label: v }));
  const hasSubscriptions = Object.keys(subscriptions).length > 0;

  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">Subscribe</h5>
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
            <div className="form-group text-right">
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
          <div className="table-responsive-sm">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Topic</th>
                  <th scope="col">Events</th>
                </tr>
              </thead>
              <tbody>
                {getSubArray().map(sub => (
                  <SubRow key={sub.topic} sub={sub} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import SubscriptionList from "./SubscriptionList";
import { sendSubscription } from "../services/fhircast";
import { toSelectOptions, isSuccessStatus } from "../utils";
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

const SHOW_CLIENT_URL = false;

function Subscriptions({ wsEndpoint, onSubscriptionsChange }) {
  const [subscription, setSubscription] = useState(INITIAL_SUB);
  const [hubUrl, setHubUrl] = useState(DEFAULT_HUB_URL);
  const [clientUrl, setClientUrl] = useState(DEFAULT_CLIENT_URL);
  const [subscriptions, setSubscriptions] = useState({});
  const [error, setError] = useState();

  const handleSubmit = e => e.preventDefault();

  const handleSubscribe = async mode => {
    const response = await sendSubscription(hubUrl, {
      ...subscription,
      [SubscriptionParams.callback]: clientUrl,
      [SubscriptionParams.mode]: mode,
      [SubscriptionParams.channelEndpoint]: wsEndpoint
    });

    setError(getError(response));

    const newSubs = getSubscriptions(mode, response);
    if (!newSubs) {
      return;
    }

    setSubscriptions(newSubs);

    if (onSubscriptionsChange) {
      onSubscriptionsChange(Object.values(newSubs));
    }
  };

  const getError = response => {
    if (!response) {
      return "Network error: invalid hub url?";
    }

    const { status } = response;
    return isSuccessStatus(status) ? null : `Error status ${status}`;
  };

  const getSubscriptions = (mode, response) => {
    if (!response || !isSuccessStatus(response.status)) {
      return null;
    }

    const sub = {
      topic: subscription[SubscriptionParams.topic],
      events: subscription[SubscriptionParams.events]
    };
    return mode === SubscriptionMode.subscribe
      ? addOrUpdateSub(sub)
      : removeSubEvents(sub);
  };

  const addOrUpdateSub = sub => ({ ...subscriptions, [getSubKey(sub)]: sub });

  const removeSubEvents = sub => {
    const subKey = getSubKey(sub);
    const { [subKey]: foundSub, ...restSubs } = subscriptions;

    if (!foundSub) {
      // no changes
      return null;
    }

    const remainingEvents = foundSub.events.filter(
      e => !sub.events.includes(e)
    );

    if (remainingEvents.length === 0) {
      // no events left, remove the sub
      return restSubs;
    }

    const newSub = {
      ...foundSub,
      events: remainingEvents
    };
    return {
      ...subscriptions,
      [subKey]: newSub
    };
  };

  const getSubKey = ({ topic }) => topic;

  const getSubArray = () => {
    return Object.values(subscriptions).filter(sub => Boolean(sub));
  };

  const hasSubscriptions = Object.keys(subscriptions).length > 0;

  const isButtonDisabled =
    !hubUrl || !clientUrl || !subscription[SubscriptionParams.topic];
  const buttonDisabledClass = isButtonDisabled ? "disabled" : "";

  const alertType = error ? "alert-danger" : "";
  return (
    <div>
      <div className="fc-card">
        <div className="card">
          <div className={`card-header alert ${alertType}`}>
            <h5 className="d-inline">Subscribe to events</h5>
            <small className="d-inline float-right">{error}</small>
          </div>
          <div className="card-body">
            <form className="mb-4" onSubmit={handleSubmit}>
              <FormInput
                name="Hub URL"
                value={hubUrl}
                onChange={setHubUrl}
                isReadOnly={hasSubscriptions}
              />
              {SHOW_CLIENT_URL ? (
                <FormInput
                  h
                  name="Client URL"
                  value={clientUrl}
                  onChange={setClientUrl}
                  isReadOnly={hasSubscriptions}
                />
              ) : null}
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

Subscriptions.propTypes = {
  wsEndpoint: PropTypes.string.isRequired,
  onSubscriptionsChange: PropTypes.func.isRequired
};

export default Subscriptions;

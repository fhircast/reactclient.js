import { WEBSOCKET_CHANNEL_TYPE } from "./constants";
import { SubscriptionParams } from "./types";

export const toSelectOption = value => ({ value, label: value });

export const toSelectOptions = values => values.map(toSelectOption);

export const isSuccessStatus = status =>
  status && status >= 200 && status < 300;

export const createSubscriptionJson = ({ topic, secret, eventTypes, mode }) => {
  return {
    [SubscriptionParams.events]: eventTypes.join(","),
    [SubscriptionParams.secret]: secret,
    [SubscriptionParams.topic]: topic,
    [SubscriptionParams.mode]: mode,
    [SubscriptionParams.channelType]: WEBSOCKET_CHANNEL_TYPE
  };
};

export const hasContext = ctx => Array.isArray(ctx) && ctx.length > 0;
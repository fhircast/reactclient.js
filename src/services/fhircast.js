import axios from "axios";

export async function getTopic(hubUrl, username, secret) {
  const topic = "1A3DF21C-1451-4DC5-8B59-3F824D3A7ED7";
  return [
    topic,
    null
  ]
}

export async function subscribe(hubUrl, subscription) {
  return [
    [],
    null
  ]
}

export async function getContext(hubUrl, topic) {
  return [
    [],
    null
  ]
}

export async function publishEvent(hubUrl, topic, message) {
  return [
    null,
    null
  ];
}

export async function sendSubscription(url, subscription) {
  if (Array.isArray(subscription["hub.events"])) {
    subscription = {
      ...subscription,
      "hub.events": subscription["hub.events"].join(",")
    };
  }

  try {
    const response = await axios.post(url, subscription);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.status ? error : null;
  }
}

export default {
  getTopic,
  subscribe,
  getContext,
  publishEvent
}

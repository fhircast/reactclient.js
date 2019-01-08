import axios from "axios";

export async function sendSubscription(url, subscription) {
  if (Array.isArray(subscription.events)) {
    subscription = { ...subscription, events: subscription.events.join(",") };
  }

  try {
    const response = await axios.post(url, subscription);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

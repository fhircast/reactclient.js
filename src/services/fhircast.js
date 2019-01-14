import axios from "axios";

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
    console.error(error);
    return error.status ? error : null;
  }
}

export async function getHubStatus(url) {
  console.log(url);
  try {
    const response = await axios.post(`${url}/status`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

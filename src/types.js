export const SubscriptionParams = {
  callback: "hub.callback",
  mode: "hub.mode",
  events: "hub.events",
  secret: "hub.secret",
  topic: "hub.topic",
  lease: "hub.lease",
  channelType: "hub.channel.type",
  channelEndpoint: "hub.channel.endpoint"
};

export const SubscriptionMode = {
  subscribe: "subscribe",
  unsubscribe: "unsubscribe"
};

export const EventType = {
  OpenPatientChart: "open-patient-chart",
  SwitchPatientChart: "switch-patient-chart",
  ClosePatientChart: "close-patient-chart",
  OpenImagingStudy: "open-imaging-study",
  SwitchImagingStudy: "switch-imaging-study",
  CloseImagingStudy: "close-imaging-study",
  LogoutUser: "logout-user",
  HibernateUser: "hibernate-user"
};

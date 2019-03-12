import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./Form/FormInput";
import Button from "./Form/Button";
import { WebSocketStatus } from "../types";

const WEBSOCKET_STATUS_ALERT_TYPE = {
  [WebSocketStatus.Closed]: "",
  [WebSocketStatus.Opening]: "alert-info",
  [WebSocketStatus.Open]: "alert-success"
};

const WEBSOCKET_STATUS_TEXT = {
  [WebSocketStatus.Closed]: "Closed",
  [WebSocketStatus.Opening]: "Opening...",
  [WebSocketStatus.Open]: "Open"
};

function TopicFooter({ subscribedEvents, topic, websocketStatus }) {
  console.warn("Fix WebSocketConnection alert type");
  const alertType = topic
    ? "alert-success"
    : WEBSOCKET_STATUS_ALERT_TYPE[websocketStatus];

  return (
    <div className={`card-footer alert ${alertType} mb-0`}>
      <h6 className="d-inline">WebSocket</h6>
      <small className="d-inline float-right text-muted">
        {WEBSOCKET_STATUS_TEXT[websocketStatus]}
      </small>
      <br />
      {subscribedEvents.map(e => (
        <span key={e} className="badge badge-pill badge-info">
          {e}
        </span>
      ))}
    </div>
  );
}

function Topic({
  hubUrl,
  topic,
  secret,
  isLoading,
  subscribedEvents,
  websocketStatus,
  onHubUrlChange,
  onSecretChange,
  onTopicRequested
}) {
  const [username, setUsername] = useState("joe");

  const handleSubmit = e => e.preventDefault();

  const handleGetTopic = () => {
    onTopicRequested(username, secret);
  };

  const hasTopic = Boolean(topic);
  const alertType = hasTopic ? "alert-success" : "";

  return (
    <div className="fc-card">
      <div className="card">
        <div className={`card-header alert ${alertType} mb-0`}>
          <h5 className="d-inline">Topic</h5>
          <small className="d-inline float-right text-muted"><strong>{topic}</strong></small>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <FormInput
              name="Hub URL"
              value={hubUrl}
              onChange={onHubUrlChange}
              isReadOnly={hasTopic}
            />
            <FormInput
              name="Username"
              value={username}
              onChange={setUsername}
              isReadOnly={hasTopic}
            />
            <FormInput
              name="Secret"
              value={secret}
              onChange={onSecretChange}
              isReadOnly={hasTopic}
            />
            <div className="form-group text-right">
              <Button
                className="btn-primary mr-1"
                text="Get Topic"
                loadingText="Getting topic..."
                isDisabled={hasTopic}
                isLoading={isLoading}
                onClick={handleGetTopic}
              />
            </div>
          </form>
        </div>
        <TopicFooter
          topic={topic}
          subscribedEvents={subscribedEvents}
          websocketStatus={websocketStatus}
        />
      </div>
    </div>
  );
}

Topic.propTypes = {
  baseUrl: PropTypes.string,
  topic: PropTypes.string,
  subscribedEvents: PropTypes.arrayOf(PropTypes.string),
  onTopicRequested: PropTypes.func
};

export default Topic;

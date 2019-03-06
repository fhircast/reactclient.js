import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./Form/FormInput";
import Button from "./Form/Button";

function TopicFooter({ subscribedEvents }) {
  if (!Array.isArray(subscribedEvents) || subscribedEvents.length === 0) {
    return null;
  }

  return (
    <div>
      <small>Subscribed to </small>
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
        <div className={`card-header alert ${alertType}`}>
          <h5 className="d-inline">Topic</h5>
          <small><strong className="d-inline float-right">{topic}</strong></small>
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
        <div className="card-footer">
          <TopicFooter subscribedEvents={subscribedEvents} />
        </div>
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

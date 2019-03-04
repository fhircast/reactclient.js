import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import Button from "./Button";

function Topic({ hubUrl, topic, isLoading, onHubUrlChange, onTopicRequested }) {
  const [username, setUsername] = useState("joe");
  const [secret, setSecret] = useState("EF25A906-1C48-4E87-AC1F-0E483666AAEEB");

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
          <small className="d-inline float-right">{topic}</small>
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
              onChange={setSecret}
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
      </div>
    </div>
  );
}

Topic.propTypes = {
  baseUrl: PropTypes.string,
  topic: PropTypes.string,
  onTopicRequested: PropTypes.func
};

export default Topic;

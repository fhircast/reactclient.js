import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import Button from "./Button";

function Topic({ hubUrl, topic, onHubUrlChange, onTopicChange }) {
  const [username, setUsername] = useState("joe");
  const [secret, setSecret] = useState("EF25A906-1C48-4E87-AC1F-0E483666AAEEB");
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(null);

  const handleSubmit = e => e.preventDefault();

  const handleGetTopic = async () => {
    setIsLoading(true);

    // TODO: fetch from hub
    const newTopic = "1A3DF21C-1451-4DC5-8B59-3F824D3A7ED7";

    await new Promise(resolve => {
      setTimeout(resolve(), 2000);
    });

    // setError();

    setIsLoading(false);

    onTopicChange(newTopic);
    return newTopic;
  };

  const hasTopic = Boolean(topic);
  const hasError = Boolean(error);
  const alertType = hasTopic ? "alert-success" : hasError ? "alert-error" : "";

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
  onTopicChange: PropTypes.func
};

export default Topic;

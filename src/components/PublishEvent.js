import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import uuid from "uuid";
import FormSelect from "./FormSelect";
import { toSelectOption, toSelectOptions } from "../utils";
import { EventType, WebSocketStatus } from "../types";
import { DEFAULT_CONTEXT } from "../constants";

const EVENT_EVENT = "hub.event";
const EVENT_TOPIC = "hub.topic";

const STATUS_ALERT_TYPE = {
  [WebSocketStatus.Closed]: "",
  [WebSocketStatus.Opening]: "alert-info",
  [WebSocketStatus.Open]: "alert-info"
};

const STATUS_TEXT = {
  [WebSocketStatus.Closed]: "Closed",
  [WebSocketStatus.Opening]: "Opening...",
  [WebSocketStatus.Open]: "Waiting for confirmation..."
};

const shouldNodeCollapse = ({ namespace }) => {
  return namespace.length > 2;
};

function StatusText({ status, isBound, endpoint }) {
  if (isBound) {
    return (
      <span>
        Bound to
        <br />
        <strong>{endpoint}</strong>
      </span>
    );
  }

  return <span>{STATUS_TEXT[status]}</span>;
}

function PublishEvent({ topic, isPublishAllowed, onPublishEvent }) {
  const [eventName, setEventName] = useState(Object.values(EventType)[0]);
  const [context, setContext] = useState(DEFAULT_CONTEXT);
  const [contextError, setContextError] = useState();
  const [previousId, setPreviousId] = useState();

  const handlePublishEvent = () => {
    if (!onPublishEvent) {
      return;
    }

    const evt = {
      [EVENT_TOPIC]: topic,
      [EVENT_EVENT]: eventName,
      context
    };

    const id = uuid.v4();
    setPreviousId(id);
    onPublishEvent(evt, id);
  };

  const handleContextEdit = ({ updated_src }) => {
    setContext(updated_src);

    let error = Array.isArray(updated_src) ? null : "Context should be an array"
    setContextError(error);
  };

  const isContextInvalid = Boolean(contextError);
  const isPublishDisabled = !isPublishAllowed || isContextInvalid;
  const publishDisabledClass = isPublishDisabled ? "disabled" : "";
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">Publish event</h5>
        <div className="card-body">
          <form className="mb-1" onSubmit={e => e.preventDefault()}>
            <FormSelect
              name="Event"
              isMulti={false}
              options={toSelectOptions(Object.values(EventType))}
              value={toSelectOption(eventName)}
              onChange={option => setEventName(option.value)}
            />
            <label htmlFor="context-textarea">Context</label>
            <div className="overflow-auto">
              <ReactJson
                src={context}
                name={false}
                shouldCollapse={shouldNodeCollapse}
                onEdit={handleContextEdit}
                onAdd={handleContextEdit}
                onDelete={handleContextEdit}
              />
            </div>
          </form>
          <div className="text-right">
            <button
              className={`btn btn-primary text-right ${publishDisabledClass}`}
              onClick={handlePublishEvent}
              disabled={isPublishDisabled}
            >
              Publish
            </button>
          </div>
        </div>
        <div className="card-footer">
          {previousId ? (
            <small className="text-success">
              Published event with ID <strong>{previousId}</strong>
            </small>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
      </div>
    </div>
  );
}

PublishEvent.propTypes = {
  topic: PropTypes.string.isRequired,
  isPublishAllowed: PropTypes.bool.isRequired,
  onPublishEvent: PropTypes.func.isRequired
};

export default PublishEvent;

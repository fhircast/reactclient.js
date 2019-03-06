import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import uuid from "uuid";
import FormSelect from "./FormSelect";
import { toSelectOption, toSelectOptions } from "../utils";
import { DEFAULT_CONTEXT, EVENT_TYPES } from "../constants";

const EVENT_EVENT = "hub.event";
const EVENT_TOPIC = "hub.topic";

const shouldNodeCollapse = ({ namespace }) => {
  return namespace.length > 2;
};

function PublishEvent({ topic, isPublishAllowed, onPublishEvent }) {
  const [eventName, setEventName] = useState(EVENT_TYPES[0]);
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
              options={toSelectOptions(EVENT_TYPES)}
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
  isPublishAllowed: PropTypes.bool.isRequired,
  onPublishEvent: PropTypes.func.isRequired
};

export default PublishEvent;

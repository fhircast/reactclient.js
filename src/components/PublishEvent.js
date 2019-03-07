import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import FormSelect from "./Form/FormSelect";
import { toSelectOption, toSelectOptions } from "../utils";
import { IMAGING_STUDY_CONTEXT, EMPTY_CONTEXT, EVENT_TYPES } from "../constants";
import { EventType, EventParams } from "../types";

const DEFAULT_CONTEXTS = {
  [EventType.OpenImagingStudy]: IMAGING_STUDY_CONTEXT,
  [EventType.SwitchImagingStudy]: IMAGING_STUDY_CONTEXT
}

const getDefaultContext = (eventType) => DEFAULT_CONTEXTS[eventType] || EMPTY_CONTEXT;

const shouldNodeCollapse = ({ namespace }) => {
  return namespace.length > 2;
};

function PublishEvent({ topic, isPublishAllowed, onPublishEvent }) {
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [context, setContext] = useState(getDefaultContext(eventType));
  const [contextError, setContextError] = useState();

  const handleEventTypeChange = evt => {
    setEventType(evt);
    setContext(getDefaultContext(evt));
  }

  const handlePublishEvent = () => {
    if (!onPublishEvent) {
      return;
    }

    const evt = {
      [EventParams.Topic]: topic,
      [EventParams.Event]: eventType,
      context
    };

    onPublishEvent(evt);
  };

  const handleContextEdit = ({ updated_src }) => {
    setContext(updated_src);

    let error = Array.isArray(updated_src)
      ? null
      : "Context should be an array";
    setContextError(error);
  };

  const isContextInvalid = Boolean(contextError);
  const isPublishDisabled = !isPublishAllowed || isContextInvalid;
  const publishDisabledClass = isPublishDisabled ? "disabled" : "";
  return (
    <div >
      <form className="mb-1" onSubmit={e => e.preventDefault()}>
        <FormSelect
          name="Event"
          isMulti={false}
          options={toSelectOptions(EVENT_TYPES)}
          value={toSelectOption(eventType)}
          onChange={option => handleEventTypeChange(option.value)}
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
  );
}

PublishEvent.propTypes = {
  isPublishAllowed: PropTypes.bool.isRequired,
  onPublishEvent: PropTypes.func.isRequired
};

export default PublishEvent;

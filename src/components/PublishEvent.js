import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { toSelectOption, toSelectOptions } from "../utils";
import { EventType } from "../types";
import { DEFAULT_TOPIC } from "../constants";
import { useInput } from "../hooks";

const EVENT_EVENT = "hub.event";
const EVENT_TOPIC = "hub.topic";

export default function PublishEvent({ isPublishAllowed, onPublishEvent }) {
  const [eventName, setEventName] = useState(EventType.OpenPatientChart);
  const { value: topic, onChange: onTopicChange } = useInput({
    initialValue: DEFAULT_TOPIC
  });

  const handlePublishEvent = () => {
    if (!onPublishEvent) {
      return;
    }

    const evt = {
      [EVENT_TOPIC]: topic,
      [EVENT_EVENT]: eventName,
      context: [] // TODO
    };
    onPublishEvent(evt);
  };

  const publishDisabledClass = isPublishAllowed ? "" : "disabled";
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">Publish event</h5>
        <div className="card-body">
          <form className="mb-1" onSubmit={e => e.preventDefault()}>
            <FormInput name="Topic" value={topic} onChange={onTopicChange} />
            <FormSelect
              name="Event"
              isMulti={false}
              options={toSelectOptions(Object.values(EventType))}
              value={toSelectOption(eventName)}
              onChange={option => setEventName(option.value)}
            />
          </form>
          <div className="text-right">
            <button
              className={`btn btn-primary text-right ${publishDisabledClass}`}
              onClick={handlePublishEvent}
              disabled={!isPublishAllowed}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import PublishEvent from "./PublishEvent";

function WebSocketConnection({ topic, sentEventId, onPublishEvent }) {
  console.warn("Fix PublishEvent isPublishAllowed");
  const isPublishAllowed = Boolean(topic);

  const handlePublishEvent = (evt, id) => {
    onPublishEvent(evt, id);
  };

  return (
    <div>
      <div className="fc-card">
        <div className="card">
          <div className={`card-header`}>
            <h5 className="d-inline">Publish Event</h5>
          </div>
          <div className="card-body">
            <PublishEvent
              topic={topic}
              isPublishAllowed={isPublishAllowed}
              onPublishEvent={handlePublishEvent}
            />
          </div>
          <div className="card-footer">
            {sentEventId ? (
              <small className="text-muted">
                Published event <strong>{sentEventId}</strong>
              </small>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebSocketConnection;

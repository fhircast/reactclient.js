import React from "react";
import PublishEvent from "./PublishEvent";

function PublishEventCard({ topic, sentEventId, onPublishEvent }) {
  const handlePublishEvent = (evt, id) => {
    onPublishEvent(evt, id);
  };

  console.warn("Fix PublishEvent isPublishAllowed");
  const isPublishAllowed = Boolean(topic);
  const footerAlertType = sentEventId ? "alert-success" : "";
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
          <div className={`card-footer alert ${footerAlertType} mb-0`}>
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

export default PublishEventCard;

import React from "react";

const EVENT_EVENT = "hub.event";
const EVENT_TOPIC = "hub.topic";

function EventRow({ evt, index }) {
  return (
    <tr>
      <td>{evt[EVENT_TOPIC]}</td>
      <td>
        <span key={index} className="badge badge-pill badge-info">
          {evt[EVENT_EVENT]}
        </span>
      </td>
    </tr>
  );
}

export default function Events({ received, isPublishAllowed, onPublishEvent }) {
  const publishDisabledClass = isPublishAllowed ? "" : "disabled";
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">Events</h5>
        <div className="card-body">
          <h6 className="card-title">Received</h6>
          <div className="table-responsive-sm">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Topic</th>
                  <th scope="col">Event</th>
                </tr>
              </thead>
              <tbody>
                {received.map((evt, index) => (
                  <EventRow key={index} evt={evt} index={index} />
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="text-right">
            <button
              className={`btn btn-primary text-right ${publishDisabledClass}`}
              onClick={onPublishEvent}
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

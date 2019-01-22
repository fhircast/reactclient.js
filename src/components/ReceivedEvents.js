import React from "react";
import PropTypes from "prop-types";

const EVENT_EVENT = "hub.event";
const EVENT_TOPIC = "hub.topic";

function EventRow({ evt, index }) {
  return (
    <tr>
      <td>{evt.id}</td>
      <td>{evt.event[EVENT_TOPIC]}</td>
      <td>
        <span key={index} className="badge badge-pill badge-info">
          {evt.event[EVENT_EVENT]}
        </span>
      </td>
    </tr>
  );
}

function ReceivedEvents({ events }) {
  const latestEvent = events.length > 0 ? events[0] : null;
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">Received events</h5>
        <div className="card-body">
          <div className="table-responsive-sm">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Topic</th>
                  <th scope="col">Event</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evt, index) => (
                  <EventRow key={index} evt={evt} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          {latestEvent ? (
            <small className="text-success">
              Received event with ID <strong>{latestEvent.id}</strong>
            </small>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
      </div>
    </div>
  );
}

ReceivedEvents.propTypes = {
  events: PropTypes.array.isRequired
};

export default ReceivedEvents;

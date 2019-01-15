import React from "react";

const EVENT = "hub.event";
const TOPIC = "hub.topic";

function EventRow({ evt, index }) {
  return (
    <tr>
      <td>{evt[TOPIC]}</td>
      <td>
        <span key={index} className="badge badge-pill badge-info">
          {evt[EVENT]}
        </span>
      </td>
    </tr>
  );
}

export default function Events({ events }) {
  return (
    <div className="card">
      <div className="card-header">Received events</div>
      <div className="card-body">
        <div className="table-responsive-sm">
          <table className="table table-sm">
            <thead>
              <tr>
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
    </div>
  );
}

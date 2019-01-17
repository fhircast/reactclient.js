import React from "react";

const EVENT_EVENT = "hub.event";
const EVENT_TOPIC = "hub.topic";

function SubRow({ sub }) {
  const { topic, events } = sub;
  return (
    <tr>
      <td>{topic}</td>
      <td>
        {events.map(e => (
          <span key={e} className="badge badge-pill badge-info">
            {e}
          </span>
        ))}
      </td>
    </tr>
  );
}

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

export default function Events({ subs, received }) {
  return (
    <div className="fc-card">
      <div className="card">
        <h5 className="card-header">Events</h5>
        <div className="card-body">
          <h6 className="card-title">Subscribed</h6>
          <div className="table-responsive-sm mb-4">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Topic</th>
                  <th scope="col">Events</th>
                </tr>
              </thead>
              <tbody>
                {subs.map(sub => (
                  <SubRow key={sub.topic} sub={sub} />
                ))}
              </tbody>
            </table>
          </div>
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
        </div>
      </div>
    </div>
  );
}

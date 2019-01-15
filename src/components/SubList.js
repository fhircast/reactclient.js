import React from "react";

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

export default function SubList({ subs }) {
  return (
    <div className="fc-card">
      <div className="card">
        <div className="card-header">Subscribed events</div>
        <div className="card-body">
          <div className="table-responsive-sm">
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
        </div>
      </div>
    </div>
  );
}

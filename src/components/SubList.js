import React from "react";

function SubRow({ sub }) {
  const { hubUrl, clientUrl, topic, events } = sub;
  return (
    <tr>
      <td>{hubUrl}</td>
      <td>{clientUrl}</td>
      <td>{topic}</td>
      <td>
        {events.map(e => (
          <span class="badge badge-pill badge-info">{e}</span>
        ))}
      </td>
    </tr>
  );
}

export default function SubList({ subs }) {
  return (
    <div className="table-responsive-sm">
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Hub URL</th>
            <th scope="col">Client URL</th>
            <th scope="col">Topic</th>
            <th scope="col">Events</th>
          </tr>
        </thead>
        <tbody>
          {subs.map(sub => (
            <SubRow key={sub.hubUrl + sub.clientUrl + sub.topic} sub={sub} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

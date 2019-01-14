import React from "react";

function SubRow({ sub }) {
  const { hubUrl, callback, topic, events } = sub;
  return (
    <tr>
      <td>{hubUrl}</td>
      <td>{callback}</td>
      <td>{topic}</td>
      <td>{events.join(", ")}</td>
    </tr>
  );
}

export default function SubList({ subs }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Hub</th>
          <th scope="col">Callback</th>
          <th scope="col">Topic</th>
          <th scope="col">Events</th>
        </tr>
      </thead>
      <tbody>
        {subs.map(sub => (
          <SubRow key={sub.hubUrl + sub.callback + sub.topic} sub={sub} />
        ))}
      </tbody>
    </table>
  );
}

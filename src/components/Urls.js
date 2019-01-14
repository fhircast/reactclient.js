import React from "react";
import FormInput from "./FormInput";

export default function Urls({
  hubUrl,
  onHubUrlChange,
  clientUrl,
  onClientUrlChange
}) {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">Hub</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <FormInput
              name="Hub URL"
              value={hubUrl}
              onChange={onHubUrlChange}
            />
            <FormInput
              name="Client URL"
              value={clientUrl}
              onChange={onClientUrlChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import FormInput from "./FormInput";

export default function Urls({
  hubUrl,
  onHubUrlChange,
  clientUrl,
  onClientUrlChange,
  websocketUrl,
  onWebsocketUrlChange,
  isReadOnly
}) {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="fc-card">
      <div className="card">
        <div className="card-header">URLs</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <FormInput
              name="Hub URL"
              value={hubUrl}
              onChange={onHubUrlChange}
              isReadOnly={isReadOnly}
            />
            <FormInput
              name="Client URL"
              value={clientUrl}
              onChange={onClientUrlChange}
              isReadOnly={isReadOnly}
            />
            <FormInput
              name="Websocket URL"
              value={websocketUrl}
              onChange={onWebsocketUrlChange}
              isReadOnly={isReadOnly}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

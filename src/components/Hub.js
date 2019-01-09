import React from "react";
import { useInput } from "../hooks";

export default function Hub({ url, onUrlChange }) {
  const urlInput = useInput({
    initialValue: url,
    onChange: onUrlChange,
    isDeferred: false
  });

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className="hub-selector">
      <div className="card">
        <div className="card-header">Hub</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="hubUrl"
                name="hubUrl"
                className="form-control"
                placeholder="URL"
                value={urlInput.value}
                onChange={urlInput.onChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

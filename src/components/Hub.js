import React from "react";
import { useInput } from "../hooks";

export default function Hub({ url, onUrlChange }) {
  const urlInput = useInput({
    initialValue: url,
    onChange: onUrlChange,
    isDeferred: true
  });

  return (
    <div className="hub-selector">
      <div className="card">
        <div className="card-header">Hub</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="hubUrl"
                name="hubUrl"
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

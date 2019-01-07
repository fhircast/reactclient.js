import React from "react";
import { useInput } from "../hooks";

export default function HubSelector(props) {
  const { url, endpoint, onUrlChange, onEndpointChange } = props;
  const urlInput = useInput(url, onUrlChange);
  const endpointInput = useInput(endpoint, onEndpointChange);

  return (
    <div className="hub-selector">
      <div className="card">
        <div className="card-header">Hub</div>
        <div className="card-body">
          <form>
            <div className="form-group row">
              <label htmlFor="hubUrl" className="col-sm-2 col-form-label">
                URL
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="hubUrl"
                  name="hubUrl"
                  value={urlInput.value}
                  onChange={urlInput.onChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="hubEndpoint" className="col-sm-2 col-form-label">
                Endpoint
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="hubEndpoint"
                  name="hubEndpoint"
                  value={endpointInput.value}
                  onChange={endpointInput.onChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

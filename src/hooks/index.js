import { useState, useRef, useEffect } from "react";
import uuid from "uuid";
import { WebSocketStatus } from "../types";

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

export const useInput = ({
  initialValue = "",
  onChange = null,
  isDeferred = false
} = {}) => {
  const [value, setValue] = useState(initialValue);
  const intervalRef = useRef();

  const notifyChange = (newValue, triggerTimer = false) => {
    if (!onChange) {
      return;
    }

    if (triggerTimer) {
      clearInterval(intervalRef.current);
      intervalRef.current = setTimeout(() => onChange(newValue), WAIT_INTERVAL);
    } else {
      onChange(newValue);
    }
  };

  const handleChange = e => {
    const newValue = e.target.value;
    setValue(newValue);
    notifyChange(newValue, isDeferred);
  };

  const handleKeyDown = e => {
    if (isDeferred && e.keyCode === ENTER_KEY) {
      notifyChange(value, false);
    }
  };

  return {
    value,
    setValue,
    hasValue: value !== undefined && value !== null,
    onChange: handleChange,
    onKeyDown: handleKeyDown
  };
};

export const useSelect = ({ initialValue, onChange = null } = {}) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = value => {
    setValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return {
    value,
    setValue,
    onChange: handleChange
  };
};

export const useWebSocket = ({ url, onMessage, onOpen, onClose }) => {
  const wsRef = useRef();
  const [status, setStatus] = useState(WebSocketStatus.Closed);

  const call = (cb, ...args) => {
    if (cb) {
      cb(...args);
    }
  };

  const open = () => {
    if (wsRef.current) {
      close();
    }

    setStatus(WebSocketStatus.Opening);

    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = e => {
      setStatus(WebSocketStatus.Open);
      call(onOpen, e);
    };
    wsRef.current.onmessage = e => call(onMessage, e);
    wsRef.current.onclose = () => close();
  };

  const close = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setStatus(WebSocketStatus.Closed);
    call(onClose);
  };

  const send = message => {
    if (!wsRef.current) {
      return;
    }

    wsRef.current.send(message);
  };

  return { status, open, close, send };
};

export const useFhircastWebSocket = ({
  url,
  endpoint,
  connect,
  onBind,
  onUnbind,
  onEvent
}) => {
  const [isBound, setIsBound] = useState(false);
  const { status, open, close, send } = useWebSocket({
    url: `${url}/${endpoint}`,
    onMessage: e => handleMessage(e),
    onClose: onUnbind
  });

  useEffect(
    () => {
      if (connect) {
        open();
      } else {
        doClose();
      }

      return () => doClose();
    },
    [url, endpoint, connect]
  );

  const doClose = () => {
    setIsBound(false);
    close();

    if (onUnbind) {
      onUnbind();
    }
  };

  const handleMessage = e => {
    const data = JSON.parse(e.data);

    if (data.bound) {
      setIsBound(true);
      if (onBind) {
        onBind(endpoint);
      }
      return;
    }

    if (onEvent) {
      onEvent(data);
    }
  };

  const publishEvent = (evt, id = null) => {
    const msg = {
      timestamp: new Date().toJSON(),
      id: id || uuid.v4(),
      event: evt
    };
    send(JSON.stringify(msg));
  };

  return { status, isBound, publishEvent };
};

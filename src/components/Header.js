import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const HEADER_TYPE = process.env.REACT_APP_HEADER_TYPE || "dark";
const HEADER_TYPE_CLASSES = `navbar-${HEADER_TYPE} bg-${HEADER_TYPE}`;

export default function Header() {
  return (
    <nav className={`navbar ${HEADER_TYPE_CLASSES} mb-4 border-bottom`}>
      <div className="navbar-brand">
        <span role="img" aria-label="fire">
          🔥
        </span>{" "}
        FHIRcast WebSocket Client
      </div>
      <ul className="navbar-nav">
        <li className="nav-item mx-2">
          <a
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/akalliokoski/fhircast-websocket-demo"
          >
            <FontAwesomeIcon size="2x" icon={faGithub} />
          </a>
        </li>
      </ul>
    </nav>
  );
}

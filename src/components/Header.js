import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="navbar-brand">
        <span role="img" aria-label="fire">
          🔥
        </span>{" "}
        FHIRcast Websocket Demo
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

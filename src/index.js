import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ProvideAuth } from "./hooks/useAuth";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

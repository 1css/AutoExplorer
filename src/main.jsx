import React from "react";

import { createRoot } from "react-dom/client";

import ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store";
import { Provider } from "react-redux";

import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./components/common/ErrorPage.jsx";

// if (import.meta.env.VITE_NODE_ENV !== "production") {
//   whyDidYouUpdate(React);
// }

const root = ReactDOMClient.createRoot(document.getElementById("root"));

// Render the application
root.render(
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);

// Conditional development mode logging
if (import.meta.env.VITE_NODE_ENV !== "production") {
  console.log("Development mode");
}

// Conditional service worker registration in production
// if (import.meta.env.VITE_NODE_ENV === "production") {
//   import("./components/common/registerServiceWorker").then((module) => {
//     module.registerServiceWorker();
//   });
// }

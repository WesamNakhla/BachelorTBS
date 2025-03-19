import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";

// Get the root element from index.html
const rootElement = document.getElementById("root");

if (rootElement) {
  // Create a React root and render the App component
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Log an error if the root element is not found
  console.error("Root element not found! Ensure you have a <div id='root'> in index.html");
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // Pointing to App.tsx or App.jsx file
import "./styles/global.css"; // Your global styles

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

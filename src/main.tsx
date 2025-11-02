import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { CheckViewportProvider } from "./providers/check-viewport.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CheckViewportProvider>
      <App />
    </CheckViewportProvider>
  </React.StrictMode>,
);

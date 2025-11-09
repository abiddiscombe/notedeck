import { App } from "@/app.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { CheckViewportProvider } from "./providers/check-viewport.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CheckViewportProvider>
      <App />
    </CheckViewportProvider>
  </React.StrictMode>,
);

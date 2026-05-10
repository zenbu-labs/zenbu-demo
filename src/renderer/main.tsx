import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./app.css";
import { ZenbuProvider } from "@zenbujs/core/react";

createRoot(document.getElementById("root")!).render(
  <ZenbuProvider>
    <App />
  </ZenbuProvider>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import "./app.css";
import { ZenbuProvider } from "@zenbujs/core/react";

createRoot(document.getElementById("root")!).render(
  <ZenbuProvider>
    <App />
  </ZenbuProvider>,
);

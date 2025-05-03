import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import PageRoutes from "./page_routes";
import { Toaster } from "sonner";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <PageRoutes />
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { RestaurantsProvider } from "./Contexts/RestaurantsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RestaurantsProvider>

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </RestaurantsProvider>

  </StrictMode>
);

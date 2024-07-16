import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store.js";
import { Navbar } from "./components/mainComponents/Navbar.jsx";
import LayoutProvider from "./providers/LayoutProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

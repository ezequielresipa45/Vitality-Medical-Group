import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react"
import config from "./auth_config"

// Sintaxis  React v.18 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider {...config}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
);
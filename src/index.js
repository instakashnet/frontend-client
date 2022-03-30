import "./assets/css/app.css";
import "./assets/css/main.scss";

import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { injectStore } from "./api/interceptors";
import App from "./App";
import { theme } from "./components/layout/theme.component";
import store from "./store";

injectStore(store);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

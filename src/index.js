import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import store from "./store";
import { theme } from "./components/layout/theme.component";

import "./assets/css/app.css";
import "./assets/css/main.scss";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

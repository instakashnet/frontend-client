import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import App from "./App";
import store from "./store";
import { theme } from "./components/layout/theme.component";
import { injectStore } from "./api/interceptors";

import "./assets/css/app.css";
import "./assets/css/main.scss";

injectStore(store);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

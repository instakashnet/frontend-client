import { ThemeProvider } from "@material-ui/styles";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { injectStore } from "./api/interceptors";
import App from "./App";
import "./assets/css/app.css";
import "./assets/css/main.scss";
import { theme } from "./components/layout/theme.component";
import store from "./store";

process.env.REACT_APP_STAGE === "prod" &&
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.7,
    // defaultIntegrations: false,
  });

injectStore(store);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

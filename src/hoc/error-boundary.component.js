import * as Sentry from "@sentry/react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";

// COMPONENTS
import { Error500 } from "../pages/errors/containers/error-500.screen";

export const CustomErrorBoundary = ({ children }) => {
  const user = useSelector(state => state.Auth.user);

  const errorHandler = (error, { componentStack }) => {
    const date = new Date(),
      fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      hours = date.getHours(),
      minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
      inErrorComponent = componentStack.match(/at \w+/g)[0].split(' ')[1];

    let errorString = `Error: ${error.toString()}\nComponente: ${inErrorComponent}\nFecha: ${fullDate}, ${hours}:${minutes}\nUsuario: ${user.name} (${user.email})`;

    process.env.REACT_APP_STAGE === "prod" ?
      Sentry.captureException(new Error(errorString)) :
      console.log(errorString);
  };

  return <ErrorBoundary FallbackComponent={Error500} onError={errorHandler}>{children}</ErrorBoundary>;
};

import React from "react";
import { ErrorBoundary } from "react-error-boundary";

// COMPONENTS
import { Error500 } from "../pages/errors/containers/error-500.screen";

export const CustomErrorBoundary = ({ children }) => {
  return <ErrorBoundary FallbackComponent={Error500}>{children}</ErrorBoundary>;
};

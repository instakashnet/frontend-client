import React from "react";
import { ErrorBoundary } from "react-error-boundary";

// COMPONENTS
import { Error500 } from "../components/layout/error-500.component";

export const CustomErrorBoundary = ({ children }) => {
  return <ErrorBoundary FallbackComponent={Error500}>{children}</ErrorBoundary>;
};

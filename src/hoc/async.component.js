import React, { Suspense } from "react";

// COMPONENTS
import { CustomErrorBoundary } from "../hoc/error-boundary.component";
import Spinner from "../components/UI/spinner.component";

const asyncComponent = (Component) => {
  return (props) => {
    return (
      <Suspense fallback={<Spinner screen />}>
        <CustomErrorBoundary>
          <Component {...props} />
        </CustomErrorBoundary>
      </Suspense>
    );
  };
};

export default asyncComponent;

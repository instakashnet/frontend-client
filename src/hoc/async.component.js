import React, { Suspense } from "react";

// COMPONENTS
import Spinner from "../components/UI/spinner.component";
import { CustomErrorBoundary } from "../hoc/error-boundary.component";

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

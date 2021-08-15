import React, { Suspense } from "react";

import Spinner from "../components/UI/spinner.component";

const asyncComponent = (Component) => {
  return (props) => {
    return (
      <Suspense fallback={<Spinner screen />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default asyncComponent;

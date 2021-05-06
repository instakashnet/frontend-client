import React, { Suspense } from 'react';

import Spinner from '../core/components/UI/Spinner';

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

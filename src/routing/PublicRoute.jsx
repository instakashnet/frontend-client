import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.Auth.isAuth);
  const profileSelected = sessionStorage.getItem('profileSelected');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          let pathname = '/';
          if (!profileSelected) pathname = '/profile-selection';
          return <Redirect to={{ pathname, state: { from: props.location } }} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PublicRoute;

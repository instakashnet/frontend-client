import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.Auth.isAuth);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? <Component {...props} /> : <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />;
      }}
    />
  );
};

export default PrivateRoute;

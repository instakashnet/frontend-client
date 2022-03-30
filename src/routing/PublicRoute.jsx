import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.Auth.isAuth);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? <Redirect to={{ pathname: "/", state: { from: props.location } }} /> : <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;

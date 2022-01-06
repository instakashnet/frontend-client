import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { closeSliderModal, closeModal } from "../store/actions";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isAuth);

  useEffect(() => {
    history.listen(() => dispatch(closeSliderModal()));
    history.listen(() => dispatch(closeModal()));
  }, [history, dispatch]);

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

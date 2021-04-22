import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { closeSliderModal } from '../store/actions';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  const profileSelected = sessionStorage.getItem('profileSelected');

  useEffect(() => {
    history.listen(() => dispatch(closeSliderModal()));
  }, [history, dispatch]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return !profileSelected && props.location.pathname !== '/profile-selection' ? (
            <Redirect to={{ pathname: '/profile-selection', state: { from: props.location } }} />
          ) : (
            <Component {...props} />
          );
        } else {
          return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />;
        }
      }}
    />
  );
};

export default PrivateRoute;

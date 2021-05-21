import { useEffect, lazy } from 'react';
import { Switch, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserInit, getProfilesInit } from './store/actions';
import ReactPixel from 'react-facebook-pixel';
import history from './shared/history';

import Alert from './core/components/UI/Alert';
import ScrollToTop from './hoc/ScrollToTop';
import asyncComponent from './hoc/AsyncComponent';

// ROUTING
import PublicRoute from './routing/PublicRoute';
import PrivateRoute from './routing/PrivateRoute';

// PUBLIC
import Signin from './auth/containers/Signin';
import Signup from './auth/containers/Signup';
import RecoverPassword from './auth/containers/RecoverPassword';
import ChangePassword from './auth/containers/ChangePassword';
import CompleteProfile from './auth/containers/CompleteProfile';

// PRIVATE
const ProfileSelection = lazy(() => import('./profile/containers/Selection'));
const Welcome = lazy(() => import('./welcome/containers/Welcome'));
const Dashboard = lazy(() => import('./dashboard/containers/Dashboard'));
const MyProfile = lazy(() => import('./profile/containers/Profile'));
const Accounts = lazy(() => import('./accounts/containers/Accounts'));
const Exchange = lazy(() => import('./exchange/containers/Exchange'));

ReactPixel.init(process.env.REACT_APP_FB_PIXEL_ID, {}, { autoConfig: true, debug: false });

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isAuth);

  useEffect(() => {
    dispatch(loadUserInit());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) dispatch(getProfilesInit());
  }, [dispatch, isAuth]);

  useEffect(() => {
    ReactPixel.pageView();
  }, []);

  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <PublicRoute exact path='/signin' component={Signin} />
          <PublicRoute exact path='/signup' component={Signup} />
          <PublicRoute exact path='/recover-password' component={RecoverPassword} />
          <PublicRoute exact path='/change-password' component={ChangePassword} />
          <PublicRoute exact path='/complete-profile' component={CompleteProfile} />
          <PrivateRoute exact path='/' component={asyncComponent(Welcome)} />
          <PrivateRoute exact path='/profile-selection' component={asyncComponent(ProfileSelection)} />
          <PrivateRoute exact path='/my-profile' component={asyncComponent(MyProfile)} />
          <PrivateRoute exact path='/my-accounts' component={asyncComponent(Accounts)} />
          <PrivateRoute exact path='/currency-exchange' component={asyncComponent(Exchange)} />
          <PrivateRoute path='/dashboard' component={asyncComponent(Dashboard)} />
        </Switch>
      </ScrollToTop>
      <Alert />
    </Router>
  );
}

export default App;

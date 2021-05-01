import { useEffect, lazy } from 'react';
import { Switch, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserInit, getProfilesInit } from './store/actions';
import history from './shared/history';

import Alert from './core/components/UI/Alert';
import ScrollToTop from './hoc/ScrollToTop';
import asyncComponent from './hoc/AsyncComponent';

// ROUTING
import PublicRoute from './routing/PublicRoute';
import PrivateRoute from './routing/PrivateRoute';

// PUBLIC
import Signup from './auth/containers/Signup';
import RecoverPassword from './auth/containers/RecoverPassword';
import ChangePassword from './auth/containers/ChangePassword';
import CompleteProfile from './auth/containers/CompleteProfile';

// PRIVATE
import ProfileSelection from './profile/containers/Selection';
import Welcome from './welcome/containers/Welcome';
import Dashboard from './dashboard/containers/Dashboard';
import MyProfile from './profile/containers/Profile';
import Accounts from './accounts/containers/Accounts';
import Exchange from './exchange/containers/Exchange';

const Signin = lazy(() => import('./auth/containers/Signin'));

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isAuth);

  useEffect(() => {
    dispatch(loadUserInit());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) dispatch(getProfilesInit());
  }, [dispatch, isAuth]);

  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <PublicRoute exact path='/signin' component={asyncComponent(Signin)} />
          <PublicRoute exact path='/signup' component={Signup} />
          <PublicRoute exact path='/recover-password' component={RecoverPassword} />
          <PublicRoute exact path='/change-password' component={ChangePassword} />
          <PublicRoute exact path='/complete-profile' component={CompleteProfile} />
          <PrivateRoute exact path='/' component={Welcome} />
          <PrivateRoute exact path='/profile-selection' component={ProfileSelection} />
          <PrivateRoute exact path='/my-profile' component={MyProfile} />
          <PrivateRoute exact path='/my-accounts' component={Accounts} />
          <PrivateRoute exact path='/currency-exchange' component={Exchange} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
        </Switch>
      </ScrollToTop>
      <Alert />
    </Router>
  );
}

export default App;

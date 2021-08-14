import { useEffect, lazy } from "react";
import { Switch, Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserInit, getProfilesInit, selectProfileInit } from "./store/actions";
import ReactPixel from "react-facebook-pixel";
import history from "./shared/history";

import Alert from "./core/components/UI/alert.component";
import ScrollToTop from "./hoc/scroll-top.component";
import asyncComponent from "./hoc/async.component";

// ROUTING
import PublicRoute from "./routing/PublicRoute";
import PrivateRoute from "./routing/PrivateRoute";

// PUBLIC
import Signin from "./auth/containers/signin.screen";
import Signup from "./auth/containers/signup.screen";
import { EmailValidationScreen } from "./auth/containers/email-validation.screen";
import RecoverPassword from "./auth/containers/recover-password.screen";
import ChangePassword from "./auth/containers/change-password.screen";
import CompleteProfile from "./auth/containers/complete-profile.screen";

// PRIVATE

const ProfileSelection = lazy(() => import("./profile/containers/selection.screen"));
const Welcome = lazy(() => import("./welcome/containers/Welcome"));
const Dashboard = lazy(() => import("./dashboard/containers/dashboard.screen"));
const Affiliates = lazy(() => import("./affiliates/affiliates.screen"));
const MyProfile = lazy(() => import("./profile/containers/profile.screen"));
const Accounts = lazy(() => import("./accounts/containers/accounts.screen"));
const Exchange = lazy(() => import("./exchange/containers/exchange.screen"));

ReactPixel.init(process.env.REACT_APP_FB_PIXEL_ID, {}, { autoConfig: true, debug: false });

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  const profileSelected = JSON.parse(sessionStorage.getItem("profileSelected"));

  useEffect(() => {
    dispatch(loadUserInit());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getProfilesInit());
      if (profileSelected) dispatch(selectProfileInit(null, profileSelected));
    }
  }, [dispatch, isAuth, profileSelected]);

  useEffect(() => {
    ReactPixel.pageView();
  }, []);

  return (
    <>
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <PublicRoute exact path="/signin" component={Signin} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute exact path="/email-verification" component={EmailValidationScreen} />
            <PublicRoute exact path="/recover-password" component={RecoverPassword} />
            <PublicRoute exact path="/change-password" component={ChangePassword} />
            <PublicRoute exact path="/complete-profile" component={CompleteProfile} />
            <PrivateRoute exact path="/" component={asyncComponent(Welcome)} />
            <PrivateRoute exact path="/profile-selection" component={asyncComponent(ProfileSelection)} />
            <PrivateRoute exact path="/my-profile" component={asyncComponent(MyProfile)} />
            <PrivateRoute exact path="/affiliate-program" component={asyncComponent(Affiliates)} />
            <PrivateRoute exact path="/my-accounts" component={asyncComponent(Accounts)} />
            <PrivateRoute path="/currency-exchange" component={asyncComponent(Exchange)} />
            <PrivateRoute path="/dashboard" component={asyncComponent(Dashboard)} />
          </Switch>
        </ScrollToTop>
      </Router>
      <Alert />
    </>
  );
}

export default App;

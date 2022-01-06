import { useEffect, lazy } from "react";
import { Switch, Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserInit } from "./store/actions";
import ReactPixel from "react-facebook-pixel";
import history from "./shared/history";

import Alert from "./components/UI/alert.component";
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
const Welcome = lazy(() => import("./welcome/containers/Welcome"));
const Dashboard = lazy(() => import("./dashboard/containers/dashboard.screen"));
const Affiliates = lazy(() => import("./affiliates/affiliates.screen"));
const MyProfile = lazy(() => import("./profile/containers/profile.screen"));
const Accounts = lazy(() => import("./accounts/containers/accounts.screen"));
const Exchange = lazy(() => import("./exchange/containers/exchange.screen"));

ReactPixel.init(process.env.REACT_APP_FB_PIXEL_ID, {}, { autoConfig: true, debug: false });

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserInit());
  }, [dispatch]);

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
            <PublicRoute path="/email-verification/:type" component={EmailValidationScreen} />
            <PublicRoute exact path="/recover-password" component={RecoverPassword} />
            <PublicRoute exact path="/change-password" component={ChangePassword} />
            <PublicRoute exact path="/complete-profile" component={CompleteProfile} />
            <PrivateRoute exact path="/" component={asyncComponent(Welcome)} />
            <PrivateRoute path="/my-profile" component={asyncComponent(MyProfile)} />
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

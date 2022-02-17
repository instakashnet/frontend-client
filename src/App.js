import { useEffect, lazy } from "react";
import { Switch, Router } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import history from "./shared/history";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { setIsClosedInit, setIsClosedSuccess } from "./store/actions";

// HOC
import ScrollToTop from "./hoc/scroll-top.component";
import { RefreshSession } from "./hoc/refresh-session.component";
import asyncComponent from "./hoc/async.component";

// COMPONENTS
import Alert from "./components/UI/alert.component";
import { ClosedModal } from "./components/UI/modals/closed-modal.component";

// ROUTING
import PublicRoute from "./routing/PublicRoute";
import PrivateRoute from "./routing/PrivateRoute";

// PUBLIC
import Signin from "./pages/auth/containers/signin.screen";
import Signup from "./pages/auth/containers/signup.screen";
import { EmailValidationScreen } from "./pages/auth/containers/email-validation.screen";
import RecoverPassword from "./pages/auth/containers/recover-password.screen";
import ChangePassword from "./pages/auth/containers/change-password.screen";
import CompleteProfile from "./pages/auth/containers/complete-profile.screen";

// PRIVATE
const Welcome = lazy(() => import("./pages/welcome/containers/welcome.screen"));
const Dashboard = lazy(() => import("./pages/dashboard/containers/dashboard.screen"));
const Affiliates = lazy(() => import("./pages/affiliates/affiliates.screen"));
const MyProfile = lazy(() => import("./pages/profile/containers/profile.screen"));
const Accounts = lazy(() => import("./pages/accounts/containers/accounts.screen"));
const Exchange = lazy(() => import("./pages/exchange/containers/exchange.screen"));

ReactPixel.init(process.env.REACT_APP_FB_PIXEL_ID, {}, { autoConfig: true, debug: false });

function App() {
  const dispatch = useDispatch(),
    isClosed = useSelector((state) => state.Data.isClosed),
    isAuth = useSelector((state) => state.Auth.isAuth);

  // EFFECTS
  useEffect(() => {
    ReactPixel.pageView();
  }, []);

  useEffect(() => {
    if (isAuth) dispatch(setIsClosedInit());
  }, [dispatch, isAuth]);

  return (
    <>
      <Router history={history}>
        <RefreshSession>
          <ScrollToTop />
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
        </RefreshSession>
        <Alert />
        {isClosed && <ClosedModal onClose={() => dispatch(setIsClosedSuccess(false))} />}
      </Router>
    </>
  );
}

export default App;

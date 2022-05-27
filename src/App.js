import { lazy, useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
// REACT REDUX
import { useDispatch, useSelector } from "react-redux";
// REACT ROUTER
import { Route, Router, Switch } from "react-router-dom";
// COMPONENT
import { ClosedModal } from "./components/UI/modals/closed-modal.component";
// HOC
import asyncComponent from "./hoc/async.component";
import { RefreshSession } from "./hoc/refresh-session.component";
import ScrollToTop from "./hoc/scroll-top.component";
import { SnackbarConfigurator } from "./hoc/snackbar-configurator.component";
// PUBLIC
import ChangePassword from "./pages/auth/containers/change-password.screen";
import CompleteProfile from "./pages/auth/containers/complete-profile.screen";
import { EmailValidationScreen } from "./pages/auth/containers/email-validation.screen";
import RecoverPassword from "./pages/auth/containers/recover-password.screen";
import Signin from "./pages/auth/containers/signin.screen";
import Signup from "./pages/auth/containers/signup.screen";
// ERROR 404
import Error404 from "./pages/errors/containers/error-404.screen.js";
// ROUTING
import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";
// DYNAMIC IMPORTS HANDLER
import { importsHandler } from "./shared/functions";
// HISTORY
import history from "./shared/history";
// REDUX ACTIONS
import { setIsClosedInit, setIsClosedSuccess } from "./store/actions";

// PRIVATE
const Welcome = lazy(() => importsHandler(() => import("./pages/welcome/containers/welcome.screen")));
const Dashboard = lazy(() => importsHandler(() => import("./pages/dashboard/containers/dashboard.screen")));
const Affiliates = lazy(() => importsHandler(() => import("./pages/affiliates/containers/affiliates.screen")));
const MyProfile = lazy(() => importsHandler(() => import("./pages/profile/containers/profile.screen")));
const Accounts = lazy(() => importsHandler(() => import("./pages/accounts/containers/accounts.screen")));
const Exchange = lazy(() => importsHandler(() => import("./pages/exchange/containers/exchange.screen")));

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
            {/* PUBLIC ROUTES */}
            <PublicRoute exact path="/signin" component={Signin} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute path="/email-verification/:type" component={EmailValidationScreen} />
            <PublicRoute exact path="/recover-password" component={RecoverPassword} />
            <PublicRoute exact path="/change-password" component={ChangePassword} />
            <PublicRoute exact path="/complete-profile" component={CompleteProfile} />

            {/* PRIVATE ROUTES */}
            <PrivateRoute exact path="/" component={asyncComponent(Welcome)} />
            <PrivateRoute path="/my-profile" component={asyncComponent(MyProfile)} />
            <PrivateRoute exact path="/affiliate-program" component={asyncComponent(Affiliates)} />
            <PrivateRoute exact path="/my-accounts" component={asyncComponent(Accounts)} />
            <PrivateRoute path="/currency-exchange" component={asyncComponent(Exchange)} />
            <PrivateRoute path="/dashboard" component={asyncComponent(Dashboard)} />

            {/* ERROR ROUTE */}
            <Route path="*" component={Error404} />
          </Switch>
        </RefreshSession>
        {/* NOTISTACK ALERT */}
        <SnackbarConfigurator />
        {isClosed && <ClosedModal onClose={() => dispatch(setIsClosedSuccess(false))} />}
      </Router>
    </>
  );
}

export default App;

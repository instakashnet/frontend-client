import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDeviceDetect } from "../../../shared/hooks/useDeviceDetect";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../../store/actions";

// SCREENS
import Calculator from "./calculator.screen";
import Accounts from "./accounts.screen";
import Complete from "./complete.screen";
import ProfileSelection from "./selection.screen";

// COMPONENTS
import Information from "../components/information.component";
import CompleteProfile from "../components/profile-modal.component";
import { InfoButton } from "../components/info-button.component";
import Layout from "../../../components/layout/layout.component";
import { AddAccount } from "../../accounts/components/add-account.component";
import { SelectionHeader } from "../components/selection-header.component";
import Spinner from "../../../components/UI/spinner.component";

// CLASSES
import classes from "../assets/css/exchange-screens.module.scss";

const Exchange = ({ history, location, match }) => {
  // HOOKS & VARIABLES
  const dispatch = useDispatch(),
    user = useSelector((state) => state.Auth.user),
    profile = useSelector((state) => state.Profile.profileSelected),
    { isMobile } = useDeviceDetect(),
    isLoading = useSelector((state) => state.Exchange.isLoading),
    order = JSON.parse(sessionStorage.getItem("order"));

  // EFFECTS
  useEffect(() => {
    if (!profile) history.push("/currency-exchange/profile-selection");
  }, [profile, history]);

  useEffect(() => {
    if (location.pathname !== "/currency-exchange" || location.pathname !== "/currency-exchange/profile-selection") {
      window.addEventListener("beforeunload", preventLoad);
      window.scrollTo(0, 0);
      return () => {
        window.removeEventListener("beforeunload", preventLoad);
      };
    }
  }, [location]);

  useEffect(() => {
    let timer;

    if (location.pathname === "/currency-exchange/step-2") {
      timer = setTimeout(() => history.push("/currency-exchange"), 300000);
    } else timer && clearTimeout(timer);
    return () => timer && clearTimeout(timer);
  }, [location, history]);

  // HANDLERS
  const preventLoad = (e) => {
    e.preventDefault();
    if (e) e.returnValue = "¿Deseas salir del proceso de cambio de divisas?";
    return "";
  };

  const onCloseHandler = () => {
    history.push("/my-profile");
    dispatch(closeModal());
  };

  const openModalHandler = (type = null) => {
    let ModalComponent;

    if (type === "account") ModalComponent = () => <AddAccount title="Agregar cuenta" order={order} addType="orders" />;
    if (type === "complete") ModalComponent = () => <CompleteProfile title="Completar perfil" onClose={onCloseHandler} />;
    if (type === "info") ModalComponent = () => <Information title="¡IMPORTANTE!" onClose={() => dispatch(closeModal())} />;

    dispatch(openModal(ModalComponent));
  };

  return (
    <Layout className="content-center">
      <div className={classes.Exchange}>
        {profile ? (
          <>
            {match.isExact && (
              <>
                <SelectionHeader profile={profile} />
                <div className={classes.Separator} />
              </>
            )}
            <Route exact path={match.url}>
              <Calculator profile={profile} setModal={openModalHandler} user={user} />
            </Route>
            <Route path={match.url + "/step-2"}>
              <Accounts order={order} setModal={openModalHandler} />
            </Route>
            <Route path={match.url + "/complete"}>
              <Complete order={order} />
            </Route>
          </>
        ) : (
          <Route path={match.url + "/profile-selection"}>
            <ProfileSelection />
          </Route>
        )}
        {profile && (!isMobile ? <Information /> : <InfoButton onInfoOpen={() => openModalHandler("info")} />)}
      </div>
      {isLoading && <Spinner loading={isLoading} />}
    </Layout>
  );
};

export default Exchange;

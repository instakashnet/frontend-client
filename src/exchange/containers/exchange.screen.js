import React, { useEffect } from "react";
import { useDeviceDetect } from "../../shared/hooks/useDeviceDetect";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { getRatesInit, validateCouponInit, getLastOrderInit, openModal, closeModal } from "../../store/actions";

// SCREENS
import Calculator from "./calculator.screen";
import Accounts from "./accounts.screen";
import Complete from "./complete.screen";
import ProfileSelection from "./selection.screen";

// COMPONENTS
import Layout from "../../components/layout/layout.component";
import { AddAccount } from "../../accounts/components/add-account.component";
import Information from "../components/information.component";
import CompleteProfile from "../components/profile-modal.component";
import { InfoButton } from "../components/info-button.component";
import Spinner from "../../components/UI/spinner.component";
import { SelectionHeader } from "../components/selection-header.component";

import classes from "../assets/css/exchange-screens.module.scss";

const Exchange = ({ history, location, match }) => {
  const dispatch = useDispatch(),
    isLoading = useSelector((state) => state.Exchange.isLoading),
    user = useSelector((state) => state.Auth.user),
    profile = useSelector((state) => state.Profile.profileSelected),
    { isMobile } = useDeviceDetect(),
    order = JSON.parse(sessionStorage.getItem("order"));

  // EFFECTS
  useEffect(() => {
    if (!profile) return history.push("/currency-exchange/profile-selection");
  }, [profile, history]);

  useEffect(() => {
    dispatch(getLastOrderInit());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/currency-exchange" && !order) {
      dispatch(getRatesInit());
      if (user.isReferal) dispatch(validateCouponInit("NUEVOREFERIDO1", profile?.type));
    }
  }, [location, dispatch, order, profile, user.isReferal]);

  useEffect(() => {
    if (order && order.status === 2 && location.pathname !== "/currency-exchange/complete") history.push("/currency-exchange/complete");
  }, [history, order, location]);

  useEffect(() => {
    if (location.pathname !== "/currency-exchange") {
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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.Exchange}>
          {match.isExact && (
            <>
              <SelectionHeader profile={profile} />
              <div className={classes.Separator} />
            </>
          )}
          <Route exact path={match.url + "/profile-selection"}>
            <ProfileSelection />
          </Route>
          <Route exact path={match.url}>
            <Calculator profile={profile} setModal={openModalHandler} />
          </Route>
          <Route path={match.url + "/step-2"}>
            <Accounts order={order} setModal={openModalHandler} />
          </Route>
          <Route path={match.url + "/complete"}>
            <Complete order={order} />
          </Route>
          {profile && (!isMobile ? <Information /> : <InfoButton onInfoOpen={() => openModalHandler("info")} />)}
        </div>
      )}
    </Layout>
  );
};

export default Exchange;

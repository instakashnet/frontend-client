import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import {
  getBanksInit,
  getRatesInit,
  validateCouponInit,
  getLastOrderInit,
  getCurenciesInit,
  getAccountsInit,
  getKashAccountInit,
  openModal,
  closeModal,
} from "../../store/actions";
import { useProfileInfo } from "../../shared/hooks/useProfileInfo";

import Calculator from "./calculator.screen";
import Accounts from "./accounts.screen";
import Complete from "./complete.screen";

import Layout from "../../components/layout/layout.component";
import { AddAccount } from "../../accounts/components/add-account.component";
import Information from "../components/information.component";
import CompleteProfile from "../components/profile-modal.component";
import { InfoButton } from "../components/info-button.component";
import Spinner from "../../components/UI/spinner.component";

import classes from "../assets/css/exchange-screens.module.scss";

const Exchange = ({ history, location, match }) => {
  const dispatch = useDispatch();
  const order = JSON.parse(sessionStorage.getItem("order"));
  const { profileInfo } = useProfileInfo();
  const isLoading = useSelector((state) => state.Exchange.isLoading);
  const { type: profileType } = profileInfo;

  useEffect(() => {
    dispatch(getBanksInit());
    dispatch(getCurenciesInit());
    dispatch(getAccountsInit("orders"));
    dispatch(getKashAccountInit());
    dispatch(getLastOrderInit());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/currency-exchange" && !order) {
      dispatch(getRatesInit());
      dispatch(validateCouponInit("NUEVOREFERIDO1", profileType));
    }
  }, [location, dispatch, order, profileType]);

  const preventLoad = (e) => {
    e.preventDefault();
    if (e) e.returnValue = "¿Deseas salir del proceso de cambio de divisas?";
    return "";
  };

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
          <Route exact path={match.url}>
            <Calculator profile={profileInfo} setModal={openModalHandler} />
          </Route>
          <Route path={match.url + "/step-2"}>
            <Accounts order={order} setModal={openModalHandler} />
          </Route>
          <Route path={match.url + "/complete"}>
            <Complete order={order} />
          </Route>
          {!isMobile && <Information />}
          {isMobile && <InfoButton onInfoOpen={() => openModalHandler("info")} />}
        </div>
      )}
    </Layout>
  );
};

export default Exchange;

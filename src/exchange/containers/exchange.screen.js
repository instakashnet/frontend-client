import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { getBanksInit, getCurenciesInit, getAccountsInit, getKashAccountInit, openModal, closeModal } from "../../store/actions";

import Calculator from "./calculator.screen";
import Accounts from "./accounts.screen";
import Complete from "./complete.screen";

import Layout from "../../core/components/layout/layout.component";
import AddAccount from "../../accounts/components/forms/add-account.component";
import Information from "../components/information.component";
import CompleteProfile from "../components/profile-modal.component";
import { InfoButton } from "../components/info-button.component";

import classes from "../assets/css/exchange-screens.module.scss";

const Exchange = ({ history, match }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const profileSelected = JSON.parse(sessionStorage.getItem("profileSelected"));
  const order = useSelector((state) => state.Exchange.order);

  useEffect(() => {
    dispatch(getBanksInit());
    dispatch(getCurenciesInit());
    dispatch(getAccountsInit("orders"));
    dispatch(getKashAccountInit());
  }, [dispatch]);

  useEffect(() => {
    if (step > 0) {
      window.addEventListener("beforeunload", preventLoad);
      window.scrollTo(0, 0);
      return () => {
        window.removeEventListener("beforeunload", preventLoad);
      };
    }
  }, [step]);

  const preventLoad = (e) => {
    e.preventDefault();
    if (e) e.returnValue = "¿Deseas salir del proceso de cambio de divisas?";
    return "";
  };

  useEffect(() => {
    let timer;

    if (step === 1) timer = setTimeout(() => setStep(0), 300000);

    return () => clearTimeout(timer);
  }, [step, order, dispatch]);

  const onCloseHandler = () => {
    history.push("/my-profile");
    dispatch(closeModal());
  };

  console.log(match.url);

  const openModalHandler = (type = null) => {
    let ModalComponent;

    if (type === "account") ModalComponent = () => <AddAccount order={order} accType="orders" />;
    if (type === "complete") ModalComponent = () => <CompleteProfile onClose={onCloseHandler} />;
    if (type === "info") ModalComponent = () => <Information onClose={() => dispatch(closeModal())} />;

    dispatch(openModal(ModalComponent));
  };

  console.log(match.url + "/step-2");

  return (
    <Layout className="content-center">
      <div className={classes.Exchange}>
        <Route exact path={match.url}>
          <Calculator profile={profileSelected} setModal={openModalHandler} />
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
    </Layout>
  );
};

export default Exchange;

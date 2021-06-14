import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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

const Exchange = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const profileSelected = JSON.parse(sessionStorage.getItem("profileSelected"));
  const order = useSelector((state) => state.Exchange.order);
  const profiles = useSelector((state) => state.Profile.profiles);
  const naturalProfile = profiles.find((profile) => profile.type === "natural");
  const profile = {
    ...profileSelected,
    first_name: naturalProfile.first_name,
    last_name: naturalProfile.last_name,
    document_type: naturalProfile.document_type,
    document_identification: naturalProfile.document_identification,
    identity_photo: naturalProfile.identity_photo,
    identity_photo_two: naturalProfile.identity_photo_two,
  };

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

  const openModalHandler = (type = null) => {
    let ModalComponent;

    if (type === "account") ModalComponent = () => <AddAccount order={order} accType="orders" />;
    if (type === "complete") ModalComponent = () => <CompleteProfile onClose={onCloseHandler} />;
    if (type === "info") ModalComponent = () => <Information onClose={() => dispatch(closeModal())} />;

    dispatch(openModal(ModalComponent));
  };

  const pages = [
    <Calculator profile={profile} setModal={openModalHandler} setStep={setStep} />,
    <Accounts order={order} setModal={openModalHandler} setStep={setStep} />,
    <Complete order={order} />,
  ];

  return (
    <Layout className="content-center">
      <div className={classes.Exchange}>
        {pages[step]}
        {!isMobile && <Information />}
        {isMobile && <InfoButton onInfoOpen={() => openModalHandler("info")} />}
      </div>
    </Layout>
  );
};

export default Exchange;

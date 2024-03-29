import React, { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// REACT ROUTER
import { Route } from "react-router-dom";
// COMPONENTS
import Layout from "../../../components/layout/layout.component";
import { Modal } from "../../../components/UI/modals/modal.component";
import Spinner from "../../../components/UI/spinner.component";
// HOOK
import { useDeviceDetect } from "../../../shared/hooks/useDeviceDetect";
// REDUX ACTIONS
import { closeModal, openModal } from "../../../store/actions";
// COMPONENTS
import { AddAccount } from "../../accounts/components/add-account.component";
import { InfoButton } from "../components/info-button.component";
import Information from "../components/information.component";
import CompleteProfile from "../components/profile-modal.component";
import { SelectionHeader } from "../components/selection-header.component";
import { Steps } from "../components/steps.component";
// SCREENS
import Accounts from "./accounts.screen";
import Calculator from "./calculator.screen";
import Complete from "./complete.screen";
// CLASSES
import classes from "./modules/exchange.screen.module.scss";
// SCREEN
import ProfileSelection from "./selection.screen";
import { TransferCodeScreen } from "./transfer-code.screen";

const Exchange = ({ history, location, match }) => {
  // HOOKS & VARIABLES
  const dispatch = useDispatch(),
    user = useSelector((state) => state.Auth.user),
    profile = useSelector((state) => state.Profile.profileSelected),
    ModalComponent = useSelector((state) => state.Modal.Component),
    { isMobile } = useDeviceDetect(),
    { isLoading, order } = useSelector((state) => state.Exchange);

  // EFFECTS
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
    let modalContent;
    if (type === "account") modalContent = () => <AddAccount title="Agregar cuenta" order={order} addType="orders" />;
    if (type === "complete") modalContent = () => <CompleteProfile title="Completar perfil" onClose={onCloseHandler} />;
    if (type === "info") modalContent = () => <Information title="¡IMPORTANTE!" onClose={() => dispatch(closeModal())} />;
    dispatch(openModal(modalContent));
  };

  return (
    <Layout className="content-center">
      <div className={classes.Exchange}>
        {match.isExact ? (
          <>
            <SelectionHeader profile={profile} />
            <div className={classes.Separator} />
          </>
        ) : (
          !location.pathname.includes("profile") && <Steps location={location.pathname} />
        )}
        <Route exact path={match.url}>
          <Calculator profile={profile} setModal={openModalHandler} user={user} />
        </Route>
        <Route path={match.url + "/step-2"}>
          <Accounts setModal={openModalHandler} />
        </Route>
        <Route path={match.url + "/complete"}>
          <Complete />
        </Route>
        <Route path={match.url + "/transfer-code"}>
          <TransferCodeScreen />
        </Route>
        <Route path={match.url + "/profile-selection"}>
          <ProfileSelection />
        </Route>
        {profile && !location.pathname.includes("profile") && (!isMobile ? <Information /> : <InfoButton onInfoOpen={() => openModalHandler("info")} />)}
      </div>
      {isLoading && <Spinner loading={isLoading} />}
      {ModalComponent && (
        <Modal {...ModalComponent().props}>
          <ModalComponent />
        </Modal>
      )}
    </Layout>
  );
};
export default Exchange;

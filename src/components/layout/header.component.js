import React from "react";
import { useDispatch, useSelector } from "react-redux";
// REDUX ACTIONS
import { openSliderModal, toggleNav } from "../../store/actions";
// COMPONENTS
import Logo from "../UI/logo.component";
import ProfileInfo from "../UI/profile-info.component";
import Whatsapp from "../UI/whatsapp.component";
// CLASSES
import classes from "./modules/header.module.scss";
// COMPONENTS
import ProfileNavigation from "./navigation/profile-navigation.component";

const Header = ({ containerRef }) => {
  const dispatch = useDispatch(),
    user = useSelector((state) => state.Auth.user);

  const ModalComponent = () => <ProfileNavigation />;

  const openNav = () => dispatch(openSliderModal(ModalComponent));

  return (
    <div className={classes.Header} ref={containerRef}>
      <button onClick={() => dispatch(toggleNav())} className={classes.NavButton}>
        <span />
        <span />
        <span />
      </button>
      <Logo className="lg:w-52 md:w-44 w-40 mr-4 hidden md:block" />
      <div className={classes.Hours}>
        <p>
          Lunes a Sábado: 9am - 7pm
          <br />
          Domingos y Feriados: Cerrados
        </p>
      </div>
      <div className="flex items-center ml-auto">
        <a href="https://wa.link/05keps" target="_blank" rel="noopener noreferrer">
          <Whatsapp />
        </a>
        <ProfileInfo user={user} openNav={openNav} />
      </div>
    </div>
  );
};

export default React.memo(Header);

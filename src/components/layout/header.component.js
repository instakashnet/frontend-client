import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav, openSliderModal } from "../../store/actions";

import Whatsapp from "../UI/whatsapp.component";
import ProfileInfo from "../UI/profile-info.component";
import ProfileNavigation from "./navigation/profile-navigation.component";
import Logo from "../UI/logo.component";

import classes from "./layout-components.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.Profile);
  const profileSelected = JSON.parse(sessionStorage.getItem("profileSelected"));

  const openNav = () => dispatch(openSliderModal(ProfileNavigation));

  return (
    <div className={classes.Header}>
      <button onClick={() => dispatch(toggleNav())} className={classes.NavButton}>
        <span />
        <span />
        <span />
      </button>
      <Logo className="lg:w-52 md:w-44 w-40 mr-4 hidden md:block" />
      <div className={classes.Hours}>
        <p>Lunes a Viernes: 9am a 7pm</p>
        <p>Sábados y feriados: 9am a 2:30pm</p>
      </div>
      <div className="flex items-center ml-auto">
        <a href="https://wa.link/05keps" target="_blank" rel="noopener noreferrer">
          <Whatsapp />
        </a>
        <ProfileInfo main={profiles.find((profile) => profile.type === "natural")} openNav={openNav} selected={profileSelected} />
      </div>
    </div>
  );
};

export default React.memo(Header);

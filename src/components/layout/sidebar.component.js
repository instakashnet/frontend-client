import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDeviceDetect } from "../../shared/hooks/useDeviceDetect";
import { toggleNav } from "../../store/actions";

import Navigation from "./navigation/nav-items.component";
import Backdrop from "../UI/backdrop.component";
import Affiliate from "./affiliate-card.component";
import Logo from "../UI/logo.component";

import classes from "./layout-components.module.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const opened = useSelector((state) => state.Nav.opened);
  const usercode = useSelector((state) => state.Auth.userCode);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    if (opened) dispatch(toggleNav());
    // eslint-disable-next-line
  }, [location, dispatch]);

  useEffect(() => {
    if (opened) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, [opened]);

  return (
    <>
      <div className={`${classes.Sidebar} ${opened ? classes.Open : ""}`}>
        <Logo className={classes.Logo} />
        <Navigation />
        <Affiliate usercode={usercode} />
      </div>
      {isMobile && <Backdrop opened={opened} onClick={() => dispatch(toggleNav())} />}
    </>
  );
};

export default React.memo(Sidebar);

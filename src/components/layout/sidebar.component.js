import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { useDeviceDetect } from "../../shared/hooks/useDeviceDetect";
import { toggleNav } from "../../store/actions";
import Backdrop from "../UI/backdrop.component";
import Logo from "../UI/logo.component";
import Affiliate from "./affiliate-card.component";
import classes from "./modules/sidebar.module.scss";
import Navigation from "./navigation/nav-items.component";

const Sidebar = ({ headerVisible }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const opened = useSelector((state) => state.Nav.opened);
  const user = useSelector((state) => state.Auth.user);
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
        <Logo className={`${classes.Logo} ${headerVisible && classes.Invisible}`} />
        <Navigation />
        <Affiliate usercode={user.username} />
      </div>
      {isMobile && <Backdrop opened={opened} onClick={() => dispatch(toggleNav())} />}
    </>
  );
};

export default React.memo(Sidebar);

import React from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";

// ASSETS
import AdditionalInfo from "../../../assets/images/icons/additional-info.svg";
import Profile from "../../../assets/images/icons/avatar.svg";
import Help from "../../../assets/images/icons/help.svg";
import Logout from "../../../assets/images/icons/logout.svg";
import VerifyIdentity from "../../../assets/images/icons/verify-identity.svg";
// HOOK
import { useUserData } from "../../../shared/hooks/useProfileInfo";
// REDUX ACTION
import { logoutInit } from "../../../store/actions";
// CLASSES
import classes from "../modules/profile-nav.module.scss";
// COMPONENT
import NavItem from "./nav-item.component";

const ProfileNavigation = () => {
  const dispatch = useDispatch(),
    user = useSelector((state) => state.Auth.user),
    { Avatar } = useUserData(user);

  return (
    <div className={classes.ProfileNavigation}>
      <div className={classes.ProfileInfo}>
        <div className={classes.ProfileImg}>
          <img src={Avatar} alt="profile" />
        </div>
        <div className="text-left flex flex-col items-start">
          <h3>{user.name.split(" ")[0] + " " + user.name.split(" ")[1]}</h3>
          <p>Usuario completado</p>
        </div>
      </div>
      <nav>
        <ul>
          <NavItem label="Datos básicos" icon={Profile} link="/my-profile" />
          {user.level < 3 && <NavItem label="Verificar identidad" icon={VerifyIdentity} link="/my-profile/verify-identity" />}
          <NavItem label="Datos Adicionales" icon={AdditionalInfo} link="/my-profile/additionals" />
          <a href="https://instakash.net/faq" target="_blank" rel="noopener noreferrer" className={classes.NavItem}>
            <img src={Help} alt="centro-de-ayuda" width={26} className="mr-3" />
            Centro de ayuda
          </a>
        </ul>
        <button className="flex items-center" onClick={() => dispatch(logoutInit())}>
          <img src={Logout} alt="cerrar-sesión" width={20} className="mr-3" />
          Cerrar sesión
        </button>
      </nav>
    </div>
  );
};

export default React.memo(ProfileNavigation);

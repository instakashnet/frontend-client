import React from "react";
import { useUserData } from "../../../shared/hooks/useProfileInfo";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { logoutInit } from "../../../store/actions";

import NavItem from "./nav-item.component";
import ProgressBar from "../../UI/progress-bar.component";

// ASSETS
import Profile from "../../../assets/images/icons/avatar.svg";
import ChangeProfile from "../../../assets/images/icons/profiles.svg";
import Logout from "../../../assets/images/icons/logout.svg";

import classes from "./navigation-components.module.scss";

const ProfileNavigation = () => {
  const dispatch = useDispatch(),
    user = useSelector((state) => state.Auth.user),
    { completed, Avatar } = useUserData(user);

  return (
    <div className={classes.ProfileNavigation}>
      <div className={classes.ProfileInfo}>
        <div className={classes.ProfileImg}>
          <img src={Avatar} alt="profile" />
        </div>
        <div className="text-left flex flex-col items-start">
          <h3>{user.name}</h3>
        </div>
      </div>
      <div className={classes.ProfileProgress}>
        <h3>Usuario completado</h3>
        <ProgressBar width={completed} />
      </div>
      <nav className="w-full mt-8">
        <ul>
          <NavItem label="Ver perfil" icon={Profile} link="/my-profile" />
          <NavItem label="Cambiar perfil" icon={ChangeProfile} link="/profile-selection" />
          <li>
            <button className="flex items-center" onClick={() => dispatch(logoutInit())}>
              <img src={Logout} alt="cerrar-sesión" width={20} className="mr-3" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(ProfileNavigation);

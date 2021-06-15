import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutInit } from "../../../../store/actions";
import { useProfileInfo } from "../../../../shared/hooks/useProfileInfo";

import NavItem from "./nav-item.component";
import ProgressBar from "../../UI/progress-bar.component";

import Male from "../../../assets/images/profiles/male.svg";
import Female from "../../../assets/images/profiles/female.svg";
import Company from "../../../assets/images/profiles/company.svg";
import Profile from "../../../assets/images/icons/avatar.svg";
import ChangeProfile from "../../../assets/images/icons/profiles.svg";
import Logout from "../../../assets/images/icons/logout.svg";

import classes from "./navigation-components.module.scss";

const ProfileNavigation = () => {
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.Profile);
  const profileSelected = JSON.parse(sessionStorage.getItem("profileSelected"));
  const { profileInfo, profileCompleted } = useProfileInfo(profiles, profileSelected);

  let Avatar = profileInfo.identity_sex === "male" ? Male : Female;
  let profileName = `${profileInfo.first_name} ${profileInfo.last_name}`;
  let profileType = "Usuario";

  if (profileInfo.type === "juridica") {
    Avatar = Company;
    profileName = profileInfo.razon_social;
    profileType = "Empresa";
  }

  return (
    <div className={classes.ProfileNavigation}>
      <div className={classes.ProfileInfo}>
        <div className={classes.ProfileImg}>
          <img src={Avatar} alt="profile" />
        </div>
        <div className="text-left flex flex-col items-start">
          <h3>{profileName}</h3>
          <p>{profileType}</p>
        </div>
      </div>
      {profileInfo.selected && (
        <div className={classes.ProfileProgress}>
          <h3>Progreso de tu perfil</h3>
          <ProgressBar width={profileCompleted} />
        </div>
      )}
      <nav className="w-full mt-8">
        <ul>
          {profileInfo.selected && <NavItem label="Ver perfil" icon={Profile} link="/my-profile" />}
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

import React from "react";
import { useDeviceDetect } from "../../shared/hooks/useDeviceDetect";
import { useUserData } from "../../shared/hooks/useProfileInfo";

import Arrow from "../../assets/images/icons/arrow.svg";

import classes from "./ui-components.module.scss";

const ProfileInfo = ({ user, openNav }) => {
  const { isMobile } = useDeviceDetect(),
    { Avatar } = useUserData();

  let firstName = user.name.split(" ")[0];

  return (
    <div className="flex items-center ml-4 md:ml-6">
      <div className={`${classes.ProfilePhoto} md:mr-3`}>{Avatar && <img src={Avatar} alt="profile" />}</div>
      {!isMobile && (
        <p className={classes.ProfileInfo}>
          <span className="font-bold">Hola</span>, <br /> {firstName}
        </p>
      )}
      <button onClick={openNav} className="p-2 ml-2 md:ml-4 outline-none">
        <img src={Arrow} alt="arrow-down" className="w-4" />
      </button>
    </div>
  );
};

export default ProfileInfo;

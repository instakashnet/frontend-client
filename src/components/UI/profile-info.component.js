import React from "react";
import { useDeviceDetect } from "../../shared/hooks/useDeviceDetect";

import Male from "../../assets/images/profiles/male.svg";
import Female from "../../assets/images/profiles/female.svg";
import Company from "../../assets/images/profiles/company.svg";
import Arrow from "../../assets/images/icons/arrow.svg";

import classes from "./ui-components.module.scss";

const ProfileInfo = ({ main, selected, openNav }) => {
  const { isMobile } = useDeviceDetect();

  let Avatar;
  let profileName;

  if (!selected && main) {
    Avatar = main.identity_sex === "male" ? Male : Female;
    profileName = `${main.first_name.split(" ")[0]} ${main.last_name.split(" ")[0]}`;
  }
  if (selected) {
    if (selected.type === "juridica") {
      Avatar = Company;
      profileName = selected.razon_social;
    } else {
      Avatar = selected.identity_sex === "male" ? Male : Female;
      profileName = `${selected.first_name.split(" ")[0]} ${selected.last_name.split(" ")[0]}`;
    }
  }

  return (
    <div className="flex items-center ml-4 md:ml-6">
      <div className={`${classes.ProfilePhoto} md:mr-3`}>{Avatar && <img src={Avatar} alt="profile" />}</div>
      {!isMobile && (
        <p className={classes.ProfileInfo}>
          <span className="font-bold">Hola</span>, <br /> {profileName}
        </p>
      )}
      <button onClick={openNav} className="p-2 ml-2 md:ml-4 outline-none">
        <img src={Arrow} alt="arrow-down" className="w-4" />
      </button>
    </div>
  );
};

export default ProfileInfo;

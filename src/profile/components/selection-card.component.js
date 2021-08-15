import React from "react";

import Male from "../../assets/images/profiles/male.svg";
import Female from "../../assets/images/profiles/female.svg";
import Company from "../../assets/images/profiles/company.svg";
import Add from "../../assets/images/profiles/add.svg";

import classes from "../assets/css/profile-components.module.scss";

const SelectionBox = ({ type, sex, name, onClick }) => {
  let Avatar = Male;
  if (type === "add") Avatar = Add;
  if (type === "juridica") Avatar = Company;
  if (type === "natural") sex === "male" ? (Avatar = Male) : (Avatar = Female);

  return (
    <div className="flex flex-col items-center">
      <button onClick={onClick} className={classes.SelectionCard}>
        <img src={Avatar} alt="profile" className={type === "add" ? classes.Add : ""} />
      </button>
      <p className="mt-3 w-36">{name}</p>
    </div>
  );
};

export default SelectionBox;

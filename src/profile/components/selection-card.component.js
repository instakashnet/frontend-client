import React from "react";

import MaleDark from "../../assets/images/profiles/male-dark.svg";
import FemaleDark from "../../assets/images/profiles/female-dark.svg";
import Company from "../../assets/images/profiles/company.svg";

import classes from "../assets/css/profile-components.module.scss";

const SelectionBox = ({ type, sex, name, onClick }) => {
  let Avatar = MaleDark;
  if (type === "juridica") Avatar = Company;
  if (type === "natural") sex === "male" ? (Avatar = MaleDark) : (Avatar = FemaleDark);

  return (
    <button onClick={onClick} className={classes.SelectionCard}>
      <h2>Perfil {type === "natural" ? "natural" : "empresa"}</h2>
      <img src={Avatar} alt="profile" />
      <p className="my-3">{name.toLowerCase()}</p>
      <p>Continuar como {type === "natural" ? "perfil natural" : "empresa"}</p>
    </button>
  );
};

export default SelectionBox;

import { HighlightOff } from "@material-ui/icons";
import React from "react";

// ASSETS & CLASSES
import Company from "../../../assets/images/profiles/company.svg";
import FemaleDark from "../../../assets/images/profiles/female-dark.svg";
import MaleDark from "../../../assets/images/profiles/male-dark.svg";
import classes from "./modules/selection-card.module.scss";

const SelectionBox = ({ type, sex, name, onSelect, onDisable }) => {
  let Avatar = MaleDark;
  if (type === "juridica") Avatar = Company;
  if (type === "natural") sex === "male" ? (Avatar = MaleDark) : (Avatar = FemaleDark);

  return (
    <div className={classes.SelectionCard}>
      {type !== "natural" && (
        <button onClick={onDisable} className={classes.DisableButton}>
          <HighlightOff htmlColor="#ff4b55" style={{ fontSize: 30 }} />
        </button>
      )}
      <button onClick={onSelect} className={classes.SelectionButton}>
        <h2>Perfil {type === "natural" ? "natural" : "empresa"}</h2>
        <img src={Avatar} alt="profile" />
        <p className="my-3">{name.toLowerCase()}</p>
        <p>Continuar como {type === "natural" ? "perfil natural" : "empresa"}</p>
      </button>
    </div>
  );
};

export default SelectionBox;

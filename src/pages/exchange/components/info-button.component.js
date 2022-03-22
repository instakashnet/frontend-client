import React from "react";
import { Info } from "@material-ui/icons";

import classes from "./modules/info-button.module.scss";

export const InfoButton = ({ onInfoOpen }) => {
  return <Info className={classes.InfoButton} size={30} onClick={onInfoOpen} />;
};

import React from "react";
import { Info } from "@material-ui/icons";

import classes from "../assets/css/exchange-components.module.scss";

export const InfoButton = ({ onInfoOpen }) => {
  return <Info className={classes.InfoButton} size={30} onClick={onInfoOpen} />;
};

import React from "react";
import { Info } from "react-feather";

import classes from "./Info.module.scss";

export const InfoButton = ({ onInfoOpen }) => {
  return <Info className={classes.InfoButton} size={30} onClick={onInfoOpen} />;
};

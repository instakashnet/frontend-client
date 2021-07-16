import React from "react";
import { convertHexToRGB } from "../../../shared/functions";

import classes from "./ui-components.module.scss";

export const StatusBadge = ({ name, color, className }) => {
  return (
    <div className={`${classes.StatusBadge} ${className || ""}`} style={{ backgroundColor: convertHexToRGB(color, 0.15), borderColor: color }}>
      {name}
    </div>
  );
};

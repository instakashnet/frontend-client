import React from "react";
import { AlertTriangle, Info } from "react-feather";

import classes from "./modal-components.module.scss";

const InfoModal = ({ type, children }) => {
  let IconType;

  if (type === "alert") IconType = <AlertTriangle size={60} className="error-msg mb-4" />;
  if (type === "info") IconType = <Info size={60} />;

  return (
    <div className={classes.InfoModal}>
      {IconType}
      <h2>Estimado usuario</h2>
      {children}
    </div>
  );
};

export default InfoModal;

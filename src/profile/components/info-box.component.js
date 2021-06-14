import React from "react";

import classes from "../assets/css/profile-components.module.scss";

const InfoItem = ({ label, children }) => {
  return (
    <div className={classes.InfoItem}>
      <h4>{label}</h4>
      <p className={classes.InfoBox}>{children}</p>
    </div>
  );
};

export default InfoItem;

import React from "react";

import classes from "../assets/css/affiliates-components.module.scss";

const Step = ({ img, title, className, children }) => {
  return (
    <div className={`${classes.Step} ${className || ""}`}>
      <img src={img} alt={title || "pasos"} />
      {title && <h4>{title}</h4>}
      {children}
    </div>
  );
};

export default Step;

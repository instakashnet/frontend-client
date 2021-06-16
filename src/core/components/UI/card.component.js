import React from "react";

import classes from "./ui-components.module.scss";

const Card = ({ className, children }) => {
  return <div className={`${classes.Card} ${className || ""}`}>{children}</div>;
};

export default Card;

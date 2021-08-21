import React from "react";

import classes from "./ui-components.module.scss";

const Card = ({ className, children, ...rest }) => {
  return (
    <div className={`${classes.Card} ${className || ""}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;

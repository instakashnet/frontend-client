import React from "react";

import classes from "./ui-components.module.scss";

export const Button = ({ type, onClick, className, children, ...rest }) => {
  return (
    <button type={type} onClick={onClick} className={`${classes.Button} ${className}`} {...rest}>
      {children}
    </button>
  );
};

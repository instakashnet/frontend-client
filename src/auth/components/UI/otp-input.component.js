import React from "react";

import classes from "../../assets/css/auth-components.module.scss";

export const OtpInput = ({ name, value, onChange, onBlur, touched, ...rest }) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`${classes.OtpInput} ${touched && !value ? classes.OtpError : ""}`}
      maxLength="1"
      placeholder=" "
      {...rest}
    />
  );
};

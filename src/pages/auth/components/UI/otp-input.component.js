import React from "react";

// CLASSES
import classes from "./modules/otp-input.module.scss";

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

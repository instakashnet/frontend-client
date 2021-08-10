import React from "react";

import classes from "../../assets/css/auth-components.module.scss";

export const OtpInput = ({ name, value, onChange, error, touched, ...rest }) => {
  return <input name={name} value={value} onChange={onChange} className={classes.OtpInput} maxLength="1" placeholder=" " {...rest} />;
};

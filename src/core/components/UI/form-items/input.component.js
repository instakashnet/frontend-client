import React from "react";

import classes from "./Form.module.scss";

const Input = ({ type, name, value, label, placeholder, error, touched, ...rest }) => {
  return (
    <div className={classes.FormGroup}>
      {label && <label>{label}</label>}
      <input type={type} name={name} value={value} placeholder={placeholder} className={error && touched ? classes.Error : ""} {...rest} />
      {error && touched && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default Input;

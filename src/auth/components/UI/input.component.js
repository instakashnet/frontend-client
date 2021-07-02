import React from "react";

import classes from "../../assets/css/auth-components.module.scss";

const Input = ({ placeholder, name, type, error, groupClass, touched, icon, ...rest }) => {
  const Icon = icon;

  return (
    <div className={`${classes.FormGroup} ${groupClass || ""}`}>
      <div className={classes.InputGroup}>
        <input name={name} type={type} className={`border-b py-2 pl-2 pr-6 ${error && touched ? classes.Error : ""}`} placeholder={placeholder} {...rest} />
        <Icon size={20} />
      </div>
      {error && touched && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default Input;

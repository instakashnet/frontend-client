import React from "react";

import classes from "../../assets/css/auth-components.module.scss";

const Select = ({ options, name, error, touched, children, ...rest }) => {
  return (
    <div className={classes.FormGroup}>
      <select name={name} className={`${classes.Select} ${error && touched ? classes.Error : ""}`} {...rest}>
        {children}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default Select;

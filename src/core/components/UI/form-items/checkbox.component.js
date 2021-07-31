import React from "react";

import classes from "./Form.module.scss";

const Checkbox = ({ name, value, children, error, touched, ...rest }) => {
  return (
    <div className={classes.CheckGroup}>
      <label>
        <input type="checkbox" name={name} checked={value} {...rest} />
        <span className={`ml-2 ${!value && error ? classes.Error : ""}`}>{children}</span>
      </label>
      {!value && error && <p className="error-msg text-left">{error}</p>}
    </div>
  );
};

export default Checkbox;

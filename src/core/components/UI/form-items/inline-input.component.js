import React from "react";

import Button from "../button.component";
import classes from "./Form.module.scss";

const FlexInput = ({ type, name, value, placeholder, disabled, error, touched, buttonLabel, className, buttonType, onClick, ...rest }) => {
  return (
    <div className={`${classes.FormGroup} ${className || ""}`}>
      <div className={classes.FlexInput}>
        <input type={type} name={name} value={value} placeholder={placeholder} className={error && touched ? classes.Error : ""} disabled={disabled} {...rest} />
        {buttonType === "submit" ? (
          <Button type="submit" disabled={disabled}>
            {buttonLabel}
          </Button>
        ) : (
          <Button type="button" disabled={disabled} onClick={onClick}>
            {buttonLabel}
          </Button>
        )}
      </div>

      {error && touched && <span className="error-msg">{error}</span>}
    </div>
  );
};

export default FlexInput;

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import classes from "./form-items.module.scss";

export const InputPhone = ({ onChange, value, country, error }) => {
  return (
    <div className={classes.FormGroup}>
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        containerClass={classes.PhoneWrapper}
        inputClass={`${classes.PhoneInput} ${error ? classes.PhoneError : ""}`}
        buttonClass={classes.ButtonFlag}
        placeholder="Número de teléfono"
      />
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

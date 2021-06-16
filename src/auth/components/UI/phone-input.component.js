import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import classes from "../../assets/css/auth-components.module.scss";

const InputPhone = ({ onChange, value, country, error }) => {
  return (
    <div className={classes.FormGroup}>
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        containerClass={classes.PhoneWrapper}
        inputClass={`${classes.PhoneInput} ${error ? classes.PhoneError : ""}`}
        buttonClass={classes.ButtonFlag}
        placeholder="Teléfono"
      />
      {value && error && <span className="error-msg">{error}</span>}
    </div>
  );
};

export default InputPhone;

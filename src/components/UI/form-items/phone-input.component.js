import React from "react";
import { FormControl, FormHelperText } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/material.css";
import classes from "../modules/form/phone-input.module.scss";

export const InputPhone = ({ onChange, value, country, error }) => {
  return (
    <FormControl margin="normal" classes={{ root: classes.FormControl }}>
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        containerClass={classes.PhoneWrapper}
        inputClass={`${classes.PhoneInput} ${error ? classes.PhoneError : ""}`}
        buttonClass={classes.ButtonFlag}
        specialLabel="Teléfono"
      />
      <FormHelperText className={`${error ? "error-msg" : ""}`}>{error}</FormHelperText>
    </FormControl>
  );
};

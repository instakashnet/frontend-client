import { FormControlLabel,Radio } from "@material-ui/core";
import React from "react";

import classes from "../modules/form-items/radio.module.scss";

export const RadioComponent = ({ label, value, ...rest }) => {
  return (
    <div className={classes.RadioGroup}>
      <FormControlLabel value={value} control={<Radio color="primary" />} label={label} {...rest} />
    </div>
  );
};

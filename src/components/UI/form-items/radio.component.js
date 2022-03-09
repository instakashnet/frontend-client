import React from "react";
import { Radio, FormControlLabel } from "@material-ui/core";

import classes from "../modules/form/radio.module.scss";

export const RadioComponent = ({ label, value, ...rest }) => {
  return (
    <div className={classes.RadioGroup}>
      <FormControlLabel value={value} control={<Radio color="primary" />} label={label} {...rest} />
    </div>
  );
};

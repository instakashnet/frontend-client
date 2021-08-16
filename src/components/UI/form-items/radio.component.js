import React from "react";
import { Radio, FormControlLabel } from "@material-ui/core";

import classes from "./form-items.module.scss";

export const RadioComponent = ({ name, label, value, ...rest }) => {
  return (
    <div className={classes.RadioGroup}>
      <FormControlLabel value={value} control={<Radio color="primary" />} label={label} {...rest} />
    </div>
  );
};

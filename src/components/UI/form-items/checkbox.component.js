import { Checkbox, FormControlLabel, FormHelperText,withStyles } from "@material-ui/core";
import React from "react";

import classes from "../modules/form-items/checkbox.module.scss";

const GreenCheckbox = withStyles({
  root: {
    "&$checked": {
      color: "#20a2a5",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const CheckboxComponent = ({ name, value, error, className, onChange, children }) => {
  return (
    <div className={`${classes.CheckGroup} ${className || ""}`}>
      <FormControlLabel className="text-sm" control={<GreenCheckbox checked={value} onChange={onChange} name={name} />} label={children} />
      {error && <FormHelperText className="error-msg text-left">{error}</FormHelperText>}
    </div>
  );
};

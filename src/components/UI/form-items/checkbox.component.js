import React from "react";
import { FormControlLabel, Checkbox, withStyles, FormHelperText } from "@material-ui/core";

import classes from "../modules/form/checkbox.module.scss";

const GreenCheckbox = withStyles({
  root: {
    "&$checked": {
      color: "#20a2a5",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const CheckboxComponent = ({ name, value, touched, error, className, onChange, children }) => {
  return (
    <div className={`${classes.CheckGroup} ${className || ""}`}>
      <FormControlLabel className="text-sm" control={<GreenCheckbox checked={value} onChange={onChange} name={name} />} label={children} />
      {!touched && error && <FormHelperText className="error-msg text-left">{error}</FormHelperText>}
    </div>
  );
};

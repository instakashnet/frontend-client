import React from "react";
import { FormControlLabel, Checkbox, withStyles } from "@material-ui/core";

import classes from "./form-items.module.scss";

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
      {touched && error && <p className="error-msg text-left">{error}</p>}
    </div>
  );
};

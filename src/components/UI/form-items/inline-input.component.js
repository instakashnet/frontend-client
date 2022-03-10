import React from "react";
import { TextField, OutlinedInput, InputLabel, FormControl } from "@material-ui/core";

import { Button } from "../button.component";

import classes from "../modules/form/inline_upload-input.module.scss";

export const InlineInput = ({ type, name, value, disabled, error, touched, buttonLabel, className, buttonType, onClick, helperText, label, ...rest }) => {
  return (
    // <div className={`${classes.FormGroup} ${className || ""}`}>
    <FormControl classes={{ root: classes.FormGroup }}>
      <div className={classes.FlexInput}>
        {/* <TextField
          type={type}
          name={name}
          error={!!error && !!touched}
          label={label}
          value={value}
          variant="outlined"
          helperText={error && touched ? error : helperText ? helperText : ""}
          classes={{ root: classes.FormControl }}
          {...rest}
        /> */}
        <InputLabel htmlFor="inline-input">{label}</InputLabel>
        <OutlinedInput
          id="inline-input"
          aria-describedby=""
          variant="outlined"
          type={type}
          name={name}
          error={!!error && !!touched}
          value={value}
          classes={{ root: classes.FormControl }}
          {...rest}
        />
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

      {error && touched && <p className="error-msg">{error}</p>}
      </FormControl>
    // </div>
  );
};

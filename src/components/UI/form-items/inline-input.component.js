import { FormControl, FormHelperText,InputLabel, OutlinedInput } from "@material-ui/core";
import React from "react";

import { Button } from "../button.component";
import classes from "../modules/form-items/inline-input.module.scss";

export const InlineInput = ({ type, name, value, disabled, error, touched, buttonLabel, className, buttonType, onClick, helperText, label, ...rest }) => {
  return (
    <FormControl variant="outlined" margin="normal" classes={{ root: classes.FormControl }}>
      <div className={classes.FlexInput}>
        <InputLabel htmlFor="inline-input">{label}</InputLabel>
        <OutlinedInput
          id="inline-input"
          aria-describedby="inline-helper-text"
          type={type}
          name={name}
          error={!!error && !!touched}
          label={label}
          value={value}
          classes={{ root: classes.OutlinedInput }}
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
      <FormHelperText id="inline-helper-text" className={`${error && touched ? "error-msg" : ""}`}>
        {error && touched ? error : helperText ? helperText : ""}
      </FormHelperText>
    </FormControl>
  );
};

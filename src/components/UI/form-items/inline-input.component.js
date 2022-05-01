import { FormControl, FormHelperText, Input, InputAdornment } from "@material-ui/core";
import React from "react";
import { Button } from "../button.component";
import classes from "../modules/form-items/inline-input.module.scss";


export const InlineInput = ({ type, name, value, disabled, error, touched, buttonLabel, className, buttonType, onClick, helperText, label, icon, ...rest }) => {
  return (
    <FormControl margin="normal" classes={{ root: classes.FormControl }}>
      <div className={`${classes.FlexInput} ${className}`}>
        <Input
          id="inline-input"
          aria-describedby="inline-helper-text"
          type={type}
          name={name}
          placeholder={label}
          error={!!error && !!touched}
          label={label}
          value={value}
          classes={{ root: classes.OutlinedInput }}
          startAdornment={
            <InputAdornment
              position="start">
              <img src={icon} alt="Ícono" />
            </InputAdornment>
          }
          {...rest}
        />
        {buttonType === "submit" ? (
          <Button type="submit" disabled={disabled} className={classes.InputBtn}>
            {buttonLabel}
          </Button>
        ) : (
          <Button type="button" disabled={disabled} className={classes.InputBtn} onClick={onClick}>
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

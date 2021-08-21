import React from "react";
import { TextField, InputAdornment, CircularProgress } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";

import classes from "./form-items.module.scss";

export const Input = ({ name, onChange, onBlur, value, label, type, error, touched, iconEnd, groupClass, isLoading, helperText, ...rest }) => {
  const [passwordType, setPasswordType] = useState("password");
  const onShowPassword = () => setPasswordType((prev) => (prev === "password" ? "text" : "password"));

  let inputProps = {};
  let Icon;

  if (iconEnd) Icon = iconEnd;
  if (isLoading) Icon = CircularProgress;

  if (Icon) {
    inputProps.endAdornment = (
      <InputAdornment position="end">
        <Icon size={27} thickness={5} />
      </InputAdornment>
    );
  }

  return (
    <div className={`${classes.FormGroup} ${groupClass || ""}`}>
      <TextField
        type={type === "password" ? passwordType : type}
        name={name}
        error={!!error && !!touched}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
        helperText={error && touched ? error : helperText ? helperText : ""}
        InputProps={inputProps}
        {...rest}
      />
      {type === "password" && (
        <button type="button" className="absolute right-3 top-2.5" onClick={onShowPassword}>
          {passwordType === "password" ? <Visibility className={classes.PasswordIcon} /> : <VisibilityOff className={classes.PasswordIcon} />}
        </button>
      )}
    </div>
  );
};

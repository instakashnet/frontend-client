import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";

import classes from "./form-items.module.scss";

export const Input = ({ name, onChange, onBlur, value, label, type, error, touched, iconEnd, ...rest }) => {
  const [passwordType, setPasswordType] = useState("password");
  const onShowPassword = () => setPasswordType((prev) => (prev === "password" ? "text" : "password"));

  let inputProps = {};
  let Icon;

  if (iconEnd) {
    Icon = iconEnd;
    inputProps.endAdornment = (
      <InputAdornment position="end">
        <Icon />
      </InputAdornment>
    );
  }

  return (
    <div className={classes.FormGroup}>
      <TextField
        type={type === "password" ? passwordType : type}
        name={name}
        error={!!error && !!touched}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
        helperText={error && touched ? error : ""}
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

import { CircularProgress, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
// CLASSES
import classes from "../modules/form-items/input.module.scss";


export const Input = ({ name, onChange, onBlur, value, label, type, error, touched, iconEnd, groupClass, isLoading, helperText, ...rest }) => {
  const [passwordType, setPasswordType] = useState("password");
  const onShowPassword = () => setPasswordType((prev) => (prev === "password" ? "text" : "password"));

  let InputProps = {};
  let Icon;

  if (iconEnd) Icon = iconEnd;
  if (isLoading) Icon = CircularProgress;

  if (Icon) {
    InputProps.endAdornment = (
      <InputAdornment position="end">
        <Icon size={27} thickness={5} />
      </InputAdornment>
    );
  }

  return (
    <FormControl variant="outlined" margin="normal" classes={{ root: classes.FormControl }}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        aria-describedby="input"
        type={type === "password" ? passwordType : type}
        name={name}
        error={!!error && !!touched}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        endAdornment={InputProps.endAdornment}
        classes={{ adornedEnd: classes.EndAdornment }}
        {...rest}
      />
      <FormHelperText id="input" className={`${error && touched ? "error-msg" : ""}`}>
        {error && touched ? error : helperText ? helperText : ""}
      </FormHelperText>
      {type === "password" && (
        <button type="button" className="absolute right-3 top-2.5" onClick={onShowPassword}>
          {passwordType === "password" ? <Visibility className={classes.PasswordIcon} /> : <VisibilityOff className={classes.PasswordIcon} />}
        </button>
      )}
    </FormControl>
  );
};

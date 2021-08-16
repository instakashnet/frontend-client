import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";

import classes from "./form-items.module.scss";

export const SelectComponent = ({ name, value, options, label, empty, emptyLabel, error, touched, helperText, onChange }) => {
  return (
    <FormControl variant="outlined" className={classes.FormGroup}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select error={!!error && !!touched} value={value} onChange={onChange} label={label} classes={{ select: classes.CustomSelect }} inputProps={{ name, id: name }}>
        {empty && <MenuItem value="">{emptyLabel}</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {!option.icon ? (
              option.label
            ) : (
              <div className="flex items-center">
                <img src={option.icon} alt={option.label} width={50} className="mr-2" />
                <p>
                  {option.account ? (
                    <>
                      {option.account} - <span style={{ color: "#20a2a5" }}>{option.currency}</span>
                    </>
                  ) : (
                    option.label
                  )}
                </p>
              </div>
            )}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText className={`${error && touched ? "error-msg" : ""}`}>{error && touched ? error : helperText ? helperText : ""}</FormHelperText>
    </FormControl>
  );
};

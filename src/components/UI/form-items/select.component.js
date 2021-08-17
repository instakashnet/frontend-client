import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";

import classes from "./form-items.module.scss";

export const SelectComponent = ({ name, value, options, label, empty, emptyLabel, error, touched, helperText, onChange, ...rest }) => {
  return (
    <FormControl variant="outlined" className={classes.FormGroup}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select error={!!error && !!touched} value={value} onChange={onChange} label={label} classes={{ select: classes.CustomSelect }} inputProps={{ name, id: name }} {...rest}>
        {empty && <MenuItem value="">{emptyLabel}</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {!option.icon ? (
              option.label
            ) : (
              <div className="flex items-center justify-between w-full">
                {option.account ? (
                  <div className="flex flex-col items-start justify-start">
                    <p style={{ fontSize: 15 }}>
                      {option.account} - <span style={{ color: "#20a2a5" }}>{option.currency}</span>
                    </p>
                    <p style={{ fontSize: 12 }}>
                      {option.alias} <span className="text-green ml-2">{option.isThird && "cuenta tercero"}</span>
                    </p>
                  </div>
                ) : (
                  <p>{option.label}</p>
                )}
                <img src={option.icon} alt={option.label} width={55} />
              </div>
            )}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText className={`${error && touched ? "error-msg" : ""}`}>{error && touched ? error : helperText ? helperText : ""}</FormHelperText>
    </FormControl>
  );
};

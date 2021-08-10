import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";

import classes from "./form-items.module.scss";

export const SelectComponent = ({ name, value, options, label, empty, onChange }) => {
  return (
    <FormControl variant="outlined" className={classes.FormGroup}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select native value={value} onChange={onChange} label={label} inputProps={{ name, id: name }}>
        {empty && <option aria-label="None" value="" />}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

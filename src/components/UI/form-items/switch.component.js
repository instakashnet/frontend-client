import React from "react";
import { PuffLoader } from "react-spinners";
import Switch from "@material-ui/core/Switch";

import classes from "../modules/form/switch.module.scss";

const SwitchCheckbox = ({ value, name, onChange, isProcessing, placeholder }) => {
  return (
    <div className={classes.SwitchGroup}>
      {isProcessing ? (
        <div className="flex justify-center">
          <PuffLoader size={50} color="#20a2a5" />
        </div>
      ) : (
        <div className={`flex items-center justify-between ${classes.CheckboxWrapper}`}>
          <p>{placeholder}</p>
          <Switch checked={value} onClick={onChange} color="primary" name={name} inputProps={{ "aria-label": placeholder }} />
        </div>
      )}
    </div>
  );
};

export default React.memo(SwitchCheckbox);

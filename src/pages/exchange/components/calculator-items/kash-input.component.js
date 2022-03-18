import React from "react";

import classes from "../modules/calculator-items/kash-input.module.scss";

const KashInput = ({ name, value, error, touched, ...rest }) => {
  return (
    <>
      <div className={classes.KashInput}>
        <input type="number" name={name} min="0" value={value} className={`${error && touched ? "input-error" : ""}`} {...rest} />
        <span>KASH</span>
      </div>
      {error && touched && <p className="error-msg text-left">{error}</p>}
    </>
  );
};

export default KashInput;

import Cleave from "cleave.js/react";
import React from "react";
import classes from "../modules/calculator-items/currency-input.module.scss";


const Input = ({ name, value, currency, label, disabled, onChange }) => {
  return (
    <div className={classes.InputWrapper}>
      <div className={classes.Input}>
        <Cleave value={value} name={name} disabled={disabled} onChange={onChange} options={{ numeral: true, numeralPositiveOnly: true }} />
        <label>{`${label} ${currency === 1 ? "dólares" : "Soles"}`}</label>
        <span>{currency === 1 ? "$" : "S/."}</span>
      </div>
    </div>
  );
};

export default React.memo(Input);

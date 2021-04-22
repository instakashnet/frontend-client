import React from 'react';
import Cleave from 'cleave.js/react';

import classes from './Calculator.module.scss';

const Input = ({ name, value, currency, label, disabled, onChange }) => {
  return (
    <div className={classes.InputWrapper}>
      <div className={classes.InputCurrency}>{currency === 1 ? 'Dólares' : 'Soles'}</div>
      <div className={classes.Input}>
        <span>{currency === 1 ? '$' : 'S/.'}</span>
        <Cleave value={value} name={name} disabled={disabled} onChange={onChange} options={{ numeral: true, numeralDecimalScale: 2, numeralPositiveOnly: true }} />
        <label>{label}</label>
      </div>
    </div>
  );
};

export default React.memo(Input);

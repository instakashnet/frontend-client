import React from 'react';

import classes from './Form.module.scss';

const Radio = ({ name, label, value, ...rest }) => {
  return (
    <div className={classes.RadioGroup}>
      <label className='flex items-center'>
        <input type='radio' name={name} value={value} {...rest} />
        <span className='ml-1'>{label}</span>
      </label>
    </div>
  );
};

export default Radio;

import React from 'react';

import classes from './Form.module.scss';

const Input = ({ type, name, value, label, placeholder, error, touched, ...rest }) => {
  return (
    <div className={classes.FormGroup}>
      {label && <label>{label}</label>}
      <input type={type} name={name} value={value} placeholder={placeholder} className={error && touched ? classes.Error : ''} {...rest} />
      {error && touched && <span className='error-msg text-left'>{error}</span>}
    </div>
  );
};

export default Input;

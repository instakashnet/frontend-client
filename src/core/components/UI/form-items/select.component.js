import React from 'react';

import classes from './Form.module.scss';

const Select = ({ label, name, error, touched, placeholder, options, ...rest }) => {
  return (
    <div className={classes.FormGroup}>
      {label && <label>{label}</label>}
      <select name={name} className={error && touched ? classes.Error : ''} {...rest}>
        <option value=''>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && <span className='error-msg'>{error}</span>}
    </div>
  );
};

export default Select;

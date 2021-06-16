import React from 'react';

import classes from './Form.module.scss';

const Checkbox = ({ name, value, children, error, touched, ...rest }) => {
  return (
    <div className={classes.CheckGroup}>
      <label className='flex items-center'>
        <input type='checkbox' name={name} checked={value} {...rest} />
        <span className={`ml-2 ${!value && error ? classes.Error : ''}`}>{children}</span>
      </label>
      {!value && error && <span className='error-msg text-left'>{error}</span>}
    </div>
  );
};

export default Checkbox;

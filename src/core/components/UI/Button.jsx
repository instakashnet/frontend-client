import React from 'react';

import classes from './Button.module.scss';

const Button = ({ type, disabled, className, children, ...rest }) => {
  return (
    <button type={type} disabled={disabled} className={`${classes.Button} w-full py-3 px-5 rounded-lg transition duration-200 ${className || ''} `} {...rest}>
      {children}
    </button>
  );
};

export default Button;

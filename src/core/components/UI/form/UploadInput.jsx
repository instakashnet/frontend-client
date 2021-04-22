import React from 'react';
import { PlusCircle } from 'react-feather';

import classes from './Form.module.scss';

const UploadInput = ({ value, name, ...rest }) => {
  return (
    <div className={`${classes.FormGroup} ${classes.InputGroup}`}>
      <input type='file' accept='image/png, image/jpeg' id={name} name={name} {...rest} />
      <label className='flex items-center justify-between' htmlFor={name}>
        <span>{value ? value.name : 'Carga el documento (solo jpg/png)'}</span>
        <PlusCircle />
      </label>
    </div>
  );
};

export default UploadInput;

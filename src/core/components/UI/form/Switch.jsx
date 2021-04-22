import React from 'react';
import Switch from '@material-ui/core/Switch';

import classes from './Form.module.scss';

const SwitchCheckbox = ({ label, value, name, onChange, placeholder }) => {
  return (
    <div className={classes.FormGroup}>
      {label && <label>{label}</label>}
      <div className={`flex items-center justify-between ${classes.CheckboxWrapper}`}>
        <p>{placeholder}</p>
        <Switch checked={value} onClick={onChange} color='primary' name={name} inputProps={{ 'aria-label': placeholder }} />
      </div>
    </div>
  );
};

export default React.memo(SwitchCheckbox);

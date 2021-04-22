import React from 'react';

import classes from './Backdrop.module.scss';

const Backdrop = ({ opened, onClick }) => {
  return opened ? <div className={classes.Backdrop} onClick={onClick} /> : null;
};

export default Backdrop;

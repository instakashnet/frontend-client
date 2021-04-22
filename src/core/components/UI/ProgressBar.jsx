import React from 'react';

import classes from './ProgressBar.module.scss';

const ProgressBar = ({ width }) => {
  let color;

  if (width < 66) color = '#ff4b55';
  if (width >= 66 && width < 99) color = '#FF912B';
  if (width > 99) color = '#5eab90';

  return (
    <div className={classes.ProgressBar}>
      <div className={classes.Filler} style={{ backgroundColor: color, width: `${width}%` }} />
    </div>
  );
};

export default ProgressBar;

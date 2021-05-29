import React from 'react';

import classes from '../assets/css/UserCode.module.scss';

const UserCode = ({ userCode }) => {
  return (
    <div className={classes.UserCode}>
      <p>{userCode}</p>
      <button>Copiar</button>
    </div>
  );
};

export default UserCode;

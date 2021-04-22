import React from 'react';

import Male from '../../core/assets/images/profiles/male.svg';
import Female from '../../core/assets/images/profiles/female.svg';
import Company from '../../core/assets/images/profiles/company.svg';
import Add from '../../core/assets/images/profiles/add.svg';

import classes from './SelectionBox.module.scss';

const SelectionBox = ({ type, sex, name, onClick }) => {
  let Avatar = Male;
  if (type === 'add') Avatar = Add;
  if (type === 'juridica') Avatar = Company;
  if (type === 'natural') sex === 'male' ? (Avatar = Male) : (Avatar = Female);

  return (
    <div className='flex flex-col items-center'>
      <button onClick={onClick} className={classes.Box}>
        <img src={Avatar} alt='profile' className={type === 'add' ? classes.Add : ''} />
      </button>
      <p className='mt-3'>{name}</p>
    </div>
  );
};

export default SelectionBox;

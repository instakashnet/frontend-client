import React from 'react';

import classes from './Whatsapp.module.scss';

import WhatsappImg from '../../assets/images/icons/whatsapp.svg';

const Whatsapp = () => {
  return (
    <div className={classes.Whatsapp}>
      <span className='mr-2 hidden md:inline-block'>929 324 006</span>
      <img src={WhatsappImg} className='md:w-6' alt='Whatsapp' />
    </div>
  );
};

export default Whatsapp;

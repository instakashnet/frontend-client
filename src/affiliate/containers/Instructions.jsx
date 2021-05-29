import React from 'react';
import { isMobile } from 'react-device-detect';

import Layout from '../../core/components/layout/Layout';
import StepsSwiper from '../components/StepsSwiper';
// import Step from '../components/Step';
import Card from '../../core/components/UI/Card';
import UserCode from '../components/UserCode';

import classes from '../assets/css/Instructions.module.scss';

const Instructions = () => {
  return (
    <Layout className='content-start mt-12'>
      <article className={classes.Instructions}>
        <h1>¡Recomienda y gana!</h1>
        <h3>Comparte el código con tus amigos</h3>
        {isMobile && <StepsSwiper />}
        {!isMobile && <div className='flex flex-col md:flex-row items-center justify-around'>{/* <Step /> */}</div>}
        <Card className='flex items-center justify-center md:justify-between mt-4'>
          <UserCode userCode='ROGER123' />
          <p className='hidden md:block'>
            Puedes retirar tus KASH en tus cambios de divisas adicionándolos a tu monto a recibir, o retirarlos directamente a una de tus cuentas en dólares.
          </p>
        </Card>
      </article>
    </Layout>
  );
};

export default Instructions;

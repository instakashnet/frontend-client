import React from 'react';

import Layout from '../../core/components/layout/Layout';

import classes from '../assets/css/Instructions.module.scss';

const Instructions = () => {
  return (
    <Layout className='content-center'>
      <article className={classes.Instructions}>
        <h1>¡Recomienda y gana!</h1>
        <h3>Comparte el código con tus amigos</h3>
        <div className='flex flex-col md:flex-row items-center justify-around'></div>
      </article>
    </Layout>
  );
};

export default Instructions;

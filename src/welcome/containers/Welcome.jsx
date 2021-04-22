import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../core/components/UI/Card';
import Layout from '../../core/components/layout/Layout';

import ExchangeImg from '../images/exchange.svg';
import AffiliateImg from '../images/affiliate.svg';

import classes from './Welcome.module.scss';

const Welcome = () => {
  return (
    <Layout className='content-start'>
      <div className={classes.Welcome}>
        <div className='w-9/12 lg:w-2/6'>
          <h1>¡Bienvenido a Instakash!</h1>
          <p>Con nosotros todo es más fácil, ahora puedes cambiar dólares desde cualquier lugar.</p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center mt-6'>
        <Card className={`${classes.OptionCard} md:mr-4`}>
          <div className='lg:w-2/3 md:mt-6 md:pl-6'>
            <h4>¡Cambia ahora con Instakash!</h4>
            <p>¿Que esperas para realizar tu cambio de divisas?</p>
            <Link className='action-button' to='/currency-exchange'>
              Quiero cambiar
            </Link>
          </div>
          <img src={ExchangeImg} alt='exchange' className='self-end' />
        </Card>
        <Card className={`${classes.OptionCard} mt-6 md:mt-0`}>
          <div className='lg:w-2/3 md:mt-6 md:pl-6'>
            <h4>¡Gana KASH recomendando!</h4>
            <p>Comparte tu código de afiliado y gana KASH y más beneficios.</p>
            <Link className='action-button' to='/my-profile'>
              Quiero saber más
            </Link>
          </div>
          <img src={AffiliateImg} alt='affiliate' className='self-end' />
        </Card>
      </div>
    </Layout>
  );
};

export default Welcome;

import React from 'react';

import Card from '../../core/components/UI/Card';

import InfoImg from '../images/exchange-user.svg';
import Clock from '../images/icons/clock.svg';
import Arrows from '../images/icons/arrows.svg';
import User from '../images/icons/user.svg';
import Dollar from '../images/icons/dollar.svg';

import classes from './Exchange.module.scss';

const Information = () => {
  return (
    <div className={classes.Information}>
      <div className='flex items-end justify-center'>
        <img src={InfoImg} alt='information' className={classes.InfoImg} width={120} />
        <div className='flex items-end justify-center flex-wrap lg:flex-nowrap'>
          <div className='w-full'>
            <h3>¡Importante!</h3>
            <Card className={classes.InfoCard}>
              <img src={Clock} alt='clock' />
              <p>Las transacciones se procesan entre 10 a 25 minutos.</p>
            </Card>
          </div>
          <Card className={classes.InfoCard}>
            <img src={Arrows} alt='arrows' />
            <p>Recibimos solo transferencias. No aceptamos depósitos.</p>
          </Card>
          <Card className={classes.InfoCard}>
            <img src={User} alt='clock' />
            <p>Ambas cuentas deben ser del titular.</p>
          </Card>
          <Card className={classes.InfoCard}>
            <img src={Dollar} alt='clock' />
            <p>Importes mayores de $10,000 pueden tardar más de lo usual.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Information;

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { RefreshCcw, ArrowUp } from 'react-feather';
import { formatAmount } from '../../shared/functions';

import Card from '../../core/components/UI/Card';

import KashIcon from '../../core/assets/images/kash.svg';
import classes from './Dashboard.module.scss';

const TotalTransfered = ({ totalAmount, kashAccount, isLoading, className, type }) => {
  let savings = 0;
  if (totalAmount >= 0) savings = totalAmount * 0.03;

  return (
    <div className={`flex flex-wrap md:flex-nowrap ${className || ''}`}>
      <div className={`${classes.KashCard} w-full`}>
        <img src={KashIcon} alt='kash' />
        <h3>
          {kashAccount && kashAccount.balance > 0 ? (
            <span>
              ¡Tienes <b>{kashAccount.balance}</b> KASH!
            </span>
          ) : (
            'No posees ningún KASH'
          )}
        </h3>
        {kashAccount.balance > 0 && (
          <>
            <p>¿Quieres cambiar o retirar?</p>
            <div className='flex items-center justify-between mt-3'>
              {/* <Link to='/currency-exchange'>Cambiar</Link> */}
              <Link to='/my-accounts'>Retirar</Link>
            </div>
          </>
        )}
      </div>
      <div className={`${classes.DashboardCard} w-full ${type === 'account' && 'mx-0 md:mx-3'}`}>
        <h2>
          <RefreshCcw className='mr-2' size={20} /> Soles cambiados
        </h2>
        <p className='mb-3 ml-2'>Importe total en soles</p>
        {isLoading && <Skeleton height={100} />}
        {!isLoading && (
          <Card className='flex items-center h-24 text-center flex-col p-6 justify-center w-full'>
            <span className={classes.TotalAmount}>S/. {formatAmount(totalAmount)}</span>
          </Card>
        )}
      </div>
      <div className={`${classes.DashboardCard} w-full ${type === 'account' && 'mx-0 md:mx-3'}`}>
        <h2>
          <ArrowUp className='mr-2' size={20} /> Ahorro aproximado
        </h2>
        <p className='mb-3 ml-2'>Importe en relación a otras casas y bancos</p>
        {isLoading && <Skeleton height={100} />}
        {!isLoading && (
          <Card className='flex flex-col h-24 text-center p-6 items-center justify-center'>
            <span className={classes.TotalAmount}>S/. {formatAmount(savings)}</span>
          </Card>
        )}
      </div>
    </div>
  );
};

export default React.memo(TotalTransfered);

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { RefreshCcw, ArrowUp } from 'react-feather';
import { getTotalAmountInit } from '../../store/actions';
import { formatAmount } from '../../shared/functions';

import Card from '../../core/components/UI/Card';

import classes from './Dashboard.module.scss';

const TotalTransfered = ({ totalAmount, isLoading, className, type }) => {
  const dispatch = useDispatch();
  let savings = 0;

  useEffect(() => {
    dispatch(getTotalAmountInit());
  }, [dispatch]);

  if (totalAmount >= 0) {
    savings = totalAmount * 0.1;
  }

  return (
    <div className={`flex flex-wrap md:flex-nowrap ${className || ''}`}>
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

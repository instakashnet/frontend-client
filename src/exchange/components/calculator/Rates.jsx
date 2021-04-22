import React from 'react';

import Card from '../../../core/components/UI/Card';

import classes from './Calculator.module.scss';

const Rates = ({ rates, actualRates }) => {
  return (
    <div className={classes.Rates}>
      {rates.buy !== actualRates.buy && (
        <div className='flex items-center justify-center mt-3'>
          <p className='mr-4'>
            Antes: <b>{rates.buy}</b>
          </p>
          <p className='ml-6'>
            Antes: <b>{rates.sell}</b>
          </p>
        </div>
      )}
      <div className='flex items-center justify-center mt-2'>
        <Card className={classes.BuyCard}>
          <h4>Compramos a</h4>
          <span className={classes.Price}>S/. {actualRates.buy.toFixed(3)}</span>
        </Card>
        <Card className={classes.SellCard}>
          <h4>Vendemos a</h4>
          <span className={classes.Price}>S/. {actualRates.sell.toFixed(3)}</span>
        </Card>
      </div>
    </div>
  );
};

export default Rates;

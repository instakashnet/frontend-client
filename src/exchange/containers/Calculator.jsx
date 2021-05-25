import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Info, Clock } from 'react-feather';
import { getRatesInit, validateCouponInit, createExchangeInit, deleteCoupon } from '../../store/actions';

import Rates from '../components/calculator/Rates';
import Input from '../components/calculator/Input';
import CouponInput from '../components/calculator/Coupon';

import Swipe from '../components/calculator/Swipe';
import Spinner from '../../core/components/UI/Spinner';
import Button from '../../core/components/UI/Button';
import Tooltip from '../../core/components/UI/Tooltip';
import Timer from '../components/calculator/Timer';

import classes from './Exchange.module.scss';

const Calculator = ({ profile, setStep, setModal }) => {
  const [actualRates, setActualRates] = useState({ buy: 0, sell: 0 });
  const [showInfo, setShowInfo] = useState(false);
  const { rates, isLoading, coupon, isProcessing } = useSelector((state) => state.Exchange);

  const { type: profiletype } = profile;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRatesInit());
    dispatch(validateCouponInit('NUEVOREFERIDO1', profiletype));
  }, [dispatch, profiletype]);

  const formik = useFormik({
    initialValues: {
      currency_sent_id: 2,
      currency_received_id: 1,
      rate_id: rates.id || '',
      type: 'sell',
      amount_sent: 0,
      amount_received: 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if ((values.currency_received_id === 1 && values.amount_sent >= 15000) || (values.currency_received_id === 2 && values.amount_sent >= 5000)) {
        if (!profile.address || !profile.identity_photo || !profile.identity_photo_two) {
          return setModal('complete');
        }
      }
      return dispatch(createExchangeInit(values, profile, setStep));
    },
  });
  const { values, setFieldValue } = formik;

  const sendCouponHandler = (couponName) => {
    const bodyCoupon = couponName.trim();
    const regex = /^((?=.*\d)?)(?=.*[a-zA-Z]).{6,}$/;
    if (bodyCoupon && regex.test(bodyCoupon)) {
      dispatch(validateCouponInit(bodyCoupon.toUpperCase(), profile.type));
    } else return;
  };
  const deleteCouponHandler = () => {
    dispatch(deleteCoupon());
    setActualRates({ buy: rates.buy, sell: rates.sell });
    setFieldValue('amount_received', values.type === 'buy' ? values.amount_sent * rates.buy : values.amount_sent / rates.sell);
  };

  useEffect(() => {
    if (rates.buy && rates.sell) {
      setActualRates({ buy: rates.buy, sell: rates.sell });
      dispatch(deleteCoupon());

      if (rates.buy > 0 && rates.sell > 0) {
        setFieldValue('amount_sent', Math.round(1000 * rates.sell));
        setFieldValue('amount_received', 1000);
      }
    }
  }, [rates, dispatch, setFieldValue]);

  useEffect(() => {
    if (coupon) {
      setActualRates({ buy: rates.buy + coupon.discount, sell: rates.sell - coupon.discount });
      setFieldValue('amount_received', values.type === 'buy' ? values.amount_sent * (rates.buy + coupon.discount) : values.amount_sent / (rates.sell - coupon.discount));
    }
    // eslint-disable-next-line
  }, [coupon, setFieldValue]);

  const swipeCurrencyHandler = () => {
    setFieldValue('type', values.type === 'buy' ? 'sell' : 'buy');
    setFieldValue('currency_sent_id', values.currency_received_id === 1 ? 1 : 2);
    setFieldValue('currency_received_id', values.currency_sent_id === 1 ? 1 : 2);
    setFieldValue('amount_received', values.type === 'buy' ? values.amount_sent / actualRates.sell : values.amount_sent * actualRates.buy);
  };

  const currencyChangeHandler = (e) => {
    const { name, rawValue } = e.target;
    setFieldValue(name, +rawValue);
    const inputName = name === 'amount_sent' ? 'amount_received' : 'amount_sent';
    if (values.type === 'buy') setFieldValue(inputName, inputName === 'amount_received' ? +rawValue * actualRates.buy : +rawValue / actualRates.buy);
    if (values.type === 'sell') setFieldValue(inputName, inputName === 'amount_received' ? +rawValue / actualRates.sell : +rawValue * actualRates.sell);
  };

  let minimum;
  if (coupon && coupon.minimumAmount) {
    minimum = (values.type === 'sell' && values.amount_received < coupon.minimumAmount) || (values.type === 'buy' && values.amount_sent < coupon.minimumAmount);
  }

  const disabled = (actualRates.buy <= 0 && actualRates.sell <= 0) || isLoading || isProcessing;

  return (
    <>
      <h1>¡Gana cambiando con Instakash!</h1>
      <p>Mejores tasas, mayor ahorro.</p>
      {isLoading ? <Spinner /> : <Rates actualRates={actualRates} rates={rates} />}
      <form onSubmit={formik.handleSubmit} className={classes.ExchangeForm}>
        {!isLoading && (
          <div className={classes.Timer}>
            <p>Se actualizará el tipo de cambio en:</p>
            <div className='flex items-center'>
              <Clock className='mr-2' size={15} /> <Timer onFinish={() => dispatch(getRatesInit())} />
            </div>
          </div>
        )}
        <div className='relative'>
          <Input name='amount_sent' value={values.amount_sent} currency={values.currency_sent_id} label='Envias' disabled={disabled} onChange={currencyChangeHandler} />
          <Swipe onSwipeCurrency={swipeCurrencyHandler} type={values.type} disabled={disabled} />
          <Input
            name='amount_received'
            value={values.amount_received}
            currency={values.currency_received_id}
            label='Recibes'
            disabled={disabled}
            onChange={currencyChangeHandler}
          />
          <p className='flex items-center justify-center w-full'>
            ¿Montos mayores a $ 5,000.00?
            <Tooltip
              title='Escribenos a nuestro canal de whatsapp para recibir una tasa preferencial.'
              placement='top-start'
              disableHoverListener
              onMouseEnter={() => setShowInfo(true)}
              onClick={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              open={showInfo}>
              <Info className='ml-3' />
            </Tooltip>
          </p>
          <CouponInput
            coupon={coupon}
            minimum={minimum}
            amountReceived={values.amount_received}
            isProcessing={isProcessing}
            isLoading={isLoading}
            onSendCoupon={sendCouponHandler}
            onDeleteCoupon={deleteCouponHandler}
          />
          {values.amount_received < 1 && <p className='error-msg'>El monto mínimo a recibir es de $ 1.00</p>}
          <Button type='submit' disabled={values.amount_received < 1 || disabled} className={`action-button mt-2 md:mt-5 ld-ext-right ${isProcessing ? 'running' : ''}`}>
            <span className='ld ld-ring ld-spin' />
            Comenzar cambio
          </Button>
        </div>
      </form>
    </>
  );
};

export default Calculator;

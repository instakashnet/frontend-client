import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Info, X, Clock } from 'react-feather';
import { getRatesInit, validateCouponInit, createExchangeInit, deleteCoupon } from '../../store/actions';
import { formatAmount } from '../../shared/functions';

import Rates from '../components/calculator/Rates';
import Input from '../components/calculator/Input';
import FlexInput from '../../core/components/UI/form/FlexInput';
import Swipe from '../components/calculator/Swipe';
import Spinner from '../../core/components/UI/Spinner';
import Button from '../../core/components/UI/Button';
import Tooltip from '../../core/components/UI/Tooltip';
import Timer from '../components/calculator/Timer';

import CouponImg from '../images/icons/coupon.svg';

import classes from './Exchange.module.scss';

const Calculator = ({ profile, setStep, setModal }) => {
  const [actualRates, setActualRates] = useState({ buy: 0, sell: 0 });
  const [couponName, setCouponName] = useState('');
  const { rates, isLoading, coupon, isProcessing } = useSelector((state) => state.Exchange);

  const { type: profiletype } = profile;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRatesInit());
    dispatch(validateCouponInit('NUEVOREFERIDO1', profiletype));
  }, [dispatch, profiletype]);

  const onCouponChange = (e) => setCouponName(e.target.value);
  const sendCoupon = () => {
    const bodyCoupon = couponName.trim();
    const regex = /^((?=.*\d)?)(?=.*[a-zA-Z]).{6,}$/;
    if (bodyCoupon && regex.test(bodyCoupon)) {
      dispatch(validateCouponInit(bodyCoupon.toUpperCase(), profile.type));
    } else return;
  };

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

  useEffect(() => {
    if (rates.buy && rates.sell) {
      if (coupon) {
        setActualRates({ buy: rates.buy + coupon.discount, sell: rates.sell - coupon.discount });
      } else setActualRates({ buy: rates.buy, sell: rates.sell });
    }
  }, [rates, setFieldValue, coupon]);

  useEffect(() => {
    if (actualRates.buy > 0 && actualRates.sell > 0) {
      setFieldValue('amount_sent', Math.round(1000 * actualRates.sell));
      setFieldValue('amount_received', 1000);
    }
  }, [actualRates, setFieldValue]);

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
  if (coupon && coupon.minimumBuy) {
    minimum = (values.type === 'sell' && values.amount_sent < coupon.minimumSell) || (values.type === 'buy' && values.amount_sent < coupon.minimumBuy);
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
            <Tooltip title='Escribenos a nuestro canal de whatsapp para recibir una tasa preferencial.' placement='top-start' enterTouchDelay={300} leaveTouchDelay={800}>
              <Info className='ml-3' />
            </Tooltip>
          </p>
          {!coupon ? (
            <FlexInput
              name='couponName'
              value={couponName}
              onClick={sendCoupon}
              disabled={isProcessing || isLoading}
              onChange={onCouponChange}
              placeholder='Cupón de descuento'
              buttonLabel='Agregar'
              className='mt-4'
            />
          ) : (
            <>
              <p className='mt-5'>¡Genial!, haz activado el cupón:</p>
              <div className={classes.Coupon}>
                <p className='flex items-center'>
                  <img src={CouponImg} alt='cupón' className='mr-2' /> {coupon.name}
                </p>
                <button type='button' onClick={() => dispatch(deleteCoupon())}>
                  <X />
                </button>
              </div>
              {coupon.name === 'NUEVOREFERIDO1' && <p>Aprovecha este cupón en tu primera operación.</p>}
            </>
          )}
          {minimum && (
            <p className='text-center error-msg mt-1 md:mt-3'>
              Solo aplicable para montos mayores a $ {formatAmount(coupon.minimumBuy)} o S/. {formatAmount(coupon.minimumSell)}
            </p>
          )}
          {values.amount_received < 1 && <p className='error-msg'>El monto mínimo a recibir es de $ 1.00</p>}
          <Button type='submit' disabled={values.amount_received < 1 || minimum || disabled} className={`action-button mt-2 md:mt-5 ld-ext-right ${isProcessing ? 'running' : ''}`}>
            <span className='ld ld-ring ld-spin' />
            Comenzar cambio
          </Button>
        </div>
      </form>
    </>
  );
};

export default Calculator;

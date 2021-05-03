import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { transactionCodeValidation } from '../../helpers/validations';
import { formatAmount } from '../../../shared/functions';
import { closeSliderModal, processCodeInit } from '../../../store/actions';

import Button from '../../../core/components/UI/Button';
import CopyButton from '../../../core/components/UI/CopyButton';
import Input from '../../../core/components/UI/form/FlexInput';

import classes from '../Dashboard.module.scss';

const OrderDetails = () => {
  const details = useSelector((state) => state.Dashboard.details);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { transaction_code: '' },
    validationSchema: transactionCodeValidation,
    onSubmit: (values) => dispatch(processCodeInit(values, details.id, 'details')),
  });

  const closeModalHandler = () => dispatch(closeSliderModal());

  return details.estateName ? (
    <div className={classes.Details}>
      <h2>Detalles de la operación</h2>
      <div className='flex items-center justify-between'>
        <h4>Estado:</h4>
        <span className='rounded-lg py-2 px-3' style={{ backgroundColor: details.stateColor, fontSize: '.8rem' }}>
          {details.estateName.toLowerCase()}
        </span>
      </div>
      <div className='flex items-center justify-between pr-2 my-3'>
        <h4>Pedido:</h4>
        <span>{details.uuid}</span>
      </div>
      <div className='flex items-center justify-between pr-2 my-3'>
        <h4>Fecha:</h4>
        <span>{moment(details.created).format('DD/MM/YY [-] HH:mm')}</span>
      </div>
      <div className='flex items-center justify-between pr-2 my-3'>
        <h4>Solicitado:</h4>
        <span className={classes.Price}>{`${details.currencyReceived === 'USD' ? '$' : 'S/.'} ${formatAmount(details.amountReceived)}`}</span>
      </div>
      {details.kashApplied && (
        <div className='flex items-center justify-between pr-2 my-3'>
          <h4>KASH utilizados:</h4>
          <span className={classes.Price}>{details.kashUsed} KASH</span>
        </div>
      )}
      <div className='flex items-center justify-between pr-2 my-3'>
        <h4>Tasa de cambio:</h4>
        <span>{details.rate}</span>
      </div>
      <h3 className='mt-4'>Cuenta que recibe:</h3>
      <div className='flex items-center justify-between pr-2 my-2'>
        <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankReceive.toLowerCase()}-logo.svg`} width={80} alt={details.bankReceive} />
        <span>{`*********${details.accountToRaw.substring(details.accountToRaw.length - 4, details.accountToRaw.length)}`}</span>
      </div>

      {details.estateId === 2 && (
        <>
          <h2 className='mt-5'>Completa tu operación</h2>
          <h3>Cuenta a transferir:</h3>
          <div className='flex items-center justify-between pr-2 my-2'>
            <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankSent.toLowerCase()}-logo.svg`} width={80} alt={details.bankSent} />
            <div className='flex items-center'>
              <span>{details.accountFromRaw}</span>
              <CopyButton textToCopy={details.accountFromRaw} />
            </div>
          </div>
          <p>Instakash SAC - RUC 20605285105</p>
          <form onSubmit={formik.handleSubmit} className='mt-8'>
            <Input
              name='transaction_code'
              placeholder='Número de transferencia'
              value={formik.values.transaction_code}
              error={formik.errors.transaction_code}
              touched={formik.touched.transaction_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              buttonType='submit'
              buttonLabel='Agregar'
            />
          </form>
        </>
      )}

      <div className='flex justify-center mt-4'>
        <Button type='button' className={classes.CloseButton} onClick={closeModalHandler}>
          Aceptar
        </Button>
      </div>
    </div>
  ) : null;
};

export default React.memo(OrderDetails);

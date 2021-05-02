import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Info } from 'react-feather';
import { formatAmount } from '../../shared/functions';
import { processCodeInit, cancelExchangeInit } from '../../store/actions';
import { transferCodeValidation } from '../helpers/validations';

import Tooltip from '../../core/components/UI/Tooltip';
import Input from '../../core/components/UI/form/Input';
import Button from '../../core/components/UI/Button';
import CopyButton from '../../core/components/UI/CopyButton';

import TransferImg from '../images/transfer.svg';

import classes from './Exchange.module.scss';

const TransferCode = ({ order }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { transaction_code: '' },
    validationSchema: transferCodeValidation,
    onSubmit: (values) => dispatch(processCodeInit(values, order.id)),
  });
  const isProcessing = useSelector((state) => state.Exchange.isProcessing);

  return (
    <div className={classes.TransferCode}>
      <h1>¡Último paso!</h1>
      <img src={TransferImg} alt='transfer-money' className='mx-auto inline-block my-4' />
      <p>Transfiere desde tu banca por internet el monto de:</p>
      <p className={classes.Amount}>
        {`${order.currencySent === 'PEN' ? 'S/.' : '$'} ${formatAmount(order.amountSent)}`} <CopyButton textToCopy={order.amountSent} />
      </p>

      {order.kashApplied && (
        <>
          <p>Kash a utilizar en tu operación:</p>
          <p className={classes.Amount}>{order.kashUsed} kash</p>
        </>
      )}

      <h4>Banco a transferir:</h4>
      <div className={classes.TransferAccount}>
        <div className='flex items-center justify-between'>
          <img src={`${process.env.PUBLIC_URL}/images/banks/${order.bankFromName.toLowerCase()}-logo.svg`} width={100} alt={order.bankFromName} />
          <div className='text-right'>
            <small>Cuenta en {order.currencySent === 'PEN' ? 'Soles' : 'Dólares'}:</small>
            <p className='flex items-center mt-1'>
              {order.accountToRaw} <CopyButton textToCopy={order.accountToRaw} />
            </p>
          </div>
        </div>
      </div>

      <div className={`${classes.TransferAccount} mt-8 flex items-center justify-between`}>
        <p className='text-left'>Instakash SAC - RUC 20605285105</p>
        <CopyButton textToCopy='20605285105' />
      </div>

      <p className='mb-6 mt-8 text-left'>
        Una vez realizado coloque el número de operación <b>emitido por su banco</b> dentro del casillero mostrado debajo darle a enviar.
      </p>

      <Tooltip
        title={<img src={`${process.env.PUBLIC_URL}/images/samples/transfer-${order.bankFromName.toLowerCase()}.png`} alt='ejemplo de transferencia' />}
        placement='top-start'
        enterTouchDelay={200}
        leaveTouchDelay={500}>
        <p className='flex items-center justify-end text-sm mb-5 font-bold cursor-pointer underline'>
          ¿Donde lo encuentro? <Info className='ml-2' />
        </p>
      </Tooltip>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name='transaction_code'
          placeholder='Ingresa el nro. de operación'
          value={formik.values.transaction_code}
          error={formik.errors.transaction_code}
          touched={formik.touched.transaction_code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className='uppercase text-left text-sm'>Solo posees 15 minutos para enviarnos el nro. de tu operación.</p>
        <Button type='submit' className={`action-button mt-6 ld-ext-right ${isProcessing ? 'running' : ''}`} disabled={!formik.isValid || isProcessing}>
          <span className='ld ld-ring ld-spin' />
          Enviar
        </Button>
        <Button type='button' className='secondary-button mt-6' onClick={() => dispatch(cancelExchangeInit(order.id))}>
          Cancelar
        </Button>
      </form>
    </div>
  );
};

export default TransferCode;

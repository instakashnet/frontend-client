import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Edit2, Trash } from 'react-feather';
import { deleteAccountInit } from '../../store/actions';
import Spinner from '../../core/components/UI/Spinner';

import EditAccount from './EditAccount';
import Button from '../../core/components/UI/Button';

import classes from './Accounts.module.scss';

const AccountDetails = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const { accountDetails, isProcessing } = useSelector((state) => state.Accounts);

  return (
    <div className={classes.AccountDetails}>
      <h2 className='text-center'>Detalles de la cuenta</h2>
      {!edit && isProcessing && <Spinner screen />}
      {!isProcessing && (
        <>
          <div className='grid grid-cols-2 md:grid-cols-3 mb-6'>
            <div>
              <h4>Banco</h4>
              <img src={`${process.env.PUBLIC_URL}/images/banks/${accountDetails.bank.name}-logo.svg`} width={80} alt={accountDetails.bank.name} />
            </div>
            <div>
              <h4>Tipo de cuenta</h4>
              <p>{accountDetails.acc_type === 'savings' ? 'De ahorros' : 'corriente'}</p>
            </div>
            <div className='mt-6 md:mt-0 md:text-right'>
              <h4>Moneda</h4>
              <p>{accountDetails.currency.ISO === 'PEN' ? 'soles (S/.)' : 'dólares ($)'}</p>
            </div>
          </div>
          <hr />
          {!edit && (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div>
                  <h4 className='mt-4'>Número de cuenta</h4>
                  <p>{accountDetails.account_number || accountDetails.cci}</p>
                </div>
                <div className='md:text-right'>
                  <h4 className='mt-4'>Alias de la cuenta</h4>
                  <p>{accountDetails.alias}</p>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <Button className={classes.DeleteButton} type='button' onClick={() => dispatch(deleteAccountInit(accountDetails))}>
                  Eliminar cuenta <Trash className='ml-2' />
                </Button>
                <Button className='action-button' type='button' onClick={() => setEdit(true)}>
                  Editar cuenta <Edit2 className='ml-2' />
                </Button>
              </div>
            </>
          )}
        </>
      )}
      {edit && <EditAccount account={accountDetails} cancelEdit={() => setEdit(false)} setEdit={setEdit} />}
    </div>
  );
};

export default React.memo(AccountDetails);

import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { CreditCard } from 'react-feather';
import { getAccountsInit, getBanksInit, getCurenciesInit, setAccountDetailsInit, openModal } from '../../store/actions';

import Layout from '../../core/components/layout/Layout';
import Button from '../../core/components/UI/Button';
import AccountsList from './AccountsList';
import NoAccount from '../components/NoAccounts';
import Spinner from '../../core/components/UI/Spinner';
import AddAccount from './AddAccount';
import AccountDetails from './AccountDetails';
import KashAccount from './KashAccount';
import KashWithdrawal from './KashWithdraw';

import classes from './Accounts.module.scss';

const Accounts = () => {
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();
  const { accounts, kashAccount, isLoading: accountsLoading } = useSelector((state) => state.Accounts);

  useEffect(() => {
    dispatch(getAccountsInit('users'));
    dispatch(getAccountsInit('kash'));
    dispatch(getBanksInit());
    dispatch(getCurenciesInit());
  }, [dispatch]);

  const addAccountHandler = () => openModalHandler('add');

  let ModalComponent;

  const openModalHandler = (type, accId = null) => {
    setModalType(type);
    if (accId) dispatch(setAccountDetailsInit(accId));
    dispatch(openModal());
  };

  if (modalType === 'add') ModalComponent = () => <AddAccount accType='users' />;
  if (modalType === 'details') ModalComponent = () => <AccountDetails />;
  if (modalType === 'withdrawal') ModalComponent = () => <KashWithdrawal accounts={accounts} kashAccount={kashAccount} />;

  const groupedAccounts = _.map(_.groupBy(accounts, (account) => account.currency.id));

  return (
    <Layout className={`${isMobile ? 'content-center' : 'content-start'}`} ModalComponent={ModalComponent}>
      <div className={classes.Accounts}>
        {accountsLoading && <Spinner />}
        {!accountsLoading && <KashAccount account={kashAccount} openModal={openModalHandler} />}
        {!accountsLoading && accounts.length <= 0 && <NoAccount onAddAccount={addAccountHandler} />}
        {!accountsLoading && accounts.length > 0 && (
          <div className='grid grid-cols-1 lg:grid-cols-4'>
            <section className='mt-3 md:mt-6'>
              <h1 className='flex items-center justify-start ml-2 mt-5'>
                <CreditCard className='mr-3' />
                <span>Mis cuentas</span>
              </h1>
              <p className='ml-2'>Estás son sus cuentas para recibir.</p>
              <div className='flex items-center flex-wrap lg:flex-nowrap justify-center md:justify-between my-5'>
                <Button type='button' onClick={addAccountHandler} className='action-button md:max-w-sm lg:max-w-xs lg:my-0'>
                  Agregar cuenta
                </Button>
              </div>
              <p className='mt-3 text-sm'>
                Te recordamos que las cuentas que agregues deberán ser solo tuyas o de tu empresa, de lo contrario no podremos realizar tu cambio. Puedes tener hasta 20 cuentas
                agregadas, 10 cuentas en soles y 10 en dólares.
              </p>
            </section>
            <section className='lg:col-span-3 md:ml-3'>
              <div className='grid grid-cols-1 align-center gap-4 mt-8'>
                {groupedAccounts.map((accounts, i) => (
                  <AccountsList key={i} accounts={accounts} openDetails={openModalHandler} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Accounts;

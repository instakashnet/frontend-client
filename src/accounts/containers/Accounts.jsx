import React, { useEffect } from 'react';
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
import KashInfo from '../../core/containers/KashInfo';

import classes from './Accounts.module.scss';

const Accounts = () => {
  const dispatch = useDispatch();
  const { accounts, kashAccount, isLoading: accountsLoading } = useSelector((state) => state.Accounts);

  useEffect(() => {
    dispatch(getAccountsInit('users'));
    dispatch(getAccountsInit('kash'));
    dispatch(getBanksInit());
    dispatch(getCurenciesInit());
  }, [dispatch]);

  const addAccountHandler = () => openModalHandler('add');

  const openModalHandler = (type, accId = null) => {
    let ModalComponent;

    if (type === 'add') ModalComponent = () => <AddAccount accType='users' />;
    if (type === 'details') ModalComponent = () => <AccountDetails />;
    if (type === 'withdrawal') ModalComponent = () => <KashWithdrawal accounts={accounts} kashAccount={kashAccount} />;
    if (type === 'kashInfo') ModalComponent = () => <KashInfo />;
    if (accId) dispatch(setAccountDetailsInit(accId));

    dispatch(openModal(ModalComponent));
  };

  const groupedAccounts = _.map(_.groupBy(accounts, (account) => account.currency.id));

  return (
    <Layout className={`${isMobile ? 'content-center' : 'content-start'}`}>
      {accountsLoading && <Spinner screen />}
      <div className={classes.Accounts}>
        {!accountsLoading && <KashAccount account={kashAccount} openModal={openModalHandler} />}
        {!accountsLoading && accounts.length <= 0 && <NoAccount onAddAccount={addAccountHandler} />}
        {!accountsLoading && accounts.length > 0 && (
          <div className='grid grid-cols-1 lg:grid-cols-4'>
            <section className='mt-3 md:mt-6'>
              <h1 className='flex items-center justify-start ml-2 mt-5'>
                <CreditCard className='mr-3' />
                <span>Mis cuentas</span>
              </h1>
              <div className='flex items-center flex-wrap lg:flex-nowrap justify-center md:justify-between my-5'>
                <Button type='button' onClick={addAccountHandler} className='action-button md:max-w-sm lg:max-w-xs lg:my-0'>
                  Agregar cuenta
                </Button>
              </div>
              <p className='mt-3 text-sm'>
                Las cuentas que agregues deberán ser <b>tuyas o de tu empresa</b>. Puedes tener hasta <b>20 cuentas agregadas</b>, 10 cuentas en soles y 10 en dólares.
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

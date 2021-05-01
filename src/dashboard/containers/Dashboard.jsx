import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { openSliderModal, getOrderDetailsInit, getTotalAmountInit, getAccountsInit, getOrderAmountsInit, getOrdersInit, getWithdrawalsInit } from '../../store/actions';

import Layout from '../../core/components/layout/Layout';
import TotalTransfered from './TotalTransfered';
import Spinner from '../../core/components/UI/Spinner';
import TransferedCharts from './TransferedCharts';
import AllActivity from './Activity/All';
import RecentActivity from './Activity/Recent';
import ActivityMobile from './Activity/Mobile';
import OrderDetails from './Details/OrderDetails';
import WithdrawalDetails from './Details/WithdrawalDetails';
import NoActivity from '../components/NoActivity';

const Dashboard = ({ match }) => {
  const [detailsType, setDetailsType] = useState(null);
  const dispatch = useDispatch();
  const { orders, withdrawals, orderAmounts, totalAmount, isLoading } = useSelector((state) => state.Dashboard);
  const kashAccount = useSelector((state) => state.Accounts.kashAccount);

  const openDetails = (id, type = null) => {
    dispatch(getOrderDetailsInit(id, type));
    dispatch(openSliderModal());
    setDetailsType(type);
  };

  useEffect(() => {
    dispatch(getTotalAmountInit());
    dispatch(getAccountsInit('kash'));
    dispatch(getOrderAmountsInit());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrdersInit());
    dispatch(getWithdrawalsInit());
  }, [dispatch]);

  let ModalComponent;

  if (detailsType === 'order') ModalComponent = () => <OrderDetails />;
  if (detailsType === 'withdrawal') ModalComponent = () => <WithdrawalDetails />;

  return (
    <Layout SliderModalComponent={ModalComponent} className={`${orders.length <= 0 && withdrawals.length <= 0 ? 'content-center' : 'content-start'} max-screen`}>
      {isLoading && <Spinner />}
      {!isLoading &&
        (orders.length <= 0 && withdrawals.length <= 0 ? (
          <NoActivity />
        ) : (
          <>
            <Route exact path={match.url}>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <TransferedCharts isLoading={isLoading} orderAmounts={orderAmounts} />
                {isMobile ? (
                  <ActivityMobile openModal={openDetails} withdrawals={withdrawals} isLoading={isLoading} orders={orders} />
                ) : (
                  <RecentActivity openModal={openDetails} withdrawals={withdrawals} isLoading={isLoading} orders={orders} />
                )}
                <TotalTransfered kashAccount={kashAccount} totalAmount={totalAmount} isLoading={isLoading} className='flex-col' />
              </div>
            </Route>
            <Route path={match.url + '/all'}>
              <AllActivity orders={orders} openModal={openDetails} />
            </Route>
          </>
        ))}
    </Layout>
  );
};

export default Dashboard;

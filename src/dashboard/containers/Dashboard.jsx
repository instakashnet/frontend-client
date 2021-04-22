import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { openSliderModal, getOrderDetailsInit } from '../../store/actions';

import Layout from '../../core/components/layout/Layout';
import TotalTransfered from './TotalTransfered';
import TransferedCharts from './TransferedCharts';
import AllActivity from './Activity/All';
import RecentActivity from './Activity/Recent';
import ActivityMobile from './Activity/Mobile';
import OrderDetails from './Details/OrderDetails';
import WithdrawalDetails from './Details/WithdrawalDetails';

const Dashboard = ({ match }) => {
  const [detailsType, setDetailsType] = useState(null);
  const dispatch = useDispatch();
  const { orders, withdrawals, orderAmounts, totalAmount, isLoading } = useSelector((state) => state.Dashboard);

  const openDetails = (id, type = null) => {
    dispatch(getOrderDetailsInit(id, type));
    dispatch(openSliderModal());
    setDetailsType(type);
  };

  let ModalComponent;

  if (detailsType === 'order') ModalComponent = () => <OrderDetails />;
  if (detailsType === 'withdrawal') ModalComponent = () => <WithdrawalDetails />;

  return (
    <Layout SliderModalComponent={ModalComponent} className='content-start max-screen'>
      <Route exact path={match.url}>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          <TotalTransfered totalAmount={totalAmount} isLoading={isLoading} className='flex-col' />
          {isMobile ? (
            <ActivityMobile openModal={openDetails} withdrawals={withdrawals} isLoading={isLoading} orders={orders} />
          ) : (
            <RecentActivity openModal={openDetails} withdrawals={withdrawals} isLoading={isLoading} orders={orders} />
          )}
          <TransferedCharts isLoading={isLoading} orderAmounts={orderAmounts} />
        </div>
      </Route>
      <Route path={match.url + '/all'}>
        <AllActivity orders={orders} openModal={openDetails} />
      </Route>
    </Layout>
  );
};

export default Dashboard;

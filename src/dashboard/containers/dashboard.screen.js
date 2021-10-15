import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { openSliderModal, getOrderDetailsInit, getAccountsInit, getOrdersInit, getWithdrawalsInit } from "../../store/actions";

import Layout from "../../components/layout/layout.component";
import TotalTransfered from "../components/total-transfered.component";
import Spinner from "../../components/UI/spinner.component";
import TransferedCharts from "../components/charts/transfered-charts.component";
import AllActivity from "../components/activity/all-activity.component";
import RecentActivity from "../components/activity/recent-activity.component";
import OrderDetails from "../components/details/order-details.component";
import WithdrawDetails from "../components/details/withdraw-details.component";
import EmptyActivity from "../components/empty-activity.component";

const Dashboard = ({ match }) => {
  const dispatch = useDispatch();
  const { orders, withdrawals, orderAmounts, totalAmount, isLoading } = useSelector((state) => state.Dashboard);
  const { kashAccount } = useSelector((state) => state.Accounts);

  const openDetails = (id, type = null) => {
    let SliderComponent;

    if (type === "order") SliderComponent = () => <OrderDetails title="Datos del pedido" />;
    if (type === "withdrawal") SliderComponent = () => <WithdrawDetails title="Datos del pedido" />;

    dispatch(getOrderDetailsInit(id, type));
    dispatch(openSliderModal(SliderComponent));
  };

  useEffect(() => {
    dispatch(getAccountsInit("kash"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrdersInit());
    dispatch(getWithdrawalsInit());
  }, [dispatch]);

  return (
    <Layout className={`${orders.length <= 0 && withdrawals.length <= 0 ? "content-center" : "content-start"} max-screen`}>
      {isLoading ? (
        <Spinner screen />
      ) : orders.length <= 0 && withdrawals.length <= 0 ? (
        <EmptyActivity />
      ) : (
        <>
          <Route exact path={match.url}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <TransferedCharts isLoading={isLoading} orderAmounts={orderAmounts} />
              <RecentActivity openModal={openDetails} withdrawals={withdrawals} isLoading={isLoading} orders={orders} />
              <TotalTransfered kashAccount={kashAccount} totalAmount={totalAmount} isLoading={isLoading} className="flex-col" />
            </div>
          </Route>
          <Route path={match.url + "/all"}>
            <AllActivity orders={orders} openModal={openDetails} />
          </Route>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;

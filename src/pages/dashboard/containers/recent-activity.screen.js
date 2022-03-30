import React, { useEffect } from "react";
// REDUX
import { useDispatch,useSelector } from "react-redux";

// HOOK
import { useDeviceDetect } from "../../../shared/hooks/useDeviceDetect";
// REDUX ACTIONS
import { getAccountsInit,getOrdersInit, getWithdrawalsInit } from "../../../store/actions";
// COMPONENTS
import { ActivityMobile } from "../components/activity/mobile-activity.component";
import RecentActivity from "../components/activity/recent-activity.component";
import TransferedCharts from "../components/charts/transfered-charts.component";
import EmptyActivity from "../components/empty-activity.component";
import TotalTransfered from "../components/total-transfered.component";

export const RecentActivityScreen = ({ orders, withdrawals, openDetails }) => {
  const dispatch = useDispatch(),
    { orderAmounts, totalAmount } = useSelector((state) => state.Activity),
    { kashAccount } = useSelector((state) => state.Accounts),
    { isMobile } = useDeviceDetect();

  // EFFECTS
  useEffect(() => {
    dispatch(getOrdersInit(5, true));
    dispatch(getWithdrawalsInit());
    dispatch(getAccountsInit("kash"));
  }, [dispatch]);

  return orders.length <= 0 && withdrawals.length <= 0 ? (
    <EmptyActivity />
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <TransferedCharts orderAmounts={orderAmounts} />
      {isMobile ? (
        <ActivityMobile openModal={openDetails} withdrawals={withdrawals} orders={orders} />
      ) : (
        <RecentActivity openModal={openDetails} withdrawals={withdrawals} orders={orders} />
      )}

      <TotalTransfered kashAccount={kashAccount} totalAmount={totalAmount} className="flex-col" />
    </div>
  );
};

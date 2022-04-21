import { Repeat } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import _ from "lodash";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
// COMPONENTS
import Card from "../../../../components/UI/card.component";
// CLASSES
import sharedClass from "../../assets/css/sharedClasses.module.scss";
// COMPONENT
import { OrderItem } from "../orders/order-item.component";


export const ActivityMobile = ({ orders, withdrawals, openModal }) => {
  const [ordersPage, setOrdersPage] = useState(1),
    [withdrawalsPage, setWithdrawalsPage] = useState(1),
    groupedOrders = _.chunk(orders, 4),
    groupedWithdrawals = _.chunk(withdrawals, 4);

  // HANDLERS
  const onOrdersChange = (index) => setOrdersPage(index + 1),
    onWithdrawalsChange = (index) => setWithdrawalsPage(index + 1);

  return (
    <>
      <div className={sharedClass.DashboardCard}>
        <h2 className="flex font-bold items-center mb-2">
          <Repeat className="mr-2" /> Últimos cambios de divisa
        </h2>
        <SwipeableViews style={{ padding: "0 10px 0 0" }} index={ordersPage - 1} slideStyle={{ padding: "0 5px" }} onChangeIndex={onOrdersChange}>
          {groupedOrders.map((orders, i) => (
            <div className="flex flex-col items-center py-4" key={i}>
              {orders.map((order) => (
                <Card key={order.id} className="mb-5 w-full">
                  <OrderItem order={order} type="order" openModal={openModal} isMobile />
                </Card>
              ))}
            </div>
          ))}
        </SwipeableViews>
        {groupedOrders.length > 1 && <Pagination count={groupedOrders.length} page={ordersPage} onChange={(_, value) => setOrdersPage(value)} color="primary" />}
      </div>
      <div className={sharedClass.DashboardCard}>
        <h2 className="flex items-center mb-2">
          <Repeat className="mr-2" /> Últimos retiros KASH
        </h2>
        <SwipeableViews style={{ padding: "0 10px 0 0" }} index={withdrawalsPage - 1} slideStyle={{ padding: "0 5px" }} onChangeIndex={onWithdrawalsChange}>
          {groupedWithdrawals.map((withdrawals, i) => (
            <div className="flex flex-col items-center py-4" key={i}>
              {withdrawals.map((withdrawal) => (
                <Card key={withdrawal.id} className="mb-5 w-full">
                  <OrderItem order={withdrawal} type="withdrawal" openModal={openModal} isMobile />
                </Card>
              ))}
            </div>
          ))}
        </SwipeableViews>
        {withdrawalsPage.length > 1 && <Pagination count={groupedWithdrawals.length} page={withdrawalsPage} onChange={(_, value) => setWithdrawalsPage(value)} color="primary" />}
      </div>
    </>
  );
};

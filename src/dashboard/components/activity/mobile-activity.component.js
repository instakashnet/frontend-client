import React from "react";
import _ from "lodash";
import SwipeableViews from "react-swipeable-views";
import { Repeat } from "@material-ui/icons";

import Card from "../../../components/UI/card.component";
import { OrderItem } from "../orders/order-item.component";

import classes from "../../assets/css/activity-components.module.scss";

export const ActivityMobile = ({ orders, withdrawals, openModal }) => {
  const groupedOrders = _.chunk(orders, 4);
  const groupedWithdrawals = _.chunk(withdrawals, 4);

  return (
    <div>
      <div className={classes.DashboardCard}>
        <h2 className="flex font-bold items-center mb-2">
          <Repeat className="mr-2" /> Últimos cambios de divisa
        </h2>
        <SwipeableViews>
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
      </div>
      <div className={classes.DashboardCard}>
        <h2 className="flex items-center mb-2 mt-6">
          <Repeat className="mr-2" /> Últimos retiros KASH
        </h2>
      </div>
    </div>
  );
};

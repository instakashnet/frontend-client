import React from "react";
import { Link } from "react-router-dom";
import { Repeat } from "react-feather";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";

import Card from "../../../core/components/UI/card.component";
import OrderItem from "./order-item.component";
import WithdrawalItem from "./withdraw-item.component";

import classes from "../../assets/css/activity-components.module.scss";

const RecentActivity = ({ orders, withdrawals, openModal, isLoading }) => {
  return (
    <div>
      <div className={classes.DashboardCard}>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center mb-2">
            <Repeat className="mr-2" size={20} /> Últimos cambios de divisa
          </h2>
          {orders.length > 4 && <Link to="/dashboard/all">Ver todos</Link>}
        </div>
        {isLoading && <Skeleton count={5} height={20} />}
        {!isLoading &&
          (orders.length > 0 ? (
            <Card className="p-0">
              {_.slice(orders, 0, 4).map((order) => (
                <OrderItem key={order.id} order={order} openModal={openModal} />
              ))}
            </Card>
          ) : null)}
      </div>
      <div className={classes.DashboardCard}>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center mb-3">
            <Repeat className="mr-2" size={20} /> Últimos retiros KASH
          </h2>
          {withdrawals.length > 4 && <Link to="/dashboard/all">Ver todos</Link>}
        </div>
        {isLoading && <Skeleton count={5} height={20} />}
        {!isLoading &&
          (withdrawals.length > 0 ? (
            <Card className="p-0">
              {_.slice(withdrawals, 0, 4).map((withdrawal) => (
                <WithdrawalItem key={withdrawal.id} withdrawal={withdrawal} openModal={openModal} />
              ))}
            </Card>
          ) : null)}
      </div>
    </div>
  );
};

export default React.memo(RecentActivity);
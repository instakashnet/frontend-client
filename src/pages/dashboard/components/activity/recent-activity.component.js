import { Repeat } from "@material-ui/icons";
import _ from "lodash";
import React from "react";
// REACT ROUTER
import { Link } from "react-router-dom";
// COMPONENT
import Card from "../../../../components/UI/card.component";
// CLASSES
import sharedClass from "../../assets/css/sharedClasses.module.scss";
// COMPONENT
import { OrderItem } from "../orders/order-item.component";


const RecentActivity = ({ orders, withdrawals, openModal }) => {
  return (
    <div>
      <div className={sharedClass.DashboardCard}>
        <div className="flex items-center justify-between">
          <h2 className="flex font-bold items-center mb-2">
            <Repeat className="mr-2" size={20} /> Últimos cambios de divisa
          </h2>
          {orders?.length > 4 && <Link to="/dashboard/all">Ver todos</Link>}
        </div>
        {orders?.length > 0 && (
          <Card className="py-2">
            {_.slice(orders, 0, 4).map((order) => (
              <OrderItem key={order.id} order={order} type="order" openModal={openModal} />
            ))}
          </Card>
        )}
      </div>
      <div className={sharedClass.DashboardCard}>
        <div className="flex items-center justify-between">
          <h2 className="flex font-bold items-center mb-3">
            <Repeat className="mr-2" size={20} /> Últimos retiros KASH
          </h2>
          {withdrawals?.length > 4 && <Link to="/dashboard/all">Ver todos</Link>}
        </div>
        {withdrawals?.length > 0 && (
          <Card className="py-2">
            {_.slice(withdrawals, 0, 4).map((withdrawal) => (
              <OrderItem key={withdrawal.id} order={withdrawal} type="withdrawal" openModal={openModal} />
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

export default React.memo(RecentActivity);

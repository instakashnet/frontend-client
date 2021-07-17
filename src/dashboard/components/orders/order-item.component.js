import React from "react";
import { ArrowRight } from "react-feather";
import { formatAmount } from "../../../shared/functions";

import { StatusBadge } from "../../../core/components/UI/status-badge.component";

import classes from "../../assets/css/activity-components.module.scss";

export const OrderItem = ({ order, type, isMobile, openModal }) => {
  return (
    <div className={classes.OrderItem} onClick={() => openModal(order.id, type)} role="button">
      {isMobile && (
        <>
          <div className={classes.OrderTitle}>
            <h4>Solicitud</h4>
            <h4>Estado</h4>
          </div>
          <hr />
        </>
      )}
      <div className="flex items-center mt-3">
        <div className={classes.OrderInfo}>
          <p>{order.uuid}</p>
          <span>{order.currencyReceivedSymbol ? `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}` : `${order.kashQty} KASH`}</span>
        </div>
        <StatusBadge
          name={order.estateName ? order.estateName.toLowerCase() : order.statusName.toLowerCase()}
          className="ml-auto mr-3 md:mr-6"
          color={order.stateColor || order.statusColor}
        />
        <span className={classes.OrderView}>
          Ver más <ArrowRight size={20} />
        </span>
      </div>
    </div>
  );
};

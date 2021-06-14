import React from "react";
import moment from "moment";
import { formatAmount } from "../../../shared/functions";

import Button from "../../../core/components/UI/button.component";

import classes from "../../assets/css/activity-components.module.scss";

const AcitivityItem = ({ order, openModal }) => {
  return (
    <div className={classes.AcitivityItem}>
      <div className={classes.Color} style={{ backgroundColor: order.stateColor }} />
      <div className={classes.Info}>
        <p>{order.uuid}</p>
        <span>{moment(order.created).format("DD/MM/YY HH:mm a")}</span>
        <p className={classes.Price}>{`${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`}</p>
      </div>
      <Button className={classes.ViewButton} onClick={() => openModal(order.id, "order")}>
        Ver más
      </Button>
    </div>
  );
};

export default React.memo(AcitivityItem);

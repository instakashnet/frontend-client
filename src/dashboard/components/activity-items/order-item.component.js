import React from "react";
import { ArrowRight } from "@material-ui/icons";
import { formatAmount, convertHexToRGBA } from "../../../shared/functions";

import classes from "../../assets/css/activity-components.module.scss";

const AcitivityItem = ({ order, openModal }) => {
  return (
    <div className={classes.ActivityItem} onClick={() => openModal(order.id, "order")} role="button">
      <div className={classes.Info}>
        <p>{order.uuid}</p>
        <p className={classes.Price}>{`${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`}</p>
      </div>
      <div className={classes.StatusBadge} style={{ borderColor: order.stateColor, backgroundColor: convertHexToRGBA(order.stateColor, 10) }}>
        {order.estateName.toLowerCase()}
      </div>
      <span className={classes.View}>
        Ver más <ArrowRight size={20} className="ml-2" />
      </span>
    </div>
  );
};

export default React.memo(AcitivityItem);

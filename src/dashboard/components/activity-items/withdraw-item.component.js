import React from "react";
import moment from "moment";

import Button from "../../../core/components/UI/button.component";

import classes from "../../assets/css/activity-components.module.scss";

const AcitivityItem = ({ withdrawal, openModal }) => {
  return (
    <div className={classes.AcitivityItem}>
      <div className={classes.Color} style={{ backgroundColor: withdrawal.statusColor }} />
      <div className={classes.Info}>
        <p>{withdrawal.uuid}</p>
        <span>{moment(withdrawal.createdAt).format("DD/MM/YY HH:mm a")}</span>
        <p className={classes.Price}>{withdrawal.kashQty} KASH</p>
      </div>
      <Button className={classes.ViewButton} onClick={() => openModal(withdrawal.id, "withdrawal")}>
        Ver más
      </Button>
    </div>
  );
};

export default React.memo(AcitivityItem);

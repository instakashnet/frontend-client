import React from "react";
import moment from "moment";

// HELPERS
import { formatAmount } from "../../../../shared/functions";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { closeSliderModal } from "../../../../store/actions";

// COMPONENTS
import { StatusBadge } from "../../../../components/UI/status-badge.component";
import { Button } from "../../../../components/UI/button.component";

// CLASSES
import classes from "../modules/details/order_withdraw-details.module.scss";

const WithdrawalDetails = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.Dashboard.details);

  const closeModalHandler = () => dispatch(closeSliderModal());

  return details.statusName ? (
    <div className={classes.Details}>
      <div className="flex items-center justify-between">
        <h4>Estado:</h4>
        <StatusBadge color={details.statusColor} name={details.statusName.toLowerCase()} />
      </div>
      <div className="flex items-center justify-between pr-2 my-3">
        <h4>Pedido:</h4>
        <span>{details.uuid}</span>
      </div>
      <div className="flex items-center justify-between pr-2 my-3">
        <h4>Fecha:</h4>
        <span>{moment(details.createdAt).format("DD/MM/YY [-] HH:mm")}</span>
      </div>
      <div className="flex items-center justify-between pr-2 my-3">
        <h4>Solicitado:</h4>
        <span className={classes.Price}>
          {details.kashQty} KASH = $ {formatAmount(details.kashQty)}
        </span>
      </div>
      <h3 className="mt-4">Cuenta que recibe:</h3>
      <div className="flex items-center justify-between pr-2 my-2">
        <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankName.toLowerCase()}-logo.svg`} width={80} alt={details.bankName} />
        <span>{`*********${details.accountToIdRaw.substring(details.accountToIdRaw.length - 4, details.accountToIdRaw.length)}`}</span>
      </div>

      <Button type="button" className="action-button block mt-8 mx-auto" onClick={closeModalHandler}>
        Aceptar
      </Button>
    </div>
  ) : null;
};

export default React.memo(WithdrawalDetails);

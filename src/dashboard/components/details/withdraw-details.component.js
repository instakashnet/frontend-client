import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { formatAmount } from "../../../shared/functions";
import { closeSliderModal } from "../../../store/actions";

import Button from "../../../core/components/UI/button.component";

import classes from "../../assets/css/activity-components.module.scss";

const WithdrawalDetails = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.Dashboard.details);

  const closeModalHandler = () => dispatch(closeSliderModal());

  return details.statusName ? (
    <div className={classes.Details}>
      <h2>Detalles de la operación</h2>
      <div className="flex items-center justify-between">
        <h4>Estado:</h4>
        <span className="rounded-lg py-2 px-3" style={{ backgroundColor: details.statusColor, fontSize: ".8rem" }}>
          {details.statusName.toLowerCase()}
        </span>
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

      <div className="flex justify-center mt-4">
        <Button type="button" className={classes.CloseButton} onClick={closeModalHandler}>
          Aceptar
        </Button>
      </div>
    </div>
  ) : null;
};

export default React.memo(WithdrawalDetails);

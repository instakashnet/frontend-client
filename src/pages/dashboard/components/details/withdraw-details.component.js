import moment from "moment";
import React from "react";
// REDUX
import { useDispatch,useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

// COMPONENTS
import { Button } from "../../../../components/UI/button.component";
// import { StatusBadge } from "../../../../components/UI/status-badge.component";
// HELPER
import { formatAmount } from "../../../../shared/functions";
// REDUX ACTIONS
import { closeSliderModal } from "../../../../store/actions";
// CLASSES
import classes from "../modules/details/order_withdraw-details.module.scss";

const WithdrawalDetails = () => {
  const dispatch = useDispatch();
  const { details, detailsLoading } = useSelector((state) => state.Activity);

  const closeModalHandler = () => dispatch(closeSliderModal());

  return (
    <div className={classes.Details}>
      {
        detailsLoading ?
        <div className="flex items-center flex-col justify-center mt-12">
          <HashLoader size={60} loading={detailsLoading} margin={4} color="#0d8284" />
          <p className="mt-4">Cargando...</p>
        </div>
        :
        <>
        {/*<div className="flex items-center justify-between">
        <h4>Estado:</h4>
        <StatusBadge color={details.statusColor} name={details.statusName.toLowerCase()} />
      </div>*/}
      <div className="flex items-center justify-between pr-2 my-3">
      <h4>Pedido:</h4>
      <span>{details.uuid}</span>
    </div>
    <div className="flex items-center justify-between pr-2 my-3">
      <h4>Fecha:</h4>
      <span>{moment(details.createdAt).format("DD/MM/YY - hh:mm a")}</span>
    </div>
    <div className="flex items-center justify-between pr-2 my-3">
      <h4>Solicitado:</h4>
      <span className={classes.Price}>
        {details.kashQty} KASH = $ {formatAmount(details.kashQty)}
      </span>
    </div>
    <h3 className="mt-4">Cuenta que recibe:</h3>
    <div className="flex items-center justify-end pr-2 my-2">
      {/*<img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankName.toLowerCase()}-logo.svg`} width={80} alt={details.bankName} />*/}
      <span>{`*********${details.accountToIdRaw.substring(details.accountToIdRaw.length - 4, details.accountToIdRaw.length)}`}</span>
    </div>

    <Button type="button" className="action-button block mt-8 mx-auto" onClick={closeModalHandler}>
      Aceptar
    </Button>
    </>
      }
    </div>
  );
};

export default React.memo(WithdrawalDetails);

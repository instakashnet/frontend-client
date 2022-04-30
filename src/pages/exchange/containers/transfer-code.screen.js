import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cancelExchangeInit, closeModal, openModal } from "../../../store/actions";
import Timer from "../components/calculator-items/timer.component";
import { EmailTransfer } from "../components/complete-items/email-transfer.component";
import { TransactionCode } from "../components/complete-items/transaction-code.component";
import OrderTimeout from "../components/timeout-modal.component";
import classes from "./modules/complete.screen.module.scss";

export const TransferCodeScreen = () => {
  // VARIABLES
  const dispatch = useDispatch(),
    history = useHistory(),
    { order, isProcessing } = useSelector((state) => state.Exchange);

  let now = new Date().getTime(),
    orderExpire = new Date(order.expiredAt).getTime();

  const time = orderExpire - now;

  // HANDLERS
  const onTimeout = () => {
    (now - orderExpire) < 40000
      ? dispatch(cancelExchangeInit(order.id, "complete", false))
      : history.push("/currency-exchange");

    dispatch(closeModal());
  };

  const orderTimeoutHandler = () => {
    let modalContent = () => <OrderTimeout onClose={onTimeout} strictClose />;

    dispatch(openModal(modalContent));
  };

  return (
    <div className={classes.TransferCode}>
      {order.bankFromClientActive ? (
        <>
          <h1>Ingresa el número de operación</h1>
          <p className="mt-3">
            Coloque el número de operación <b>emitido por su banco</b> dentro del casillero mostrado debajo para que podamos confirmar la operación.
          </p>
          <TransactionCode dispatch={dispatch} order={order} isProcessing={isProcessing} />
        </>
      ) : (
        <>
          <h1>Envíanos el voucher de tu banco</h1>
          <p className="my-3 text-left">
            Envíanos la constancia de tu transferencia a nuestro correo <b>desde la APP de tu banco.</b>
          </p>
          <EmailTransfer dispatch={dispatch} order={order} isProcessing={isProcessing} />
        </>
      )}
      <div className="flex items-center justify-between mt-1">
        <p>Tiempo para completar tu operación:</p>
        <Timer onFinish={orderTimeoutHandler} time={time > 0 ? time : 10} />
      </div>
    </div>
  );
};
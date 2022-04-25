import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button } from "../../../components/UI/button.component";
import Card from "../../../components/UI/card.component";
import CopyButton from "../../../components/UI/copy-button.component";
import { formatAmount } from "../../../shared/functions";
import { cancelExchangeInit, closeModal, openModal } from "../../../store/actions";
import Timer from "../components/calculator-items/timer.component";
import OrderTimeout from "../components/timeout-modal.component";
import classes from "./modules/complete.screen.module.scss";

const CompleteExchange = () => {
  const dispatch = useDispatch(),
    history = useHistory(),
    { order, isProcessing } = useSelector((state) => state.Exchange);

  if (!order) return <Redirect to="/currency-exchange" />;

  const time = new Date(order.expiredAt).getTime() - new Date().getTime() + 3000;

  // HANDLERS
  const onTimeout = () => {
    dispatch(closeModal());
    history.push("/currency-exchange");
  };

  const orderTimeoutHandler = () => {
    let modalContent = () => <OrderTimeout onClose={onTimeout} strictClose />;

    dispatch(openModal(modalContent));
  };

  return (
    <div className={classes.TransferCode}>
      <h1>Realiza la transferencia</h1>
      <p>Transfiere desde tu banca por internet {order?.bankFromName} el importe de:</p>
      <p className={classes.Amount}>{`${order.currencySentSymbol} ${formatAmount(order.amountSent)}`}</p>

      <p className="font-bold text-left mt-3">Datos para transferir:</p>
      <Card className={`${classes.TransferAccount} mt-2 flex flex-wrap items-center justify-between`}>
        <img src={`${process.env.PUBLIC_URL}/images/banks/${order?.bankFromName.toLowerCase()}-logo.svg`} width={85} alt={order.bankFromName} />
        <div className="text-center md:text-right text-base">
          <span>Cuenta corriente en {order.currencySent === "PEN" ? "Soles" : "Dólares"}:</span>
          <p className="flex items-center md:justify-end">
            <span>{order.accountFromRaw}</span>
            <CopyButton textToCopy={order.accountFromRaw} />
          </p>
        </div>
      </Card>

      <Card className={`${classes.TransferAccount} flex items-center justify-between mt-5`}>
        <p className="font-bold my-4">Instakash SAC - RUC 20605285105</p>
        <CopyButton textToCopy="20605285105" />
      </Card>

      <p className="font-bold mt-5">¿Ya realizaste tu transferencia?</p>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <Link to="/currency-exchange/transfer-code" className={`${classes.ActionButton} m-3 lg:order-2`}>
          Continuar
        </Link>

        <Button
          type="button"
          className={`secondary-button m-3 ld-over ${isProcessing ? "running" : ""}`}
          disabled={isProcessing}
          onClick={() => dispatch(cancelExchangeInit(order.id, "complete"))}
        >
          <span className="ld ld-ring ld-spin" />
          Cancelar
        </Button>
      </div>
      <div className="flex items-center justify-between mt-1">
        <p>Tiempo para completar tu operación:</p>
        <Timer onFinish={orderTimeoutHandler} time={time > 0 ? time : 10} />
      </div>
    </div>
  );
};

export default CompleteExchange;

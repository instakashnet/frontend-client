import React from "react";
import { Redirect } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";

// HELPERS
import { formatAmount } from "../../../shared/functions";

// COMPONENTS
import { TransactionCode } from "../components/complete-items/transaction-code.component";
import { EmailTransfer } from "../components/complete-items/email-transfer.component";
import CopyButton from "../../../components/UI/copy-button.component";
import Card from "../../../components/UI/card.component";

// ASSETS & CLASSES
import TransferImg from "../assets/images/transfer.svg";
import classes from "../assets/css/exchange-screens.module.scss";

const CompleteExchange = () => {
  const dispatch = useDispatch();
  const { isProcessing, order } = useSelector((state) => state.Exchange);

  if (!order) return <Redirect to="/currency-exchange" />;

  return (
    <div className={classes.TransferCode}>
      <h1>¡Último paso!</h1>
      <img src={TransferImg} alt="transfer-money" className="mx-auto inline-block mb-2" />
      <p>Ahora transfiere el monto de</p>
      <p className={classes.Amount}>{`${order.currencySentSymbol} ${formatAmount(order.amountSent)}`}</p>

      <p className="mb-2">desde tu banca por internet a la siguiente cuenta:</p>
      <Card className={`${classes.TransferAccount} flex flex-col md:flex-row items-center justify-center md:justify-between`}>
        <img src={`${process.env.PUBLIC_URL}/images/banks/${order.bankFromName.toLowerCase()}-logo.svg`} width={85} alt={order.bankFromName} />
        <div className="text-center md:text-right text-base">
          <span>Cuenta corriente en {order.currencySent === "PEN" ? "Soles" : "Dólares"}:</span>
          <p className="flex items-center md:justify-end">
            <span>{order.accountFromRaw}</span>
            <CopyButton textToCopy={order.accountFromRaw} />
          </p>
        </div>
      </Card>

      <p className="font-bold my-4">Instakash SAC - RUC 20605285105</p>

      <div className="flex flex-wrap justify-center items-center">
        <section className="mx-3">
          <p>Recibirás:</p>
          <p className="font-bold text-green">
            {order.currencyReceivedSymbol} {formatAmount(order.amountReceived)}
          </p>
        </section>
        <section className="mx-3">
          <p>Tipo de cambio:</p>
          <p className="font-bold text-green">{order.rate}</p>
        </section>
      </div>

      {order.bankFromClientActive ? (
        <>
          <p className="mt-4 text-left">
            Una vez realizado coloque el número de operación <b>emitido por su banco</b> dentro del casillero mostrado debajo y debe darle al botón de <i>"enviar"</i>.
          </p>
          <TransactionCode dispatch={dispatch} order={order} isProcessing={isProcessing} />
        </>
      ) : (
        <>
          <p className="my-4 text-left">
            Ahora deberás enviarnos la constancia de tu transferencia a nuestro correo <b>desde la APP de tu banco.</b>
          </p>
          <EmailTransfer dispatch={dispatch} order={order} isProcessing={isProcessing} />
        </>
      )}
    </div>
  );
};

export default CompleteExchange;

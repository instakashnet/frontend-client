import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Info } from "react-feather";
import { formatAmount } from "../../shared/functions";
import { processCodeInit, cancelExchangeInit } from "../../store/actions";
import { transferCodeValidation } from "../helpers/validations";

import Tooltip from "../../core/components/UI/Tooltip";
import Input from "../../core/components/UI/form/Input";
import Button from "../../core/components/UI/Button";
import CopyButton from "../../core/components/UI/CopyButton";
import Card from "../../core/components/UI/Card";

import TransferImg from "../images/transfer.svg";

import classes from "./Exchange.module.scss";

const TransferCode = ({ order }) => {
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { transaction_code: "" },
    validationSchema: transferCodeValidation,
    onSubmit: (values) => dispatch(processCodeInit(values, order.id)),
  });
  const isProcessing = useSelector((state) => state.Exchange.isProcessing);

  return (
    <div className={classes.TransferCode}>
      <h1>¡Último paso!</h1>
      <img src={TransferImg} alt="transfer-money" className="mx-auto inline-block my-4" />
      <p>Transfiere desde tu banco por internet el monto de:</p>
      <p className={classes.Amount}>
        {`${order.currencySentSymbol} ${formatAmount(order.amountSent)}`} <CopyButton textToCopy={order.amountSent} />
      </p>

      <h4>Banco a transferir:</h4>
      <Card className={`${classes.TransferAccount} flex items-center justify-between`}>
        <img src={`${process.env.PUBLIC_URL}/images/banks/${order.bankFromName.toLowerCase()}-logo.svg`} width={100} alt={order.bankFromName} />
        <div className="text-right text-base">
          <small>Cuenta corriente en {order.currencySent === "PEN" ? "Soles" : "Dólares"}:</small>
          <p className="flex items-center mt-1">
            {order.accountFromRaw} <CopyButton textToCopy={order.accountFromRaw} />
          </p>
        </div>
      </Card>

      <Card className={`${classes.TransferAccount} mt-8 flex items-center justify-between`}>
        <p className="text-left">Instakash SAC - RUC 20605285105</p>
        <CopyButton textToCopy="20605285105" />
      </Card>

      <p className="mb-6 mt-8 text-left">
        Una vez realizado coloque el número de operación <b>emitido por su banco</b> dentro del casillero mostrado debajo darle a enviar.
      </p>
      <div className="flex items-center justify-end mb-3">
        <span className="text-sm font-bold cursor-pointer underline">¿Donde lo encuentro?</span>
        <Tooltip
          title={<img src={`${process.env.PUBLIC_URL}/images/samples/transfer-${order.bankFromName.toLowerCase()}.png`} alt="ejemplo de transferencia" />}
          placement="top-start"
          disableHoverListener
          onMouseEnter={() => setShowInfo(true)}
          onClick={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          open={showInfo}>
          <Info className="ml-2" />
        </Tooltip>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="transaction_code"
          placeholder="Ingresa el nro. de operación"
          value={formik.values.transaction_code}
          error={formik.errors.transaction_code}
          touched={formik.touched.transaction_code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="uppercase text-left text-sm">Solo posees 15 minutos para enviarnos el nro. de tu operación.</p>
        <Button type="submit" className={`action-button mt-6 ld-ext-right ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
          <span className="ld ld-ring ld-spin" />
          Enviar
        </Button>
        <Button type="button" className="secondary-button mt-6" onClick={() => dispatch(cancelExchangeInit(order.id))}>
          Cancelar
        </Button>
      </form>
    </div>
  );
};

export default TransferCode;

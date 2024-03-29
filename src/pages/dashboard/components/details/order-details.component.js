// FORMIK
import { useFormik } from "formik";
import moment from "moment";
import React from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// REACT SPINNER
import { HashLoader } from "react-spinners";
// COMPONENTS
import { Button } from "../../../../components/UI/button.component";
import CopyButton from "../../../../components/UI/copy-button.component";
import { Input } from "../../../../components/UI/form-items/input.component";
import { StatusBadge } from "../../../../components/UI/status-badge.component";
// HELPER
import { convertRate, formatAmount } from "../../../../shared/functions";
// REDUX ACTIONS
import { cancelExchangeInit, closeSliderModal, processCodeInit } from "../../../../store/actions";
// HELPER
import { transactionCodeValidation } from "../../helpers/validations";
// CLASSES
import classes from "../modules/details/order_withdraw-details.module.scss";


const OrderDetails = () => {
  const { details, detailsLoading } = useSelector((state) => state.Activity),
    dispatch = useDispatch(),
    isProcessing = useSelector((state) => state.Exchange.isProcessing),
    formik = useFormik({
      initialValues: { transaction_code: "" },
      validationSchema: transactionCodeValidation,
      onSubmit: (values) => dispatch(processCodeInit(values, details.id, "details", closeModalHandler)),
    });

  // HANDLERS
  const closeModalHandler = () => dispatch(closeSliderModal());
  const cancelExchangeHandler = () => dispatch(cancelExchangeInit(details.id, "details", closeModalHandler));

  return (
    <div className={classes.Details}>
      {!detailsLoading && details ? (
        <>
          <div className="flex items-center justify-between">
            <h4>Estado:</h4>
            <StatusBadge color={details.stateColor} name={details.estateName?.toLowerCase()} />
          </div>
          <div className="flex items-center justify-between pr-2 my-3">
            <h4>Pedido:</h4>
            <span>{details.uuid}</span>
          </div>
          <div className="flex items-center justify-between pr-2 my-3">
            <h4>Fecha:</h4>
            <span>{details.completedAt ? moment(details.completedAt).format("DD/MM/YY - hh:mm a") : moment(details.created).format("DD/MM/YY - hh:mm a")}</span>
          </div>
          <div className="flex items-center justify-between pr-2 my-3">
            <h4>Solicitado:</h4>
            <span className={classes.Price}>{`${details.currencyReceivedSymbol} ${formatAmount(details.amountReceived)}`}</span>
          </div>
          {details.kashApplied ? (
            <div className="flex items-center justify-between pr-2 my-3">
              <h4>KASH canjeados:</h4>
              <span className={classes.Price}>{details.kashUsed} KASH</span>
            </div>
          ) : null}
          <div className="flex items-center justify-between pr-2 my-3">
            <h4>Tasa de cambio:</h4>
            <span>{convertRate(details.rate)}</span>
          </div>
          {details.couponName && (
            <div className="flex items-center justify-between pr-2 my-3">
              <h4>Cupón aplicado:</h4>
              <span>{details.couponName}</span>
            </div>
          )}
          <h3 className="mt-4">Cuenta que recibe:</h3>
          <div className="flex items-center justify-between pr-2 my-2">
            <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankSent?.toLowerCase()}-logo.svg`} width={80} alt={details.bankSent} />
            <span>{`*********${details.accountToRaw?.substring(details.accountToRaw.length - 4, details.accountToRaw.length)}`}</span>
          </div>

          {details.accountToThird && (
            <>
              <div className="flex items-center justify-between pr-2 my-3">
                <h4>Nombre del titular:</h4>
                <span>{details.accountToThird.name}</span>
              </div>
              <div className="flex items-center justify-between pr-2 my-3">
                <h4>Documento:</h4>
                <span>
                  {details.accountToThird.documentType} {details.accountToThird.documentNumber}
                </span>
              </div>
            </>
          )}

          {details.statusId === 2 ? (
            <>
              <h2 className="mt-5">Completa tu operación</h2>
              <h3>Cuenta a transferir:</h3>
              <div className="flex items-center justify-between pr-2 my-2">
                <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankReceive?.toLowerCase()}-logo.svg`} width={80} alt={details.bankReceive} />
                <div className="flex items-center">
                  <span>{details.accountFromRaw}</span>
                  <CopyButton textToCopy={details.accountFromRaw} />
                </div>
              </div>
              <p>Instakash SAC - RUC 20605285105</p>
              <div className="flex items-center justify-between mt-3">
                <p>Monto a enviar:</p>
                <div className="flex items-center">
                  <p className={classes.Price}>
                    {details.currencySentSymbol} {formatAmount(details.amountSent)}
                  </p>
                  <CopyButton textToCopy={details.amountSent} />
                </div>
              </div>
              <form onSubmit={formik.handleSubmit} className="mt-8">
                <Input
                  name="transaction_code"
                  placeholder="Número de transferencia"
                  value={formik.values.transaction_code}
                  error={formik.errors.transaction_code}
                  touched={formik.touched.transaction_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-2">
                  <Button type="submit" className={`action-button ld-over ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
                    <span className="ld ld-ring ld-spin" />
                    Enviar
                  </Button>
                  <Button type="button" className={`secondary-button ld-over ${isProcessing ? "running" : ""}`} disabled={isProcessing} onClick={cancelExchangeHandler}>
                    <span className="ld ld-ring ld-spin" />
                    Cancelar
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <Button type="button" className="action-button block mt-8 mx-auto" onClick={closeModalHandler}>
              Aceptar
            </Button>
          )}
        </>
      ) : (
        <div className="flex items-center flex-col justify-center mt-12">
          <HashLoader size={60} loading={detailsLoading} margin={4} color="#0d8284" />
          <p className="mt-4">Cargando...</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(OrderDetails);

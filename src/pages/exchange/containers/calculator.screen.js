import { useFormik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/UI/button.component";
import Card from "../../../components/UI/card.component";
import { createExchangeInit, deleteCoupon, getLastOrderInit, getRatesInit, validateCouponInit } from "../../../store/actions";
import CouponInput from "../components/calculator-items/coupon-input.component";
import Input from "../components/calculator-items/currency-input.component";
// COMPONENTS
import Rates from "../components/calculator-items/rates.component";
import Swipe from "../components/calculator-items/swipe.component";
import Timer from "../components/calculator-items/timer.component";
// CLASSES
import classes from "./modules/calculator.screen.module.scss";
import sharedClass from "./modules/sharedClasses.module.scss";

const Calculator = ({ profile, setModal, user }) => {
  const dispatch = useDispatch(),
    [couponName, setCouponName] = useState(""),
    [actualRates, setActualRates] = useState({ buy: 0, sell: 0 }),
    [couponRates, setCouponRates] = useState({ buy: 0, sell: 0 }),
    [isCouponMin, setIsCouponMin] = useState(false),
    temporalAmountSent = useRef(null),
    { rates, ratesLoading, coupon, isProcessing } = useSelector((state) => state.Exchange),
    formik = useFormik({
      initialValues: {
        currency_sent_id: 2,
        currency_received_id: 1,
        rate_id: rates.id || "",
        type: "sell",
        amount_sent: 0,
        amount_received: 0,
        couponName: "",
      },
      enableReinitialize: true,
      onSubmit: (values) => {
        if ((values.type === "sell" && values.amount_received >= 1000) || (values.type === "buy" && values.amount_sent >= 1000)) {
          if (user.level < 3) return setModal("complete");
        }
        return dispatch(createExchangeInit(values, temporalAmountSent?.current || 0, profile));
      },
    }),
    { values, setFieldValue } = formik,
    { type, amount_sent, amount_received } = values,
    sellRate = coupon ? couponRates.sell : actualRates.sell,
    buyRate = coupon ? couponRates.buy : actualRates.buy;

  // EFFECTS
  useEffect(() => {
    dispatch(getLastOrderInit());
    dispatch(getRatesInit());
  }, [dispatch]);

  useEffect(() => {
    if (coupon) dispatch(deleteCoupon());

    if (rates.buy > 0 && rates.sell > 0) {
      setActualRates({ buy: rates.buy, sell: rates.sell });
      let amountSent = 1000 * rates.sell;
      temporalAmountSent.current = amountSent;
      setFieldValue("amount_sent", amountSent.toFixed(2));
      setFieldValue("amount_received", 1000);

      if (user.isReferal) dispatch(validateCouponInit("NUEVOREFERIDO1", profile?.type));
    }
    // eslint-disable-next-line
  }, [rates, dispatch, user.isReferal, setFieldValue]);

  useEffect(() => {
    if (coupon && actualRates.buy > 0 && actualRates.sell > 0) {
      setCouponRates({ buy: actualRates.buy + coupon.discount, sell: actualRates.sell - coupon.discount });
      setFieldValue(
        "amount_received",
        type === "buy" ? (amount_sent * (actualRates.buy + coupon.discount)).toFixed(2) : (amount_sent / (actualRates.sell - coupon.discount)).toFixed(2)
      );
      setFieldValue("couponName", coupon.name);
    }

    // eslint-disable-next-line
  }, [coupon, setFieldValue]);

  // HANDLERS
  const swipeCurrencyHandler = useCallback(() => {
    setFieldValue("type", values.type === "buy" ? "sell" : "buy");
    setFieldValue("currency_sent_id", values.currency_received_id === 1 ? 1 : 2);
    setFieldValue("currency_received_id", values.currency_sent_id === 1 ? 1 : 2);
    setFieldValue("amount_received", values.type === "buy" ? (values.amount_sent / sellRate).toFixed(2) : (values.amount_sent * buyRate).toFixed(2));
  }, [values, buyRate, sellRate, setFieldValue]);

  const currencyChangeHandler = ({ target: { name, rawValue } }) => {
    setFieldValue(name, +rawValue);
    const inputName = name === "amount_sent" ? "amount_received" : "amount_sent";
    let totalAmount;

    if (values.type === "buy") totalAmount = inputName === "amount_received" ? +rawValue * buyRate : +rawValue / buyRate;
    if (values.type === "sell") totalAmount = inputName === "amount_received" ? +rawValue / sellRate : +rawValue * sellRate;

    temporalAmountSent.current = name === "amount_sent" ? +rawValue : totalAmount;

    if (values.type === "buy") setFieldValue(inputName, totalAmount.toFixed(2));
    if (values.type === "sell") setFieldValue(inputName, totalAmount.toFixed(2));
  };

  const sendCouponHandler = (name) => {
    const bodyCoupon = name.trim();
    const regex = /^((?=.*\d)?)(?=.*[a-zA-Z]).{6,}$/;
    if (bodyCoupon && regex.test(bodyCoupon)) {
      dispatch(validateCouponInit(bodyCoupon.toUpperCase(), profile.type, setCouponName));
    } else return;
  };

  const deleteCouponHandler = () => {
    dispatch(deleteCoupon());
    setActualRates({ buy: rates.buy, sell: rates.sell });
    setFieldValue("couponName", "");
    setCouponName("");
    setFieldValue("amount_received", values.type === "buy" ? values.amount_sent * rates.buy : values.amount_sent / rates.sell);
  };

  const clearCalulator = () => {
    dispatch(deleteCoupon());
    dispatch(getRatesInit());
    setFieldValue("couponName", "");
    setCouponName("");
  };

  useEffect(() => {
    if (coupon && coupon.minimumAmount > 0) setIsCouponMin((type === "sell" && amount_received < coupon.minimumAmount) || (type === "buy" && amount_sent < coupon.minimumAmount));
  }, [coupon, amount_received, amount_sent, type]);

  const disabled = (actualRates.buy <= 0 && actualRates.sell <= 0) || ratesLoading || isProcessing;

  return (
    <>
      <Card className={classes.CalculatorContainer}>
        <h1 className={classes.CalculatorTitle}>
          Compra y gana <br />
          con Instakash
        </h1>
        {!ratesLoading && <Rates actualRates={actualRates} coupon={coupon} couponRates={couponRates} currency={values.currency_sent_id} />}
        <form onSubmit={formik.handleSubmit} className={sharedClass.ExchangeForm} id="calculator-form">
          <div className={classes.Timer}>
            <p>Se actualizará el tipo de cambio en:</p>
            <Timer onFinish={clearCalulator} time={300000} />
          </div>
          <div className="relative">
            <Input name="amount_sent" value={amount_sent} currency={values.currency_sent_id} label="Envías" disabled={disabled} onChange={currencyChangeHandler} />
            <Swipe onSwipeCurrency={swipeCurrencyHandler} type={values.type} disabled={disabled} />
            <Input
              name="amount_received"
              value={values.amount_received}
              currency={values.currency_received_id}
              label="Recibes"
              disabled={disabled}
              onChange={currencyChangeHandler}
            />
            <CouponInput
              coupon={coupon}
              couponName={couponName}
              setCouponName={setCouponName}
              minimum={isCouponMin}
              amountReceived={values.amount_received}
              isProcessing={isProcessing}
              disabled={disabled}
              isLoading={ratesLoading}
              onSendCoupon={sendCouponHandler}
              onDeleteCoupon={deleteCouponHandler}
            />
            {values.amount_received < 1 && <p className={`error-msg ${classes.MinAmount}`}>El monto mínimo a recibir es de $ 1.00</p>}
          </div>
        </form>
      </Card>
      <Button
        type="submit"
        form="calculator-form"
        disabled={values.amount_received < 1 || couponName.trim().length || disabled}
        className={`action-button mt-2 ld-over ${isProcessing ? "running" : ""}`}
      >
        <span className="ld ld-ring ld-spin" />
        Comenzar cambio
      </Button>
    </>
  );
};

export default Calculator;

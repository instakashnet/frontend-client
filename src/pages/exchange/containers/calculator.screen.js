import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Info, AccessAlarm } from "@material-ui/icons";
import { getRatesInit, validateCouponInit, createExchangeInit, deleteCoupon } from "../../../store/actions";

// COMPONENTS
import Rates from "../components/calculator-items/rates.component";
import Input from "../components/calculator-items/currency-input.component";
import CouponInput from "../components/calculator-items/coupon-input.component";
import Swipe from "../components/calculator-items/swipe.component";
import Timer from "../components/calculator-items/timer.component";
import { Button } from "../../../components/UI/button.component";
import Tooltip from "../../../components/UI/tooltip.component";

// CLASSES
import classes from "../assets/css/exchange-screens.module.scss";

const Calculator = ({ profile, setModal, user }) => {
  const dispatch = useDispatch(),
    [actualRates, setActualRates] = useState({ buy: 0, sell: 0 }),
    [couponRates, setCouponRates] = useState({ buy: 0, sell: 0 }),
    [isCouponMin, setIsCouponMin] = useState(false),
    [showInfo, setShowInfo] = useState(false),
    temporalAmountSent = useRef(null),
    { rates, isLoading, coupon, isProcessing } = useSelector((state) => state.Exchange);

  const formik = useFormik({
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
      return dispatch(createExchangeInit(values, temporalAmountSent ? temporalAmountSent.current : 0, profile));
    },
  });
  const { values, setFieldValue } = formik;
  const { type, amount_sent, amount_received } = values;

  useEffect(() => {
    if (coupon) dispatch(deleteCoupon());

    if (rates.buy > 0 && rates.sell > 0) {
      setActualRates({ buy: rates.buy, sell: rates.sell });
      let amountSent = 1000 * rates.sell;
      temporalAmountSent.current = amountSent;
      setFieldValue("amount_sent", amountSent.toFixed(2));
      setFieldValue("amount_received", 1000);
    }
    // eslint-disable-next-line
  }, [rates, dispatch, setFieldValue]);

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
  const sellRate = coupon ? couponRates.sell : actualRates.sell;
  const buyRate = coupon ? couponRates.buy : actualRates.buy;

  const swipeCurrencyHandler = () => {
    setFieldValue("type", values.type === "buy" ? "sell" : "buy");
    setFieldValue("currency_sent_id", values.currency_received_id === 1 ? 1 : 2);
    setFieldValue("currency_received_id", values.currency_sent_id === 1 ? 1 : 2);
    setFieldValue("amount_received", values.type === "buy" ? (values.amount_sent / sellRate).toFixed(2) : (values.amount_sent * buyRate).toFixed(2));
  };

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

  const sendCouponHandler = (couponName) => {
    const bodyCoupon = couponName.trim();
    const regex = /^((?=.*\d)?)(?=.*[a-zA-Z]).{6,}$/;
    if (bodyCoupon && regex.test(bodyCoupon)) {
      dispatch(validateCouponInit(bodyCoupon.toUpperCase(), profile.type));
    } else return;
  };

  const deleteCouponHandler = () => {
    dispatch(deleteCoupon());
    setActualRates({ buy: rates.buy, sell: rates.sell });
    setFieldValue("couponName", "");
    setFieldValue("amount_received", values.type === "buy" ? values.amount_sent * rates.buy : values.amount_sent / rates.sell);
  };

  const clearCalulator = () => {
    dispatch(deleteCoupon());
    dispatch(getRatesInit());
    setFieldValue("couponName", "");
  };

  useEffect(() => {
    if (coupon && coupon.minimumAmount > 0) setIsCouponMin((type === "sell" && amount_received < coupon.minimumAmount) || (type === "buy" && amount_sent < coupon.minimumAmount));
  }, [coupon, amount_received, amount_sent, type]);

  const disabled = (actualRates.buy <= 0 && actualRates.sell <= 0) || isLoading || isProcessing;

  return (
    <>
      <h1>¡Gana cambiando con Instakash!</h1>
      <h3>Mejores tasas, mayor ahorro.</h3>
      {!isLoading && <Rates actualRates={actualRates} coupon={coupon} couponRates={couponRates} />}
      <form onSubmit={formik.handleSubmit} className={classes.ExchangeForm}>
        {!isLoading && (
          <div className={classes.Timer}>
            <p>Se actualizará el tipo de cambio en:</p>
            <div className="flex items-center text-base">
              <AccessAlarm className="mr-2" /> <Timer onFinish={clearCalulator} />
            </div>
          </div>
        )}
        <div className="relative">
          <Input name="amount_sent" value={amount_sent} currency={values.currency_sent_id} label="Envias" disabled={disabled} onChange={currencyChangeHandler} />
          <Swipe onSwipeCurrency={swipeCurrencyHandler} type={values.type} disabled={disabled} />
          <Input
            name="amount_received"
            value={values.amount_received}
            currency={values.currency_received_id}
            label="Recibes"
            disabled={disabled}
            onChange={currencyChangeHandler}
          />
          <p className="flex items-center justify-center w-full">
            ¿Montos mayores a $ 5,000.00?
            <Tooltip
              title="Escribenos a nuestro canal de whatsapp para recibir una tasa preferencial."
              placement="top-start"
              disableHoverListener
              onMouseEnter={() => setShowInfo(true)}
              onClick={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              open={showInfo}
            >
              <Info className="ml-3" />
            </Tooltip>
          </p>
          <CouponInput
            coupon={coupon}
            minimum={isCouponMin}
            amountReceived={values.amount_received}
            isProcessing={isProcessing}
            disabled={disabled}
            isLoading={isLoading}
            onSendCoupon={sendCouponHandler}
            onDeleteCoupon={deleteCouponHandler}
          />
          {values.amount_received < 1 && <p className="error-msg">El monto mínimo a recibir es de $ 1.00</p>}
          <Button type="submit" disabled={values.amount_received < 1 || disabled} className={`action-button mt-2 ld-over ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Comenzar cambio
          </Button>
        </div>
      </form>
    </>
  );
};

export default Calculator;

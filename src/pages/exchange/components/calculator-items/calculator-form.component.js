import cls from "classnames";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
// REDUX ACTIONS
import { deleteCoupon, validateCouponInit } from "../../../../store/actions";
// CLASSES
import classes from "../../containers/modules/calculator.screen.module.scss";
import sharedClass from "../../containers/modules/sharedClasses.module.scss";
// COMPONENTS
import CouponInput from "./coupon-input.component";
import Input from "./currency-input.component";
import Swipe from "./swipe.component";

export const CalculatorForm = ({
  isCouponMin,
  temporalAmountSent,
  formik,
  coupon,
  couponRates,
  actualRates,
  rates,
  setActualRates,
  profile,
  isProcessing,
  ratesLoading,
  disabled,
}) => {
  const { setFieldValue, values } = formik,
    [couponName, setCouponName] = useState(""),
    dispatch = useDispatch(),
    [couponInputFocused, setCouponInputFocused] = useState(false),
    sellRate = coupon ? couponRates.sell : actualRates.sell,
    buyRate = coupon ? couponRates.buy : actualRates.buy;

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

  const couponFocusedHandler = ({ type }) => setCouponInputFocused(type === "focus");

  return (
    <form onSubmit={formik.handleSubmit} className={cls(sharedClass.ExchangeForm, "relative")} id="calculator-form">
      <Input name="amount_sent" value={values.amount_sent} currency={values.currency_sent_id} label="Envías" disabled={disabled} onChange={currencyChangeHandler} />
      <Swipe onSwipeCurrency={swipeCurrencyHandler} type={values.type} disabled={disabled} />
      <Input name="amount_received" value={values.amount_received} currency={values.currency_received_id} label="Recibes" disabled={disabled} onChange={currencyChangeHandler} />
      <CouponInput
        coupon={coupon}
        couponName={couponName}
        setCouponName={setCouponName}
        couponInputFocused={couponInputFocused}
        couponFocusedHandler={couponFocusedHandler}
        minimum={isCouponMin}
        isProcessing={isProcessing}
        disabled={disabled}
        isLoading={ratesLoading}
        onSendCoupon={sendCouponHandler}
        onDeleteCoupon={deleteCouponHandler}
      />
      {(values.type === "buy" && values.amount_sent < 40) ? (
        <p className={`error-msg ${classes.MinAmount}`}>El monto mínimo a enviar es de $ 40.00</p>
      ) : (values.type === "sell" && values.amount_received < 40) ? (
        <p className={`error-msg ${classes.MinAmount}`}>El monto mínimo a recibir es de $ 40.00</p>
      ) : null}
    </form>
  );
};

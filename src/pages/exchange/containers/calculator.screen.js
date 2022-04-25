import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/UI/button.component";
import Card from "../../../components/UI/card.component";
import { Modal } from "../../../components/UI/modals/modal.component";
import { closeModal, createExchangeInit, deleteCoupon, getLastOrderInit, getRatesInit, openModal, validateCouponInit } from "../../../store/actions";
import { CalculatorForm } from "../components/calculator-items/calculator-form.component";
import Rates from "../components/calculator-items/rates.component";
import Timer from "../components/calculator-items/timer.component";
import UpdateRates from "../components/rates-modal.component";
import classes from "./modules/calculator.screen.module.scss";

const Calculator = ({ profile, setModal, user }) => {
  const dispatch = useDispatch(),
    [actualRates, setActualRates] = useState({ buy: 0, sell: 0 }),
    [couponRates, setCouponRates] = useState({ buy: 0, sell: 0 }),
    [isCouponMin, setIsCouponMin] = useState(false),
    temporalAmountSent = useRef(null),
    { rates, ratesLoading, coupon, isProcessing } = useSelector((state) => state.Exchange),
    ModalComponent = useSelector((state) => state.Modal.Component),
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
    disabled = (actualRates.buy <= 0 && actualRates.sell <= 0) || ratesLoading || isProcessing;

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

  useEffect(() => {
    if (coupon && coupon.minimumAmount > 0) setIsCouponMin((type === "sell" && amount_received < coupon.minimumAmount) || (type === "buy" && amount_sent < coupon.minimumAmount));
  }, [coupon, amount_received, amount_sent, type]);

  // HANDLERS
  const clearCalculator = () => {
    dispatch(deleteCoupon());
    dispatch(getRatesInit());
    setFieldValue("couponName", "");
    dispatch(closeModal());
    // setCouponName("");
  };

  const timeFinishHandler = () => {
    let modalContent = () => <UpdateRates onClose={clearCalculator} strictClose />;
    dispatch(openModal(modalContent));
  };

  return (
    <>
      <Card className={classes.CalculatorContainer}>
        <h1 className={classes.CalculatorTitle}>Comienza el cambio</h1>
        {!ratesLoading && <Rates actualRates={actualRates} coupon={coupon} couponRates={couponRates} currency={values.currency_sent_id} />}
        <div className={classes.Timer}>
          <p className={classes.TimerP}>Se actualizará el tipo de cambio en:</p>
          <Timer onFinish={timeFinishHandler} time={300000} />
        </div>
        <CalculatorForm
          isCouponMin={isCouponMin}
          temporalAmountSent={temporalAmountSent}
          formik={formik}
          coupon={coupon}
          couponRates={couponRates}
          actualRates={actualRates}
          rates={rates}
          setActualRates={setActualRates}
          profile={profile}
          isProcessing={isProcessing}
          ratesLoading={ratesLoading}
          disabled={disabled}
        />
      </Card>
      <Button type="submit" form="calculator-form" disabled={values.amount_received < 1 || disabled} className={`action-button mt-2 ld-over ${isProcessing ? "running" : ""}`}>
        <span className="ld ld-ring ld-spin" />
        Comenzar cambio
      </Button>

      {ModalComponent && (
        <Modal {...ModalComponent().props}>
          <ModalComponent />
        </Modal>
      )}
    </>
  );
};

export default Calculator;

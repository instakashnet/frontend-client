import React, { useState } from "react";
import { X } from "react-feather";
import { formatAmount } from "../../../shared/functions";

import InlineInput from "../../../core/components/UI/form-items/inline-input.component";
import CouponImg from "../../assets/images/icons/coupon.svg";
import classes from "../../assets/css/exchange-components.module.scss";

const Coupon = ({ coupon, minimum, amountReceived, onSendCoupon, onDeleteCoupon, isProcessing, isLoading }) => {
  const [couponName, setCouponName] = useState("");

  const onCouponChange = (e) => setCouponName(e.target.value);

  return !coupon ? (
    <InlineInput
      name="couponName"
      value={couponName}
      onClick={() => onSendCoupon(couponName)}
      disabled={amountReceived < 1 || isProcessing || isLoading}
      onChange={onCouponChange}
      placeholder="Cupón de descuento"
      buttonLabel="Agregar"
      className="mt-4"
    />
  ) : (
    <>
      <p className="mt-5">¡Genial!, haz activado el cupón:</p>
      <div className={classes.Coupon}>
        <p className="flex items-center">
          <img src={CouponImg} alt="cupón" className="mr-2" /> {coupon.name}
        </p>
        <button type="button" onClick={onDeleteCoupon}>
          <X />
        </button>
      </div>
      {coupon.name === "NUEVOREFERIDO1" && <p className="my-2">Aprovecha este cupón en tu primera operación.</p>}
      {minimum && <p className="text-center error-msg mt-1 md:mt-3">Solo aplicable para montos mayores a $ {formatAmount(coupon.minimumAmount)}</p>}
    </>
  );
};

export default Coupon;

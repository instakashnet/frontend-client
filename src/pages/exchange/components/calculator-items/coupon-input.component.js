import { Close } from "@material-ui/icons";
import React from "react";

// COMPONENTS
import { InlineInput } from "../../../../components/UI/form-items/inline-input.component";
// HELPERS
import { formatAmount } from "../../../../shared/functions";
// ASSETS & CLASSES
import CouponImg from "../../assets/images/icons/coupon.svg";
import classes from "../modules/calculator-items/coupon-input.module.scss";

const Coupon = ({ coupon, couponName, setCouponName, minimum, onSendCoupon, onDeleteCoupon, isProcessing, isLoading }) => {
  const onCouponChange = (e) => setCouponName(e.target.value);

  return !coupon ? (
    <InlineInput
      name="couponName"
      value={couponName}
      onClick={() => onSendCoupon(couponName)}
      disabled={isProcessing || isLoading}
      onChange={onCouponChange}
      label="Ingrese su cupón aquí"
      buttonLabel="Agregar"
      className="mt-4"
    />
  ) : (
    <>
      <p className="mt-5">¡Genial! Has activado el cupón:</p>
      <div className={classes.Coupon}>
        <p className="flex items-center">
          <img src={CouponImg} alt="cupón" className="mr-2" /> {coupon.name}
        </p>
        {coupon.name !== "NUEVOREFERIDO1" && (
          <button type="button" onClick={onDeleteCoupon}>
            <Close />
          </button>
        )}
      </div>
      {coupon.name === "NUEVOREFERIDO1" && <p className="my-2">Aprovecha este cupón en tu primera operación.</p>}
      {minimum && <p className="text-center error-msg mt-1 md:mt-3">Solo aplicable para montos mayores a $ {formatAmount(coupon.minimumAmount)}</p>}
    </>
  );
};

export default React.memo(Coupon);

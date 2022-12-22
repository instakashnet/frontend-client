import { memo } from "react";
// COMPONENTS
import { InlineInput } from "../../../../components/UI/form-items/inline-input.component";
// HELPERS
import { formatAmount } from "../../../../shared/functions";
// ASSETS & CLASSES
import CouponImg from "../../assets/images/icons/coupon.svg";
import classes from "../modules/calculator-items/coupon-input.module.scss";


const Coupon = ({ coupon, couponName, setCouponName, couponInputFocused, couponFocusedHandler, minimum, onSendCoupon, onDeleteCoupon, isProcessing, isLoading }) => {
  const onCouponChange = (e) => setCouponName(e.target.value);

  return !coupon ? (
    <>
      <InlineInput
        name="couponName"
        value={couponName}
        onClick={() => onSendCoupon(couponName)}
        disabled={isProcessing || isLoading || !couponName || couponName.length < 6}
        onChange={onCouponChange}
        label="Agrega tu cupón de descuento"
        buttonLabel="Agregar"
        className={`${couponInputFocused ? classes.InputFocused : ""} ${couponInputFocused && !couponName ? classes.InputError : ""}`}
        icon={CouponImg}
        onFocus={couponFocusedHandler}
        onBlur={couponFocusedHandler}
      />
      {!couponName && couponInputFocused
        ? <p className={`error-msg ${classes.InlineInputDesc}`}>Aún no has agregado tu cupón</p>
        : <p className={classes.InlineInputDesc}>Al agregar tu cupón de descuento obtendrás una mejor tasa</p>}
    </>
  ) : (
    <>
      <div className={classes.Coupon}>
        <p className="flex items-center">
          {coupon.name}
        </p>
        {coupon.name !== "NUEVOREFERIDO1" && (
          <button type="button" onClick={onDeleteCoupon}>
            Quitar
          </button>
        )}
      </div>
      <p className={classes.CouponDesc}>Si no deseas usar este cupón presiona "Quitar".</p>
      {coupon.name === "NUEVOREFERIDO1" && <p className={`my-2 ${classes.WarningTxt}`}>Aprovecha este cupón en tu primera operación.</p>}
      {minimum && <p className={`text-center error-msg mt-1 md:mt-3 ${classes.WarningTxt}`}>Solo aplicable para montos mayores a $ {formatAmount(coupon.minimumAmount)}</p>}
    </>
  );
};

export default memo(Coupon);

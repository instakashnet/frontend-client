import React from "react";
// HELPERS
import { convertRate } from "../../../../shared/functions";
// CLASSES
import classes from "../modules/calculator-items/rates.module.scss";


const Rates = ({ couponRates, coupon, actualRates, currency }) => {
  const conditionToBuy = currency === 2,
    conditionToSell = currency === 1,
    conditionCouponRates = coupon && couponRates.buy !== actualRates.buy;

  return (
    <div className={classes.Rates}>
      <div className="flex items-center justify-center mt-3">
        <p className={`${classes.BeforeRate} ${!conditionCouponRates ? classes.Hidden : ""} ${conditionToBuy ? classes.Faint : ""}`}>
          Antes: {convertRate(actualRates.buy)}
        </p>
        <p className={`${classes.BeforeRate} ${!conditionCouponRates ? classes.Hidden : ""} ${conditionToSell ? classes.Faint : ""}`}>
          Antes: {convertRate(actualRates.sell)}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className={`${classes.BuyCard} ${conditionToBuy ? classes.Faint : ""}`}>
          <h4>Compramos: S/. {convertRate(conditionCouponRates ? couponRates.buy : actualRates.buy)}</h4>
        </div>
        <span className={classes.RatesDivider} />
        <div className={`${classes.SellCard} ${conditionToSell ? classes.Faint : ""}`}>
          <h4>Vendemos: S/. {convertRate(conditionCouponRates ? couponRates.sell : actualRates.sell)}</h4>
        </div>
      </div>
    </div>
  );
};

export default Rates;

import React from "react";
// HELPERS
import { convertRate } from "../../../../shared/functions";
// CLASSES
import classes from "../modules/calculator-items/rates.module.scss";


const Rates = ({ couponRates, coupon, actualRates, currency }) => {
  const conditionToBuy = currency === 2 ? classes.Faint : "",
    conditionToSell = currency === 1 ? classes.Faint : "";

  return (
    <div className={classes.Rates}>
      {coupon && couponRates.buy !== actualRates.buy ? (
        <>
          <div className="flex items-center justify-center mt-3">
            <p className={`mr-4 ${conditionToBuy}`}>
              Antes: <b>{convertRate(actualRates.buy)}</b>
            </p>
            <p className={`ml-6 ${conditionToSell}`}>
              Antes: <b>{convertRate(actualRates.sell)}</b>
            </p>
          </div>
          <div className="flex items-center justify-center mt-2">
            <div className={`${classes.BuyCard} ${conditionToBuy}`}>
              <h4>Compramos: <br />
                <span className={classes.Price}>S/. {convertRate(couponRates.buy)}</span>
              </h4>
            </div>
            <div className={`${classes.SellCard} ${conditionToSell}`}>
              <h4>Vendemos: <br />
                <span className={classes.Price}>S/. {convertRate(couponRates.sell)}</span>
              </h4>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center mt-2">
          <div className={`${classes.BuyCard} ${conditionToBuy}`}>
            <h4>Compramos: S/. {convertRate(actualRates.buy)}</h4>
          </div>
          <span className={classes.RatesDivider} />
          <div className={`${classes.SellCard} ${conditionToSell}`}>
            <h4>Vendemos: S/. {convertRate(actualRates.sell)}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rates;

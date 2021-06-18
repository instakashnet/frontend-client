import React from "react";

import classes from "../../assets/css/exchange-components.module.scss";

const Rates = ({ couponRates, coupon, actualRates }) => {
  return (
    <div className={classes.Rates}>
      {coupon && couponRates.buy !== actualRates.buy ? (
        <>
          <div className="flex items-center justify-center mt-3">
            <p className="mr-4">
              Antes: <b>{actualRates.buy}</b>
            </p>
            <p className="ml-6">
              Antes: <b>{actualRates.sell}</b>
            </p>
          </div>
          <div className="flex items-center justify-center mt-2">
            <div className={classes.BuyCard}>
              <h4>Compramos a</h4>
              <span className={classes.Price}>S/. {couponRates.buy.toFixed(3)}</span>
            </div>
            <div className={classes.SellCard}>
              <h4>Vendemos a</h4>
              <span className={classes.Price}>S/. {couponRates.sell.toFixed(3)}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center mt-2">
          <div className={classes.BuyCard}>
            <h4>Compramos a</h4>
            <span className={classes.Price}>S/. {actualRates.buy.toFixed(3)}</span>
          </div>
          <div className={classes.SellCard}>
            <h4>Vendemos a</h4>
            <span className={classes.Price}>S/. {actualRates.sell.toFixed(3)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rates;

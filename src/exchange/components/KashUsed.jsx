import React from "react";
import { formatAmount } from "../../shared/functions";

import KashInput from "./calculator/KashInput";
import Radio from "../../core/components/UI/form/Radio";
import Card from "../../core/components/UI/Card";

import classes from "../containers/Exchange.module.scss";

const KashUsed = ({ formik, balance, totalAmount, onKashUsed, order }) => {
  const { currencySentSymbol, amountSent } = order;

  return (
    <div className={classes.KashInfoWrapper}>
      <p>
        tienes <b>{balance} KASH</b> disponibles, ¿Deseas canjearlos?
      </p>
      <div className="flex items-center md:ml-10">
        <Radio label="SI" value="yes" name="kashApplied" checked={formik.values.kashApplied === "yes"} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Radio label="NO" value="no" name="kashApplied" checked={formik.values.kashApplied === "no"} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>
      {formik.values.kashApplied === "yes" && (
        <>
          <KashInput
            name="kashUsed"
            placeholder="Ingresa los KASH a cambiar"
            error={formik.errors.kashUsed}
            touched={formik.touched.kashUsed}
            value={Number(formik.values.kashUsed).toString()}
            onChange={onKashUsed}
            onBlur={onKashUsed}
          />
          <Card className={classes.KashTotalCard}>
            <p>
              <b>Total a transferir</b>
            </p>
            <span>
              {`${currencySentSymbol} ${formatAmount(amountSent)} + ${formik.values.kashUsed || 0} KASH`} = {`${currencySentSymbol} ${formatAmount(totalAmount)}`}
            </span>
          </Card>
        </>
      )}
    </div>
  );
};

export default React.memo(KashUsed);

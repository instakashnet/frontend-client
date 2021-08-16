import React from "react";
import { FormControl, FormLabel, RadioGroup } from "@material-ui/core";
import { formatAmount } from "../../shared/functions";

import KashInput from "./calculator-items/kash-input.component";
import { RadioComponent } from "../../components/UI/form-items/radio.component";
import Card from "../../components/UI/card.component";

import classes from "../assets/css/exchange-components.module.scss";

const KashUsed = ({ formik, balance, totalAmount, onKashUsed, order }) => {
  const { currencySentSymbol, amountSent } = order;

  return (
    <div className={classes.KashInfoWrapper}>
      <div className="flex items-center md:ml-10">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            tienes <b>{balance} KASH</b> disponibles, ¿Deseas canjearlos?
          </FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <RadioComponent label="SI" value="yes" name="kashApplied" checked={formik.values.kashApplied === "yes"} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <RadioComponent label="NO" value="no" name="kashApplied" checked={formik.values.kashApplied === "no"} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </RadioGroup>
        </FormControl>
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

import React from "react";
import { FormControl, FormLabel, RadioGroup } from "@material-ui/core";

// HELPERS
import { formatAmount } from "../../../shared/functions";

// COMPONENTS
import KashInput from "./calculator-items/kash-input.component";
import { RadioComponent } from "../../../components/UI/form-items/radio.component";
import Card from "../../../components/UI/card.component";

// CLASSES
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
          <RadioGroup row aria-label="position" name="kashApplied" defaultValue="top" value={formik.values.kashApplied} onChange={formik.handleChange}>
            <RadioComponent label="SI" value="yes" checked={formik.values.kashApplied === "yes"} />
            <RadioComponent label="NO" value="no" checked={formik.values.kashApplied === "no"} />
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

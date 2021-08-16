import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { withdrawKashInit } from "../../../store/actions";
import { kashWithdrawalValidation } from "../../helpers/validations";

import { Input } from "../../../components/UI/form-items/input.component";
import { SelectComponent } from "../../../components/UI/form-items/select.component";
import { Button } from "../../../components/UI/button.component";

const KashWithdraw = ({ kashAccount, accounts }) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Accounts.isProcessing);

  const formik = useFormik({
    initialValues: { kashQty: "", accountId: "" },
    validationSchema: kashWithdrawalValidation(kashAccount.balance),
    onSubmit: (values) => dispatch(withdrawKashInit(values)),
  });

  const dollarAccounts = accounts.filter((account) => account.currency.id === 1);
  const accountOptions = dollarAccounts.map((account) => ({
    account: account.account_number,
    currency: account.currency.Symbol,
    value: account.id,
    icon: `${process.env.PUBLIC_URL}/images/banks/${account.bank.name.toLowerCase()}-logo.svg`,
  }));

  return (
    <>
      <h2>Retira tus kash</h2>
      <form onSubmit={formik.handleSubmit} className="min-w-sm mt-3">
        <Input
          name="kashQty"
          type="number"
          value={formik.values.kashQty}
          label="¿Que cantidad deseas retirar?"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.kashQty}
          touched={formik.touched.kashQty}
        />
        <SelectComponent
          name="accountId"
          value={formik.values.accountId}
          options={accountOptions}
          onChange={formik.handleChange}
          label="¿En que cuenta recibiras tus kash?"
          error={formik.errors.accountId}
          touched={formik.touched.accountId}
          helperText="* Solo se permiten cuenta en dólares."
        />
        <div className="flex justify-center">
          <Button type="submit" className={`action-button  ld-over ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
            <span className="ld ld-ring ld-spin" />
            Solicitar retiro
          </Button>
        </div>
      </form>
    </>
  );
};

export default KashWithdraw;

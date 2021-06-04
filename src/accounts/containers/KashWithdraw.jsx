import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { withdrawKashInit } from "../../store/actions";
import { kashWithdrawalValidation } from "../helpers/validations";

import Input from "../../core/components/UI/form/Input";
import AccountSelect from "../../core/components/UI/form/AccountSelect";
import Button from "../../core/components/UI/Button";

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
    account: `*****${account.account_number.substring(account.account_number.length - 4, account.account_number.length)}`,
    currency: account.currency.Symbol,
    alias: account.alias,
    value: account.id,
    icon: `${process.env.PUBLIC_URL}/images/banks/${account.bank.name.toLowerCase()}-logo.svg`,
  }));

  const onAccountChange = (option) => formik.setFieldValue("accountId", option.value);

  return (
    <>
      <h2>Retira tus kash</h2>
      <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-center">
        <Input
          name="kashQty"
          type="number"
          value={formik.values.kashQty}
          label="¿Que cantidad deseas retirar?"
          placeholder="Ingresa la cantidad"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.kashQty}
          touched={formik.touched.kashQty}
        />
        <AccountSelect
          name="accountId"
          value={dollarAccounts.find((option) => option.value === formik.values.accountId)}
          options={accountOptions}
          onChange={onAccountChange}
          label="¿En que cuenta recibiras tus kash?"
          placeholder="Selecciona una de tus cuentas"
          error={formik.errors.accountId}
          touched={formik.touched.accountId}
        />
        <p className="text-sm">* Solo se permiten cuenta en dólares.</p>
        <Button type="submit" className={`action-button ld-ext-right ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
          <span className="ld ld-ring ld-spin" />
          Solicitar retiro
        </Button>
      </form>
    </>
  );
};

export default KashWithdraw;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Plus } from "react-feather";
import { completeExchangeInit, cancelExchangeInit } from "../../store/actions";
import { completeExchangeValidation } from "../helpers/validations";
import { validateInterplaza } from "../../shared/functions";

import CustomSelect from "../../core/components/UI/form-items/custom-select.component";
import AccountSelect from "../../core/components/UI/form-items/account-select.component";
import Select from "../../core/components/UI/form-items/select.component";
import KashUsed from "../components/kash-used.component";
import Button from "../../core/components/UI/button.component";
import Input from "../../core/components/UI/form-items/input.component";

import classes from "../assets/css/exchange-screens.module.scss";

const Accounts = ({ order, history, setModal }) => {
  if (!order) history.goBack();

  const [totalAmountSent, setTotalAmountSent] = useState(order.amountSent);
  const [fundsInput, setFundsInput] = useState(false);

  let funds_origin;
  if (order.currencyReceivedId === 1 && order.amountSent >= 15000) funds_origin = true;
  if (order.currencyReceivedId === 2 && order.amountSent >= 5000) funds_origin = true;

  const dispatch = useDispatch();
  const { banks } = useSelector((state) => state.Data);
  const { isProcessing, coupon } = useSelector((state) => state.Exchange);
  const { accounts, kashAccount } = useSelector((state) => state.Accounts);

  const formik = useFormik({
    initialValues: { account_to_id: "", bank_id: "", funds_origin: "", funds_text: "", couponName: coupon ? coupon.name : null, kashApplied: "no", kashUsed: "" },
    enableReinitialize: true,
    validationSchema: completeExchangeValidation(funds_origin, kashAccount.balance, totalAmountSent),
    onSubmit: (values) => dispatch(completeExchangeInit(values, order.id)),
  });

  const filteredAccounts = accounts.filter((account) => account.currency.id === order.currencyReceivedId);

  const fundsOptions = [
    { label: "Ahorros", value: "ahorros" },
    { label: "Alquiler de bienes inmuebles", value: "alquiler de bienes inmuebles" },
    { label: "Alquiler de bienes muebles", value: "alquiler de bienes muebles" },
    { label: "Venta de bienes inmuebles", value: "venta de bienes inmuebles" },
    { label: "Venta de bienes muebles", value: "venta de bienes muebles" },
    { label: "Donación o sorteo", value: "donación o sorteo" },
    { label: "Trabajo independiente", value: "trabajo independiente" },
    { label: "Regalía", value: "regalía" },
    { label: "Préstamos", value: "préstamos" },
    { label: "Otros", value: "otros" },
  ];
  const onFundsOriginChange = (e) => {
    setFundsInput(e.target.value === "otros");
    formik.setFieldValue("funds_origin", e.target.value);
  };

  const bankOptions = banks.map((bank) => ({ label: bank.name, value: bank.id, icon: `${process.env.PUBLIC_URL}/images/banks/${bank.name.toLowerCase()}-logo.svg` }));
  const accountOptions = filteredAccounts.map((account) => ({
    account: `*****${account.account_number.substring(account.account_number.length - 4, account.account_number.length)}`,
    currency: account.currency.Symbol,
    bankName: account.bank.name,
    alias: account.alias,
    value: account.id,
    icon: `${process.env.PUBLIC_URL}/images/banks/${account.bank.name.toLowerCase()}-logo.svg`,
  }));
  const onBankChange = (option) => formik.setFieldValue("bank_id", option.value);
  const onAccountChange = (option) => {
    if (!option.value) return;

    const chosenAccount = filteredAccounts.find((account) => account.id === option.value);
    formik.setFieldValue("account_to_id", option.value);
    formik.setFieldValue("bank_to_name", chosenAccount.bank.name);
  };

  let interplaza;

  if (formik.values.account_to_id) {
    const chosenAccount = filteredAccounts.find((account) => account.id === formik.values.account_to_id);
    if (chosenAccount && chosenAccount.bank.id === 2) interplaza = validateInterplaza(chosenAccount.account_number);
  } else interplaza = false;

  const kashUsedHandler = (e) => {
    const totalAmount = order.currencySentId === 2 ? order.amountSent - +e.target.value * order.rate : order.amountSent - +e.target.value;
    if (totalAmount < 0 || +e.target.value > kashAccount.balance) return;
    formik.setFieldValue("kashUsed", +e.target.value);

    setTotalAmountSent(totalAmount);
  };

  return (
    <>
      <h1 className="mt-12 md:mt-0">Completa los datos</h1>
      <h3>Selecciona tu banco de envío y la cuenta donde recibes.</h3>
      <form onSubmit={formik.handleSubmit} className={classes.ExchangeForm}>
        {kashAccount.balance > 0 && <KashUsed formik={formik} onKashUsed={kashUsedHandler} totalAmount={totalAmountSent} balance={kashAccount.balance} order={order} />}
        {formik.values.kashApplied && totalAmountSent <= 0 ? null : (
          <CustomSelect
            label="¿Desde que banco nos envia su dinero?"
            placeholder="Selecciona un banco"
            options={bankOptions}
            value={bankOptions.find((option) => option.value === formik.values.bank_id)}
            onChange={onBankChange}
            error={formik.errors.bank_id}
            touched={formik.touched.bank_id}
          />
        )}
        <AccountSelect
          label="¿En que cuenta recibirás tu dinero?"
          placeholder="Selecciona una de tus cuentas"
          options={accountOptions}
          value={filteredAccounts.find((option) => option.value === formik.values.account_to_id)}
          onChange={onAccountChange}
          error={formik.errors.account_to_id}
          touched={formik.touched.account_to_id}
        />
        {filteredAccounts.length < 10 && (
          <button className={classes.AddAccount} type="button" onClick={() => setModal("account")}>
            Agregar cuenta <Plus className="ml-2" />
          </button>
        )}
        {interplaza && (
          <p className="error-msg">
            Las cuentas interplaza de Interbank acarrean comisión. Conozca más en nuestros{" "}
            <a href="https://instakash.net/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline">
              términos y condiciones.
            </a>
          </p>
        )}
        {funds_origin && (
          <Select
            name="funds_origin"
            label="Origen de los fondos"
            placeholder="Selecciona una opción"
            options={fundsOptions}
            value={formik.values.funds_origin}
            error={formik.errors.funds_origin}
            touched={formik.touched.funds_origin}
            onChange={onFundsOriginChange}
          />
        )}
        {fundsInput && (
          <Input
            type="text"
            name="funds_text"
            placeholder="Escribe el origen de tus fondos"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.funds_text}
            error={formik.errors.funds_text}
            touched={formik.touched.funds_text}
          />
        )}
        <div className="flex flex-col items-center justify-center">
          <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button mt-4 ld-ext-right ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Continuar
          </Button>
          <Button type="button" className="secondary-button mt-6" onClick={() => dispatch(cancelExchangeInit(order.id, "draft"))}>
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
};

export default React.memo(Accounts);

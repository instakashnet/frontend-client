import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Add } from "@material-ui/icons";
import { completeExchangeValidation } from "../helpers/validations";
import { validateInterplaza } from "../../shared/functions";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { completeExchangeInit, cancelExchangeInit, getAccountsInit, getKashAccountInit, getBanksInit, getCurenciesInit } from "../../store/actions";

// COMPONENTS
import { MuiAlert } from "../../components/UI/mui-alert.component";
import { SelectComponent } from "../../components/UI/form-items/select.component";
import KashUsed from "../components/kash-used.component";
import { Button } from "../../components/UI/button.component";
import { Input } from "../../components/UI/form-items/input.component";
import Spinner from "../../components/UI/spinner.component";

import classes from "../assets/css/exchange-screens.module.scss";

const Accounts = ({ setModal, order }) => {
  const dispatch = useDispatch(),
    { accounts, isLoading, kashAccount } = useSelector((state) => state.Accounts),
    { isProcessing, coupon } = useSelector((state) => state.Exchange),
    { banks } = useSelector((state) => state.Data),
    [totalAmountSent, setTotalAmountSent] = useState(order.amountSent),
    [fundsInput, setFundsInput] = useState(false),
    [interplaza, setInterplaza] = useState(false),
    [bankCCI, setBankCCI] = useState(false),
    [accountCCI, setAccountCCI] = useState(false),
    [filteredAccounts, setFilteredAccounts] = useState([]),
    history = useHistory(),
    [funds_origin] = useState((order.currencyReceivedId === 1 && order.amountSent >= 15000) || (order.currencyReceivedId === 2 && order.amountSent >= 5000));

  if (!order) history.push("/currency-exchange");

  // FORMIK
  const formik = useFormik({
      initialValues: {
        account_to_id: "",
        accountInterbank: false,
        bank_id: "",
        bankInterbank: false,
        funds_origin: "",
        funds_text: "",
        couponName: coupon ? coupon.name : null,
        kashApplied: "no",
        kashUsed: "",
      },
      enableReinitialize: true,
      validationSchema: completeExchangeValidation(funds_origin, kashAccount.balance, totalAmountSent),
      onSubmit: (values) => dispatch(completeExchangeInit(values, order.id)),
    }),
    { account_to_id } = formik.values;

  // OPTIONS
  const fundsOptions = [
    { label: "Ahorros", value: "ahorros" },
    {
      label: "Alquiler de bienes inmuebles",
      value: "alquiler de bienes inmuebles",
    },
    {
      label: "Alquiler de bienes muebles",
      value: "alquiler de bienes muebles",
    },
    { label: "Venta de bienes inmuebles", value: "venta de bienes inmuebles" },
    { label: "Venta de bienes muebles", value: "venta de bienes muebles" },
    { label: "Donación o sorteo", value: "donación o sorteo" },
    { label: "Trabajo independiente", value: "trabajo independiente" },
    { label: "Regalía", value: "regalía" },
    { label: "Préstamos", value: "préstamos" },
    { label: "Otros", value: "otros" },
  ];
  const bankOptions = banks.map((bank) => ({
    label: bank.name.toUpperCase(),
    value: bank.id,
    icon: `${process.env.PUBLIC_URL}/images/banks/${bank.name.toLowerCase()}-logo.svg`,
  }));
  const accountOptions = filteredAccounts.map((account) => {
    return {
      account: account.account_number || account.cci,
      currency: account.currency.Symbol,
      alias: account.alias,
      value: account.id,
      isThird: account.thirdParty,
      icon: `${process.env.PUBLIC_URL}/images/banks/${account.bank.name.toLowerCase()}-logo.svg`,
    };
  });

  // EFFECTS
  useEffect(() => {
    dispatch(getBanksInit());
    dispatch(getKashAccountInit());
    dispatch(getAccountsInit("orders"));
    dispatch(getCurenciesInit());
  }, [dispatch]);

  useEffect(() => {
    const chosenAccount = filteredAccounts.find((account) => account.id === account_to_id);
    if (chosenAccount && chosenAccount.bank.id === 2) setInterplaza(validateInterplaza(chosenAccount.account_number));
  }, [account_to_id, filteredAccounts]);

  useEffect(() => {
    if (accounts.length) setFilteredAccounts(accounts.filter((account) => account.currency.id === order.currencyReceivedId));
  }, [accounts, order.currencyReceivedId]);

  // HANDLERS
  const onFundsOriginChange = (e) => {
    setFundsInput(e.target.value === "otros");
    formik.setFieldValue("funds_origin", e.target.value);
  };

  const onBankChangeHandler = (e) => {
    formik.setFieldValue("bank_id", e.target.value);

    if (e.target.value) {
      const bank = banks.find((b) => b.id === e.target.value);
      setBankCCI(!bank.active);
    }
  };

  const onAccountChange = (e) => {
    formik.handleChange(e);
    if (!e.target.value) return;

    const chosenAccount = filteredAccounts.find((account) => account.id === e.target.value);
    setAccountCCI(!!chosenAccount.cci);
  };

  const kashUsedHandler = (e) => {
    const totalAmount = order.currencySentId === 2 ? order.amountSent - +e.target.value * order.rate : order.amountSent - +e.target.value;
    if (totalAmount < 0 || +e.target.value > kashAccount.balance) return;
    formik.setFieldValue("kashUsed", +e.target.value);

    setTotalAmountSent(totalAmount);
  };

  return (
    <>
      <h1>Completa los datos</h1>
      <h3>Selecciona tu banco de envío y la cuenta donde recibes.</h3>
      {isLoading ? (
        <Spinner screen />
      ) : (
        <form onSubmit={formik.handleSubmit} className={classes.ExchangeForm}>
          {kashAccount.balance > 0 && <KashUsed formik={formik} onKashUsed={kashUsedHandler} totalAmount={totalAmountSent} balance={kashAccount.balance} order={order} />}
          {formik.values.kashApplied && totalAmountSent <= 0 ? null : (
            <SelectComponent
              name="bank_id"
              label="¿Desde que banco nos envia su dinero?"
              options={bankOptions}
              onChange={onBankChangeHandler}
              onBlur={formik.handleBlur}
              value={formik.values.bank_id}
              error={formik.errors.bank_id}
              touched={formik.touched.bank_id}
            />
          )}

          <SelectComponent
            name="account_to_id"
            label="¿En que cuenta recibirás tu dinero?"
            options={accountOptions}
            value={formik.values.account_to_id}
            onChange={onAccountChange}
            error={formik.errors.account_to_id}
            touched={formik.touched.account_to_id}
            empty={accountOptions.length < 1}
            emptyLabel="No has agregado ninguna cuenta"
          />
          {filteredAccounts.length < 10 && (
            <button className={classes.AddAccount} type="button" onClick={() => setModal("account")}>
              Agregar cuenta <Add className="ml-2" />
            </button>
          )}
          {interplaza && (
            <MuiAlert type="warning" opened>
              <span className="block text-left">
                <b>Cuentas interplaza de Interbank acarrean una comisión.</b> Conozca más en nuestros{" "}
                <a href="https://instakash.net/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline">
                  términos y condiciones.
                </a>
              </span>
            </MuiAlert>
          )}
          {(bankCCI || accountCCI) && (
            <MuiAlert type="warning" opened>
              <span className="block text-left">
                <b>Las transferencias interbancarias pueden demorar hasta 48 horas.</b> Conozoca más sobre las transferencias interbancarias en nuestros{" "}
                <a href="https://instakash.net/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline">
                  términos y condiciones.
                </a>
              </span>
            </MuiAlert>
          )}
          {funds_origin && (
            <SelectComponent
              name="funds_origin"
              label="Origen de los fondos"
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
            <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button mt-4 ld-over ${isProcessing ? "running" : ""}`}>
              <span className="ld ld-ring ld-spin" />
              Continuar
            </Button>
            <Button
              type="button"
              className={`secondary-button mt-4 ld-over ${isProcessing ? "running" : ""}`}
              disabled={isProcessing}
              onClick={() => dispatch(cancelExchangeInit(order.id, "draft"))}
            >
              <span className="ld ld-ring ld-spin" />
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default React.memo(Accounts);

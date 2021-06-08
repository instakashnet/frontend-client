import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addAccountInit } from "../../store/actions";
import { addAccountValidation } from "../helpers/validations";

import CustomSelect from "../../core/components/UI/form/CustomSelect";
import Input from "../../core/components/UI/form/Input";
import Select from "../../core/components/UI/form/Select";
import Checkbox from "../../core/components/UI/form/Checkbox";
import Button from "../../core/components/UI/Button";

const AddAccount = ({ order, accType }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { account_number: "", cci: "", bankId: "", currencyId: "", alias: "", acc_type: "", accept: false },
    validationSchema: addAccountValidation,
    onSubmit: (values) => dispatch(addAccountInit(values, accType)),
  });
  const { banks, currencies } = useSelector((state) => state.Data);
  const isProcessing = useSelector((state) => state.Accounts.isProcessing);

  const bankOptions = banks.map((bank) => ({ value: bank.id, label: bank.name, icon: `${process.env.PUBLIC_URL}/images/banks/${bank.name.toLowerCase()}-logo.svg` }));
  const accountTypeOptions = [
    { value: "checking", label: "Corriente" },
    { value: "savings", label: "De ahorros" },
  ];
  const currencyOptions = order
    ? currencies.filter((currency) => currency.id === order.currencyReceivedId).map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }))
    : currencies.map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }));

  return (
    <>
      <h2>Agregar cuenta bancaria</h2>
      <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-center">
        <CustomSelect
          name="bankId"
          label="Banco"
          value={bankOptions.find((option) => option.value === formik.values.bankId)}
          options={bankOptions}
          onChange={(bank) => formik.setFieldValue("bankId", bank.value)}
          placeholder="Selecciona tu banco"
          error={formik.errors.bankId}
          touched={formik.touched.bankId}
        />
        <Input
          name="account_number"
          label="Número de cuenta"
          placeholder="Ingresa tu nro. de cuenta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.account_number}
          error={formik.errors.account_number}
          touched={formik.touched.account_number}
        />
        <p className="self-start mb-3 relative -top-1 ml-2">* Entre 13 y 14 caracteres.</p>
        <Select
          name="acc_type"
          label="Tipo de cuenta"
          placeholder="Selecciona el tipo de cuenta"
          onChange={formik.handleChange}
          options={accountTypeOptions}
          error={formik.errors.acc_type}
          touched={formik.touched.acc_type}
        />
        <Select
          name="currencyId"
          label="Moneda"
          placeholder="Selecciona la moneda"
          onChange={formik.handleChange}
          options={currencyOptions}
          error={formik.errors.currencyId}
          touched={formik.touched.currencyId}
        />
        <Input
          name="alias"
          label="Alias de la cuenta"
          placeholder="nombre + banco + moneda"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.alias}
          error={formik.errors.alias}
          touched={formik.touched.alias}
        />
        <Checkbox name="accept" value={formik.values.accept} onChange={formik.handleChange} error={formik.errors.accept}>
          Declaro que es mi cuenta personal o de mi empresa.
        </Checkbox>
        <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button ld-ext-right ${isProcessing ? "running" : ""}`}>
          <span className="ld ld-ring ld-spin" />
          Agregar cuenta
        </Button>
      </form>
    </>
  );
};

export default AddAccount;

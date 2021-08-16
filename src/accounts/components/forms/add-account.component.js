import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addAccountInit } from "../../../store/actions";
import { addAccountValidation } from "../../helpers/validations";

import { MuiAlert } from "../../../components/UI/mui-alert.component";
import { Input } from "../../../components/UI/form-items/input.component";
import { SelectComponent } from "../../../components/UI/form-items/select.component";
import { CheckboxComponent } from "../../../components/UI/form-items/checkbox.component";
import { Button } from "../../../components/UI/button.component";

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
      <form onSubmit={formik.handleSubmit} className="max-w-sm mt-3">
        <SelectComponent
          name="bankId"
          label="Banco"
          value={formik.values.bankId}
          options={bankOptions}
          onChange={formik.handleChange}
          error={formik.errors.bankId}
          touched={formik.touched.bankId}
        />
        <Input
          name="account_number"
          label="Número de cuenta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.account_number}
          error={formik.errors.account_number}
          touched={formik.touched.account_number}
          helperText="Debe ser entre 13 y 14 caracteres"
        />
        <SelectComponent
          name="acc_type"
          label="Tipo de cuenta"
          onChange={formik.handleChange}
          value={formik.values.acc_type}
          options={accountTypeOptions}
          error={formik.errors.acc_type}
          touched={formik.touched.acc_type}
        />
        <SelectComponent
          name="currencyId"
          label="Moneda"
          value={formik.values.currencyId}
          onChange={formik.handleChange}
          options={currencyOptions}
          error={formik.errors.currencyId}
          touched={formik.touched.currencyId}
        />
        <Input
          name="alias"
          label="Alias de la cuenta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.alias}
          error={formik.errors.alias}
          touched={formik.touched.alias}
          helperText="Ej.: Tu nombre + banco + moneda"
        />
        <MuiAlert type="info" opened>
          <p>No realizamos transferencias a terceros. Todas las cuentas agregadas deben ser propias o de empresas donde seas el representante legal.</p>
        </MuiAlert>
        <CheckboxComponent name="accept" value={formik.values.accept} onChange={formik.handleChange} error={formik.errors.accept}>
          Declaro que esta cuenta es propia o de mi empresa.
        </CheckboxComponent>
        <div className="flex justify-center">
          <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button ld-over ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Agregar cuenta
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddAccount;

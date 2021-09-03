import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addAccountInit } from "../../../store/actions";
import { addAccountValidation } from "../../helpers/validations";

import { MuiAlert } from "../../../components/UI/mui-alert.component";
import { Input } from "../../../components/UI/form-items/input.component";
import { SelectComponent } from "../../../components/UI/form-items/select.component";
import { CheckboxComponent } from "../../../components/UI/form-items/checkbox.component";
import { Button } from "../../../components/UI/button.component";

import classes from "../../assets/css/account-components.module.scss";

export const PersonalAccount = ({ banks, currencies, accountTypes, isThird, addType, value, index, ...rest }) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { account_number: "", cci: "", bankId: "", isDirect: true, currencyId: "", alias: "", acc_type: "", thirdParty: isThird, accept: false },
    enableReinitialize: true,
    validationSchema: addAccountValidation,
    onSubmit: (values) => dispatch(addAccountInit(values, addType)),
  });
  const isProcessing = useSelector((state) => state.Accounts.isProcessing);
  const { bankId } = formik.values;

  useEffect(() => {
    if (bankId) {
      const bankSelected = banks.find((b) => b.value === bankId);
      setSelectedBank(bankSelected);
    }
  }, [bankId, banks]);

  const onBankChangeHandler = (e) => {
    const {
      target: { value },
    } = e;
    formik.handleChange(e);
    formik.setFieldValue("account_number", "");
    formik.setFieldValue("cci", "");

    if (value) {
      const bank = banks.find((b) => b.value === value);
      formik.setFieldValue("isDirect", bank.isDirect);
    }
  };

  return (
    <div role="tabpanel" hidden={value !== index} {...rest} className="max-w-sm mx-auto mt-8">
      <form onSubmit={formik.handleSubmit} className={classes.AccountForm}>
        <SelectComponent
          name="bankId"
          label="Banco"
          value={formik.values.bankId}
          options={banks}
          onChange={onBankChangeHandler}
          error={formik.errors.bankId}
          touched={formik.touched.bankId}
        />
        {!formik.values.isDirect ? (
          <Input
            name="cci"
            label="Número de cuenta interbancario"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cci}
            error={formik.errors.cci}
            touched={formik.touched.cci}
            helperText="Debe ser de 20 caracteres."
          />
        ) : (
          <Input
            name="account_number"
            label="Número de cuenta"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.account_number}
            error={formik.errors.account_number}
            touched={formik.touched.account_number}
            helperText="Debe ser entre 13 y 14 caracteres."
          />
        )}
        <SelectComponent
          name="acc_type"
          label="Tipo de cuenta"
          onChange={formik.handleChange}
          value={formik.values.acc_type}
          options={accountTypes}
          error={formik.errors.acc_type}
          touched={formik.touched.acc_type}
        />
        <SelectComponent
          name="currencyId"
          label="Moneda"
          value={formik.values.currencyId}
          onChange={formik.handleChange}
          options={currencies}
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
        {selectedBank && !selectedBank.isDirect && (
          <MuiAlert type="warning" opened>
            Las <b>transferencias interbancarias</b> pueden demorar hasta 48 horas. Conoce más en nuestros{" "}
            <a href="https://instakash.net/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline">
              términos y condiciones.
            </a>
          </MuiAlert>
        )}
        <CheckboxComponent name="accept" value={formik.values.accept} onChange={formik.handleChange} error={formik.errors.accept}>
          Declaro que toda la información colocada es correcta, actual y asumo total responsabilidad de su veracidad.
        </CheckboxComponent>
        <div className="flex justify-center">
          <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button mt-4 ld-over ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Agregar cuenta
          </Button>
        </div>
      </form>
    </div>
  );
};

import { FormLabel,RadioGroup } from "@material-ui/core";
// FORMIK
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
// REACT REDUX
import { useDispatch,useSelector } from "react-redux";

// COMPONENTS
import { Button } from "../../../../components/UI/button.component";
import { CheckboxComponent } from "../../../../components/UI/form-items/checkbox.component";
import { Input } from "../../../../components/UI/form-items/input.component";
import { RadioComponent } from "../../../../components/UI/form-items/radio.component";
import { SelectComponent } from "../../../../components/UI/form-items/select.component";
import { MuiAlert } from "../../../../components/UI/mui-alert.component";
// HELPER
import { AllowOnlyNumbers } from "../../../../shared/functions";
// REDUX ACTIONS
import { addAccountInit } from "../../../../store/actions";
// HELPER
import { addThirdPartyAccountSchema } from "../../helpers/validations";
// COMPONENTS
import classes from "../modules/forms/add-account.module.scss";

export const ThirdPartyAccount = ({ banks, currencies, accountTypes, addType, value, index, ...rest }) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      account_number: "",
      cci: "",
      isDirect: true,
      bankId: "",
      currencyId: "",
      alias: "",
      acc_type: "",
      isThird: true,
      thirdPartyAccType: "natural",
      documentType: "",
      documentIdentity: "",
      job: "",
      name: "",
      razonSocial: "",
      email: "",
      accept: false,
      accept2: false,
    },
    enableReinitialize: true,
    validationSchema: addThirdPartyAccountSchema,
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

  const documentOptions = [
    { value: "DNI", label: "DNI" },
    { value: "CE", label: "CE" },
    { value: "PTP", label: "PTP" },
    { value: "pasaporte", label: "Pasaporte" },
    { value: "RUC", label: "RUC" },
  ];

  const onDocumentChangeHandler = (e) => (AllowOnlyNumbers(e.target.value) ? formik.setFieldValue("documentIdentity", e.target.value) : null);

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

  const onThirdPartyAccTypeChange = (e) => {
    formik.handleChange(e);
    const {
      target: { value },
    } = e;

    if (value === "juridica") {
      formik.setFieldValue("documentType", "RUC");
    } else formik.setFieldValue("documentType", "");
  };

  return (
    <div role="tabpanel" hidden={value !== index} {...rest} className="mt-8 max-w-sm mx-auto">
      <form onSubmit={formik.handleSubmit} className={classes.AccountForm}>
        <MuiAlert type="info" opened>
          Las cuentas a terceros <b>solo pueden ser utilizadas</b> para recibir el dinero solicitado.
        </MuiAlert>
        <FormLabel component="legend" className="mt-3">
          ¿A quien le pertenece esta cuenta?
        </FormLabel>
        <RadioGroup aria-label="tipo de cuenta a terceros" name="thirdPartyAccType" value={formik.values.thirdPartyAccType} onChange={onThirdPartyAccTypeChange}>
          <div className="flex flex-wrap items-center justify-between">
            <RadioComponent value="natural" label="A una persona" />
            <RadioComponent value="juridica" label="A una empresa" />
          </div>
        </RadioGroup>
        <div className="grid grid-cols-3 w-full gap-2">
          <div className="mt-2">
            <SelectComponent
              name="documentType"
              label="Tipo doc."
              value={formik.values.documentType}
              onChange={formik.handleChange}
              options={documentOptions}
              disabled={formik.values.thirdPartyAccType === "juridica"}
            />
          </div>
          <div className="col-span-2">
            <Input
              name="documentIdentity"
              type="text"
              label="Nro. de documento"
              value={formik.values.documentIdentity}
              onChange={onDocumentChangeHandler}
              onBlur={formik.handleBlur}
              error={formik.errors.documentIdentity}
              touched={formik.touched.documentIdentity}
              groupClass="col-span-2"
            />
          </div>
        </div>
        {formik.values.thirdPartyAccType === "natural" ? (
          <Input
            type="text"
            name="name"
            label="Nombre completo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.errors.name}
            touched={formik.touched.name}
          />
        ) : (
          <Input
            type="text"
            name="razonSocial"
            label="Razón social"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.razonSocial}
            error={formik.errors.razonSocial}
            touched={formik.touched.razonSocial}
          />
        )}
        <Input
          type="email"
          name="email"
          label="Correo electrónico"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        {formik.values.thirdPartyAccType === "natural" && (
          <Input
            type="text"
            name="job"
            label="Ocupación"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.job}
            error={formik.errors.job}
            touched={formik.touched.job}
          />
        )}
        <SelectComponent
          name="bankId"
          label="Banco"
          value={formik.values.bankId}
          options={banks}
          onChange={onBankChangeHandler}
          error={formik.errors.bankId}
          touched={formik.touched.bankId}
        />
        <MuiAlert type="info" opened>
          Operamos hacia interbank <b>solo en Lima</b>. BCP e interbancarias a todo Perú de forma digital.
        </MuiAlert>
        {!formik.values.isDirect ? (
          <Input
            name="cci"
            label="Número de cuenta interbancario"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cci}
            error={formik.errors.cci}
            touched={formik.touched.cci}
            helperText="Debe ser de 20 caracteres"
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
            helperText="Debe ser entre 13 y 14 caracteres"
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
            Las <b>transferencias interbancarias</b> acarrean comisiones y pueden demorar hasta 48 horas. Conoce más en nuestros{" "}
            <a href="https://instakash.net/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline">
              términos y condiciones
            </a>
            .
          </MuiAlert>
        )}

        <CheckboxComponent name="accept" value={formik.values.accept} onChange={formik.handleChange} error={formik.errors.accept}>
          Declaro que toda la información colocada es correcta, actual y asumo total responsabilidad de su veracidad.
        </CheckboxComponent>
        <div className="my-4">
          <CheckboxComponent name="accept2" value={formik.values.accept2} onChange={formik.handleChange} error={formik.errors.accept2}>
            Declaro que cuento con el consentimiento para el uso de los datos de la persona y/o empresa acá expuesta, en conformidad con el tratamiento de los mismos en relación a
            sus <a href="https://instakash.net/politicas-de-privacidad">políticas de privacidad</a>.
          </CheckboxComponent>
        </div>
        <div className="flex justify-center">
          <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button ld-over ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Agregar cuenta
          </Button>
        </div>
      </form>
    </div>
  );
};

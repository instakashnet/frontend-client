import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { RadioGroup, FormLabel } from "@material-ui/core";
import { addThirdPartyAccountSchema } from "../../helpers/validations";
import { AllowOnlyNumbers } from "../../../shared/functions";
import { addAccountInit } from "../../../store/actions";

import { MuiAlert } from "../../../components/UI/mui-alert.component";
import { Input } from "../../../components/UI/form-items/input.component";
import { SelectComponent } from "../../../components/UI/form-items/select.component";
import { CheckboxComponent } from "../../../components/UI/form-items/checkbox.component";
import { RadioComponent } from "../../../components/UI/form-items/radio.component";
import { Button } from "../../../components/UI/button.component";

export const ThirdPartyAccount = ({ banks, currencies, accountTypes, addType, value, index, ...rest }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      account_number: "",
      cci: "",
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
    validationSchema: addThirdPartyAccountSchema,
    onSubmit: (values) => dispatch(addAccountInit(values, addType)),
  });
  const isProcessing = useSelector((state) => state.Accounts.isProcessing);

  const documentOptions = [
    { value: "DNI", label: "DNI" },
    { value: "CE", label: "CE" },
    { value: "PTP", label: "PTP" },
    { value: "pasaporte", label: "Pasaporte" },
    { value: "RUC", label: "RUC" },
  ];

  const onDocumentChangeHandler = (e) => (AllowOnlyNumbers(e.target.value) ? formik.setFieldValue("documentIdentity", e.target.value) : null);

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
      <form onSubmit={formik.handleSubmit}>
        <FormLabel component="legend">¿A quien le pertenece esta cuenta?</FormLabel>
        <RadioGroup aria-label="tipo de cuenta a terceros" name="thirdPartyAccType" value={formik.values.thirdPartyAccType} onChange={onThirdPartyAccTypeChange}>
          <div className="flex flex-wrap items-center justify-between">
            <RadioComponent value="natural" label="A una persona" />
            <RadioComponent value="juridica" label="A una empresa" />
          </div>
        </RadioGroup>
        <div className="grid grid-cols-3 w-full gap-2">
          <SelectComponent
            name="documentType"
            label="Tipo de doc."
            value={formik.values.documentType}
            onChange={formik.handleChange}
            options={documentOptions}
            disabled={formik.values.thirdPartyAccType === "juridica"}
          />
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
        <MuiAlert type="info" opened>
          Las cuentas a terceros solo pueden ser utilizadas para recibir el dinero solicitado.
        </MuiAlert>
        <CheckboxComponent name="accept" value={formik.values.accept} onChange={formik.handleChange} error={formik.errors.accept}>
          Declaro que toda la información colocada es correcta, actual y asumo total responsabilidad de su veracidad.
        </CheckboxComponent>
        <div className="my-4">
          <CheckboxComponent name="accept2" value={formik.values.accept2} onChange={formik.handleChange} error={formik.errors.accept2}>
            Declaro que cuento con el consentimiento para el uso de los datos de la persona y/o empresa acá expuesta, en conformidad con el tratamiento de los mismos en relación a
            sus <a href="!#">políticas de privacidad</a>.
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

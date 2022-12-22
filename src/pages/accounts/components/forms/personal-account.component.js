//FORMIK
import { FormLabel, RadioGroup } from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
// REACT-REDUX
import { useDispatch, useSelector } from "react-redux";
// COMPONENTS
import { Button } from "../../../../components/UI/button.component";
import { CheckboxComponent } from "../../../../components/UI/form-items/checkbox.component";
import { Input } from "../../../../components/UI/form-items/input.component";
import { RadioComponent } from "../../../../components/UI/form-items/radio.component";
import { SelectComponent } from "../../../../components/UI/form-items/select.component";
import { MuiAlert } from "../../../../components/UI/mui-alert.component";
// HELPERS
import { AllowOnlyNumbers } from "../../../../shared/functions";
// REDUX ACTIONS
import { addAccountInit } from "../../../../store/actions";
// HELPER TO FORMIK
import { addAccountValidation } from "../../helpers/validations";
// CLASSES
import classes from "../modules/forms/add-account.module.scss";

export const PersonalAccount = ({ banks, currencies, documents, accountTypes, isThird, addType, value, index, ...rest }) => {
  const dispatch = useDispatch(),
    [selectedBank, setSelectedBank] = useState(null);

  // FORMIK
  const formik = useFormik({
    initialValues: {
      account_number: "",
      cci: "",
      bankId: "",
      interbank: false,
      isDirect: true,
      currencyId: "",
      alias: "",
      acc_type: "",
      thirdParty: isThird,
      accept: false,
      joint: "false",
      firstNameJoint: "",
      fatherSurname: "",
      motherSurname: "",
      documentTypeJoint: "",
      documentNumberJoint: "",
    },
    enableReinitialize: true,
    validationSchema: addAccountValidation,
    onSubmit: (values) => {
      let fixedValues = {
        ...values,
        joint: values.joint === "true",
        lastNameJoint: `${values.fatherSurname} ${values.motherSurname}`.trim(),
      };

      dispatch(addAccountInit(fixedValues, addType));
    },
  });
  const isProcessing = useSelector((state) => state.Accounts.isProcessing);
  const { bankId, interbank } = formik.values;

  // EFFECTS
  useEffect(() => {
    if (bankId) {
      const bankSelected = banks.find((b) => b.value === bankId);
      setSelectedBank(bankSelected);
    }
  }, [bankId, banks]);

  // HANDLERS
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
    },
    onDocumentChangeHandler = ({ target: { value } }) => (AllowOnlyNumbers(value) ? formik.setFieldValue("documentNumberJoint", value) : null);

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
          className="mb-0"
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
            groupClass="mb-0"
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
            Las <b>transferencias interbancarias</b> acarrean comisiones y pueden demorar hasta 24 horas. Conoce más en nuestros{" "}
            <a href="https://instakash.net/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline">
              términos y condiciones
            </a>
            .
          </MuiAlert>
        )}
        {/* {isInterbank && (
          <CheckboxComponent name="interbank" value={formik.values.interbank} onChange={formik.handleChange} error={formik.errors.interbank}>
            ¿Esta cuenta es de provincia?
          </CheckboxComponent>
        )}
        {interbank && (
          <MuiAlert type="error" opened>
            Te recordamos que operamos hacia interbank <b>solo en lima</b>.
          </MuiAlert>
        )} */}
        <FormLabel component="legend" className="mt-3">
          ¿Es una cuenta mancomunada?
        </FormLabel>
        <RadioGroup aria-label="cuenta mancomunada" name="joint" value={formik.values.joint} onChange={formik.handleChange}>
          <div className="flex flex-wrap items-center justify-start">
            <RadioComponent value="false" label="No" />
            <RadioComponent value="true" label="Sí" />
          </div>
        </RadioGroup>

        {formik.values.joint === "true" && (
          <fieldset className="mb-3">
            <legend className="text-sm">Registre los datos de la persona con la que comparte esta cuenta bancaria, tal y como aparece en su documento de identidad.</legend>
            <Input
              name="firstNameJoint"
              label="Nombre(s)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstNameJoint}
              error={formik.errors.firstNameJoint}
              touched={formik.touched.firstNameJoint}
            />
            <div className="grid grid-cols-2 w-full gap-2">
              <Input
                name="fatherSurname"
                label="Apellido paterno"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fatherSurname}
                error={formik.errors.fatherSurname}
                touched={formik.touched.fatherSurname}
              />
              <Input
                name="motherSurname"
                label="Apellido materno"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherSurname}
                error={formik.errors.motherSurname}
                touched={formik.touched.motherSurname}
              />
            </div>
            <div className="grid grid-cols-3 w-full gap-2">
              <div className="mt-2">
                <SelectComponent
                  name="documentTypeJoint"
                  label="Tipo doc."
                  value={formik.values.documentTypeJoint}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={documents}
                />
              </div>
              <div className="col-span-2">
                <Input
                  name="documentNumberJoint"
                  type="text"
                  label="Nro. de documento"
                  value={formik.values.documentNumberJoint}
                  onChange={onDocumentChangeHandler}
                  onBlur={formik.handleBlur}
                  error={formik.errors.documentNumberJoint}
                  touched={formik.touched.documentNumberJoint}
                  groupClass="col-span-2"
                />
              </div>
            </div>
          </fieldset>
        )}

        <CheckboxComponent name="accept" value={formik.values.accept} onChange={formik.handleChange} error={formik.errors.accept}>
          Declaro que esta cuenta es mía o de mi empresa y que toda la información colocada es correcta.
        </CheckboxComponent>
        <div className="flex justify-center">
          <Button type="submit" disabled={!formik.isValid || interbank || isProcessing} className={`action-button mt-4 ld-over ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Agregar cuenta
          </Button>
        </div>
      </form>
    </div>
  );
};

import React from "react";
import { useFormik } from "formik";

import { OtpInput } from "../components/UI/otp-input.component";
import { Button } from "../../components/UI/button.component";

import classes from "../assets/css/auth.containers.module.scss";
import VerificationIcon from "../assets/images/icons/verification.svg";

export const EmailValidationScreen = ({ history }) => {
  const formik = useFormik({ initialValues: { otp_1: "", otp_2: "", otp_3: "", otp_4: "" } });

  const onOtpChange = ({ target: { maxLength, value, name } }) => {
    if (isNaN(value)) return false;
    formik.setFieldValue([name], value);

    const field = name.split("_");

    if (value.length >= maxLength) {
      if (parseInt(field[1], 10) < 4) {
        const nextSibling = document.querySelector(`input[name=otp_${parseInt(field[1], 10) + 1}]`);
        if (nextSibling !== null) nextSibling.focus();
      }
    }
  };

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      <div className={classes.AuthWrapper}>
        <img src={VerificationIcon} alt="Verificación" />
        <h2 className="mt-5 mb-3">Ingresa el código enviado a tu correo</h2>
        <p>Hemos enviado un código de 4 dígitos a tu correo. Por favor, ingresalo para poder validar tu cuenta.</p>
        <form>
          <div className="flex items-center justify-center my-4">
            <OtpInput name="otp_1" value={formik.values.otp_1} onChange={onOtpChange} />
            <OtpInput name="otp_2" value={formik.values.otp_2} onChange={onOtpChange} />
            <OtpInput name="otp_3" value={formik.values.otp_3} onChange={onOtpChange} />
            <OtpInput name="otp_4" value={formik.values.otp_4} onChange={onOtpChange} />
          </div>
          <Button type="submit" disabled={!formik.isValid} className={`action-button my-4`}>
            Validar
          </Button>
          <Button onClick={() => history.goBack()} type="button" className="secondary-button">
            Regresar
          </Button>
        </form>
        <p className="mt-8 mb-2">¿No recibiste el código?</p>
        <button type="button" className="uppercase" onClick={() => {}}>
          Reenviar código
        </button>
      </div>
    </main>
  );
};

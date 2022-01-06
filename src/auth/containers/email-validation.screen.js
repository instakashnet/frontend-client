import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { validateEmailInit, refreshCodeInit } from "../../store/actions";
import { emailValidationSchema } from "../helpers/formValidations";

// COMPONENTS
import { OtpInput } from "../components/UI/otp-input.component";
import { Button } from "../../components/UI/button.component";
import { MuiAlert } from "../../components/UI/mui-alert.component";

// ASSETS
import VerificationIcon from "../assets/images/icons/verification.svg";

// CLASSES
import classes from "../assets/css/auth.containers.module.scss";

export const EmailValidationScreen = ({ history, match }) => {
  const dispatch = useDispatch(),
    { type } = match.params,
    formik = useFormik({
      initialValues: { otp_1: "", otp_2: "", otp_3: "", otp_4: "" },
      validationSchema: emailValidationSchema,
      onSubmit: (values) => dispatch(validateEmailInit(values, type)),
    }),
    { isProcessing } = useSelector((state) => state.Auth);

  // HANDLERS
  const onOtpChange = (e) => {
    const {
      target: { maxLength, value, name },
    } = e;

    if (isNaN(value)) return false;
    formik.handleChange(e);

    const field = name.split("_");

    if (value.length >= maxLength) {
      if (parseInt(field[1], 10) < 4) {
        const nextSibling = document.querySelector(`input[name=otp_${parseInt(field[1], 10) + 1}]`);
        if (nextSibling !== null) nextSibling.focus();
      }
    }
  };

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (!authData) return history.push("/signin");
  }, [history]);

  return (
    <main className={classes.SignupBackground}>
      <div className={classes.AuthWrapper}>
        <img src={VerificationIcon} alt="Verificación" />
        <h2 className="mt-5 mb-3">Ingresa el código enviado a tu correo</h2>
        <p>Hemos enviado un código de 4 dígitos a tu correo. Por favor, ingresalo para continuar.</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
          <div className="flex items-center justify-center my-4">
            <OtpInput touched={formik.touched.otp_1} name="otp_1" value={formik.values.otp_1} onChange={onOtpChange} onBlur={formik.handleBlur} />
            <OtpInput touched={formik.touched.otp_2} name="otp_2" value={formik.values.otp_2} onChange={onOtpChange} onBlur={formik.handleBlur} />
            <OtpInput touched={formik.touched.otp_3} name="otp_3" value={formik.values.otp_3} onChange={onOtpChange} onBlur={formik.handleBlur} />
            <OtpInput touched={formik.touched.otp_4} name="otp_4" value={formik.values.otp_4} onChange={onOtpChange} onBlur={formik.handleBlur} />
          </div>
          {!formik.isValid && Object.keys(formik.touched).length > 3 && (
            <MuiAlert type="error" opened>
              <p>Código de verificación inválido. Verifica que los números ingresados sean correctos.</p>
            </MuiAlert>
          )}
          <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button my-4 ld-over ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Validar
          </Button>
          <Button onClick={() => history.goBack()} type="button" className="secondary-button">
            Regresar
          </Button>
        </form>
        <p className="mt-8 mb-2">¿No recibiste el código?</p>
        <button type="button" className="uppercase" onClick={() => dispatch(refreshCodeInit())}>
          Reenviar código
        </button>
      </div>
    </main>
  );
};

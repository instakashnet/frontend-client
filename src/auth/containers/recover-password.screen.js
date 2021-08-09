import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Mail } from "react-feather";
import { emailValidation } from "../helpers/formValidations";
import { recoverPasswordInit } from "../../store/actions";

import { Input } from "../../components/UI/form-items/input.component";
import { Button } from "../../components/UI/button.component";

import classes from "../assets/css/auth.containers.module.scss";

const RecoverPassword = () => {
  const dispatch = useDispatch();
  const [sent, setSent] = useState(false);
  const { isProcessing } = useSelector((state) => state.Auth);

  const formik = useFormik({ initialValues: { email: "" }, validationSchema: emailValidation, onSubmit: (values) => dispatch(recoverPasswordInit(values, setSent)) });

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      <div className={classes.AuthWrapper}>
        {!sent ? (
          <>
            <h1>Tranquilo, lo solucionaremos</h1>
            <p className="mt-6">
              Ingresa tu correo electrónico y te enviaremos <br /> un link para generar una nueva contraseña.
            </p>
          </>
        ) : (
          <>
            <h1>Revisa tu correo electrónico</h1>
            <p className="mt-6">
              Te hemos enviado un link para reiniciar tu contraseña <br /> Recuerda revisar la carpeta de spam.
            </p>
          </>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            placeholder="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
            icon={Mail}
          />
          {sent && <p className="text-center mt-6">¿No te llegó el correo de confirmación?</p>}
          <Button type="submit" className={`${classes.SubmitButton} mb-2 ld-ext-right ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
            <span className="ld ld-ring ld-spin" />
            {sent ? "Reenviar correo" : "Reiniciar contraseña"}
          </Button>
        </form>
        <p>
          ¿Ya la recordaste?{" "}
          <Link to="/signin" className={classes.InfoButton}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RecoverPassword;

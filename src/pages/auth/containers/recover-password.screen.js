import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "@material-ui/icons";

// FORMIK
import { useFormik } from "formik";
import { emailValidation } from "../helpers/formValidations";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { recoverPasswordInit } from "../../../store/actions";

// COMPONENTS
import { Input } from "../../../components/UI/form-items/input.component";
import { Button } from "../../../components/UI/button.component";

// CLASSES
import classes from "../assets/css/auth.containers.module.scss";

const RecoverPassword = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);

  const formik = useFormik({ initialValues: { email: "" }, validationSchema: emailValidation, onSubmit: (values) => dispatch(recoverPasswordInit(values)) });

  return (
    <main className={classes.SignupBackground}>
      <div className={classes.AuthWrapper}>
        <h2>Tranquilo, lo solucionaremos</h2>
        <p className="my-4">
          Ingresa tu correo electrónico y te enviaremos <br /> un link para generar una nueva contraseña.
        </p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
          <Input
            name="email"
            placeholder="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
            iconEnd={Mail}
          />
          <Button type="submit" className={`action-button my-4 ld-over ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
            <span className="ld ld-ring ld-spin" />
            Enviar correo
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

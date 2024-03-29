import { Mail } from "@material-ui/icons";
// FORMIK
import { useFormik } from "formik";
import React from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// REACT ROUTER
import { Link } from "react-router-dom";
// COMPONENTS
import { Button } from "../../../components/UI/button.component";
import { Input } from "../../../components/UI/form-items/input.component";
// REDUX ACTIONS
import { recoverPasswordInit } from "../../../store/actions";
// HELPER TO FORMIK
import { emailValidation } from "../helpers/formValidations";
// CLASSES
import sharedClass from "./modules/sharedClasses.module.scss";


const RecoverPassword = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);

  const formik = useFormik({ initialValues: { email: "" }, validationSchema: emailValidation, onSubmit: (values) => dispatch(recoverPasswordInit(values)) });

  return (
    <main className={sharedClass.AuthBackground}>
      <div className={sharedClass.AuthWrapper}>
        <h2>Tranquilo, lo solucionaremos</h2>
        <p className="my-4">
          Ingresa tu correo electrónico y te enviaremos <br /> un link para generar una nueva contraseña.
        </p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
          <Input
            name="email"
            placeholder="johndoe@example.com"
            label="Correo electrónico"
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
          <Link to="/signin" className={sharedClass.InfoButton}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RecoverPassword;

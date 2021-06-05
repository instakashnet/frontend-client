import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { signinValidation } from "../helpers/formValidations";
import { Mail } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { signinInit, signinGoogle, setAlertInit, openModal, closeModal } from "../../store/actions";

import Background from "../components/layout/Background";
import Logo from "../../core/components/UI/Logo";
import Input from "../components/UI/Input";
import Password from "../components/UI/Password";
import Button from "../../core/components/UI/Button";
import GoogleButton from "../components/UI/GoogleButton";
import InfoModal from "../../core/components/UI/modal/InfoModal";

import classes from "./Auth.module.scss";

const Signin = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);
  const formik = useFormik({ initialValues: { email: "", password: "" }, validationSchema: signinValidation, onSubmit: (values) => dispatch(signinInit(values)) });
  const signInGoogle = (res) => {
    if (res.error) {
      if (res.error.includes("popup_closed")) return;
      return dispatch(setAlertInit("Parece que hay problemas conectando con google. Por favor intente más tarde.", "error"));
    }
    dispatch(signinGoogle(res.tokenId));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(openModal());
    }, 600);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-full md:h-screen">
      <Background />
      <div className={classes.AuthWrapper}>
        <Logo className="w-70 md:w-96" />
        <h1>
          Gana siempre con nosotros. <br /> Mejores tasas, mayor ahorro.
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            type="email"
            value={formik.values.email}
            icon={Mail}
            placeholder="Correo electrónico"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
            autoComplete="off"
          />
          <Password
            name="password"
            value={formik.values.password}
            placeholder="Contraseña"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            autoComplete="off"
          />
          <div className="flex justify-end">
            <Link to="/recover-password">¿Olvidaste tu contraseña?</Link>
          </div>
          <Button type="submit" className={`action-button my-5 ld-ext-right ${isProcessing ? "running" : ""}`} disabled={true || !formik.isValid || isProcessing}>
            <span className="ld ld-ring ld-spin" />
            Ingresar
          </Button>
          <GoogleButton onSuccess={signInGoogle} onFailure={signInGoogle} />
        </form>
        <p>
          ¿Eres nuevo en Instakash?
          <Link to="/signup" className="ml-1">
            Regístrate
          </Link>
        </p>
      </div>
      <InfoModal type="alert">
        <p>
          En este momento nos encontramos realizando unas <b>mejoras y actualizaciones</b> en nuestra plataforma, todo para poder ofrecerle el mejor servicio posible. Estaremos de
          vuelta a la brevedad posible.
        </p>
        <p>Agradecemos su comprensión.</p>
        <Button onClick={() => dispatch(closeModal())} className="action-button">
          Lo entiendo
        </Button>
      </InfoModal>
    </main>
  );
};

export default Signin;

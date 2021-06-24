import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { signinValidation } from "../helpers/formValidations";
import { Mail } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { signinInit, signinGoogle, setAlertInit, closeModal } from "../../store/actions";

import Background from "../components/layout/background.component";
import Logo from "../../core/components/UI/logo.component";
import Input from "../components/UI/input.component";
import Password from "../components/UI/password-input.component";
import Button from "../../core/components/UI/button.component";
import GoogleButton from "../components/UI/googe-button.component";
import InfoModal from "../../core/components/UI/modals/info-modal.component";

import classes from "../assets/css/auth.containers.module.scss";

const Signin = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);
  const formik = useFormik({ initialValues: { email: "", password: "" }, validationSchema: signinValidation, onSubmit: (values) => dispatch(signinInit(values)) });
  const signInGoogle = (res) => {
    console.log(res);
    if (res.error) {
      if (res.error.includes("popup_closed")) return;
    }
    dispatch(signinGoogle(res.tokenId));
  };

  /*   useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(openModal(Information));
    }, 600);
    return () => clearTimeout(timeout);
  }, [dispatch]); */

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
          <div className="flex items-center justify-center flex-col">
            <Button type="submit" className={`action-button my-5 ld-ext-right ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
              <span className="ld ld-ring ld-spin" />
              Ingresar
            </Button>
            <GoogleButton onSuccess={signInGoogle} onFailure={signInGoogle} />
          </div>
        </form>
        <p>
          ¿Eres nuevo en Instakash?
          <Link to="/signup" className="ml-1">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
};

export const Information = () => {
  const dispatch = useDispatch();

  return (
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
  );
};

export default Signin;

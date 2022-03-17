import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { signinInit, signinGoogle, closeModal } from "../../../store/actions";

// FORMIK
import { useFormik } from "formik";
import { signinValidation } from "../helpers/formValidations";

// COMPONENTS
import { GoogleButton } from "../components/UI/google-button.component";
import Background from "../components/layout/background.component";
import { Input } from "../../../components/UI/form-items/input.component";
import { CheckboxComponent } from "../../../components/UI/form-items/checkbox.component";
import { Button } from "../../../components/UI/button.component";
import { Modal } from "../../../components/UI/modals/modal.component";
import Logo from "../../../components/UI/logo.component";

// CLASSES
import classes from "../assets/css/auth.containers.module.scss";

const Signin = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);

  const formik = useFormik({
    initialValues: { email: "", password: "", rememberMe: false },
    validationSchema: signinValidation,
    onSubmit: (values) => {
      if (values.rememberMe) {
        localStorage.setItem("rememberMe", JSON.stringify({ email: values.email }));
      } else localStorage.removeItem("rememberMe");
      dispatch(signinInit(values));
    },
  });
  const { setFieldValue } = formik;

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe) {
      setFieldValue("rememberMe", true);
      setFieldValue("email", JSON.parse(rememberMe).email);
    }
  }, [setFieldValue]);

  const signInGoogle = (res) => {
    if (res.error) if (res.error.includes("popup_closed")) return;
    dispatch(signinGoogle(res.accessToken));
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     dispatch(openModal());
  //   }, 600);
  //   return () => clearTimeout(timeout);
  // }, [dispatch]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-full md:h-screen">
      <Background />
      <div className={classes.AuthWrapper}>
        <Logo className="w-70 md:w-80 self-start" />
        <h1>Gana siempre con nosotros. Mejores tasas, mayor ahorro.</h1>
        <GoogleButton onSuccess={signInGoogle} onFailure={signInGoogle} />
        <p className={classes.SignInMessage}>o ingresa tus datos</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
          <input type="hidden" value="something" />
          <Input
            type="email"
            name="email"
            value={formik.values.email}
            label="Correo electrónico"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.errors.email}
            autoComplete="username"
          />
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
            value={formik.values.password}
            label="Contraseña"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.errors.password}
          />
          <CheckboxComponent name="rememberMe" value={formik.values.rememberMe} onChange={formik.handleChange}>
            Recordar mis datos
          </CheckboxComponent>
          <Button className={`action-button mt-2 mb-4 ld-over ${isProcessing ? "running" : ""}`} type="submit">
            <span className="ld ld-ring ld-spin" />
            Ingresar
          </Button>
        </form>
        <Link to="/recover-password" className="mb-4">
          Olvidé mi contraseña
        </Link>
        <p>
          ¿Eres nuevo en Instakash?
          <Link to="/signup" className="ml-1">
            Regístrate
          </Link>
        </p>
      </div>
      <Modal title="¡IMPORTANTE!" isAlert alertType="warning">
        <Information />
      </Modal>
    </main>
  );
};

export const Information = () => {
  const dispatch = useDispatch();

  return (
    <>
      <p className="mb-3 text-center">
        Agradecidos siempre por la confianza. Queremos informarle que hoy <b>14 de Marzo</b> entre el horario de <b>3PM a 4:30PM</b> estaremos realizando actualizaciones y
        optimizaciones en nuestros servidores, por ello no podremos atender sus pedidos durante este tiempo.
      </p>
      <p className="text-center my-4 font-bold">Agradecemos su comprensión.</p>
      <Button onClick={() => dispatch(closeModal())} className="action-button">
        Lo entiendo
      </Button>
    </>
  );
};

export default Signin;

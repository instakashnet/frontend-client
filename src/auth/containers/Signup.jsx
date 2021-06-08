import React from "react";
import { useFormik } from "formik";
import { Mail } from "react-feather";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signupValidation } from "../helpers/formValidations";
import { signupInit } from "../store/actions";

import Input from "../components/UI/Input";
import CodeInput from "../../core/components/UI/form/Input";
import PhoneInput from "../components/UI/PhoneInput";
import PasswordInput from "../components/UI/Password";
import Button from "../../core/components/UI/Button";

import classes from "./Auth.module.scss";

const Signup = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);
  const formik = useFormik({
    initialValues: { email: "", phone: "", password: "", confirmPassword: "", affiliate: "" },
    validationSchema: signupValidation,
    onSubmit: (values) => dispatch(signupInit(values)),
  });

  const onPhoneChange = (value) => formik.setFieldValue("phone", value);

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      <div className={classes.AuthWrapper}>
        <h1>¡Bienvenido a Instakash!</h1>
        <p className="mt-6">
          Registrate y realiza tus operaciones <br /> de forma segura desde nuestra plataforma digital.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="email"
            name="email"
            value={formik.values.email}
            placeholder="Correo electrónico"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon={Mail}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <PhoneInput value={formik.values.phone} onChange={onPhoneChange} error={formik.errors.phone} country="pe" />
          <PasswordInput
            name="password"
            placeholder="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />
          <h4 className="text-center mb-2">¿Te ha referido un amigo?</h4>
          <p className="text-sm text-center">¡Ingresa su código y recibe una tasa preferencial!</p>
          <CodeInput
            name="affiliate"
            placeholder="Ingresa el código de afiliado aquí"
            value={formik.values.affiliate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.affiliate}
            touched={formik.touched.affiliate}
          />
          <p>
            Al crear tu cuenta estás aceptando nuestros <a href="https://instakash.net/politicas-de-privacidad">Términos y condiciones</a> y{" "}
            <a href="https://instakash.net/terminos-y-condiciones">Políticas de privacidad</a>.
          </p>
          <Button type="submit" className={`action-button mt-5 ld-ext-right ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
            <span className="ld ld-ring ld-spin" />
            Crear cuenta
          </Button>
        </form>
        <p>
          ¿Ya posees una cuenta?
          <Link to="/signin" className="ml-1">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;

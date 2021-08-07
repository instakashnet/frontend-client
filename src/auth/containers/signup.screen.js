import React from "react";
import { useFormik } from "formik";
import { Mail } from "react-feather";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signupValidation } from "../helpers/formValidations";
import { signupInit } from "../store/actions";

import Input from "../components/UI/input.component";
import CodeInput from "../../core/components/UI/form-items/input.component";
import PhoneInput from "../components/UI/phone-input.component";
import PasswordInput from "../components/UI/password-input.component";
import Button from "../../core/components/UI/button.component";
import { CheckboxComponent } from "../../core/components/UI/form-items/checkbox.component";

import classes from "../assets/css/auth.containers.module.scss";

const Signup = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);
  const formik = useFormik({
    initialValues: { email: "", phone: "", password: "", confirmPassword: "", affiliate: "", allowPromotionalEmail: false, acceptTerms: false },
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
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
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
          <h4 className="text-center text-lg mb-2 mt-3">¿Te ha referido un amigo?</h4>
          <p className="text-center">¡Ingresa su código y recibe una tasa preferencial!</p>
          <CodeInput
            name="affiliate"
            placeholder="Ingresa el código de afiliado aquí"
            value={formik.values.affiliate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.affiliate}
            touched={formik.touched.affiliate}
          />
          <CheckboxComponent
            name="allowPromotionalEmail"
            className={classes.Checkbox}
            value={formik.values.allowPromotionalEmail}
            error={formik.errors.allowPromotionalEmail}
            onChange={formik.handleChange}>
            Autorizo recibir notícias y promociones de parte de Instakash
          </CheckboxComponent>
          <CheckboxComponent name="acceptTerms" className={classes.Checkbox} value={formik.values.acceptTerms} error={formik.errors.acceptTerms} onChange={formik.handleChange}>
            Declaro que he leído y acepto sus <a href="https://instakash.net/politicas-de-privacidad">Términos y condiciones</a> y las{" "}
            <a href="https://instakash.net/terminos-y-condiciones">Políticas de privacidad</a>.
          </CheckboxComponent>
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

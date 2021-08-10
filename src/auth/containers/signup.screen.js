import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Mail } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { signupValidation } from "../helpers/formValidations";
import { signupInit } from "../store/actions";

import { Input } from "../../components/UI/form-items/input.component";
import { InputPhone } from "../../components/UI/form-items/phone-input.component";

import { Button } from "../../components/UI/button.component";
import { CheckboxComponent } from "../../components/UI/form-items/checkbox.component";

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
        <h2>¡Bienvenido a Instakash!</h2>
        <p className="mt-2 mb-4">Registrate y realiza tus operaciones de forma segura desde nuestra plataforma digital.</p>
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            type="email"
            label="Correo eletrónico"
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
            iconEnd={Mail}
          />
          <InputPhone country="pe" value={formik.values.phone} onChange={onPhoneChange} error={formik.errors.phone} />
          <Input
            type="password"
            name="password"
            autoComplete="new-password"
            value={formik.values.password}
            label="Contraseña"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <Input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={formik.values.confirmPassword}
            label="Confirmar contraseña"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />
          <h2 className="text-center mb-2">¿Te ha referido un amigo?</h2>
          <Input
            type="text"
            label="Ingresa el código de afiliado"
            name="affiliate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.affiliate}
            error={formik.errors.affiliate}
            touched={formik.touched.affiliate}
            autoComplete="off"
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
          <Button type="submit" className={`action-button my-3 ld-over ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
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

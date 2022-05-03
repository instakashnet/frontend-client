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
import { CheckboxComponent } from "../../../components/UI/form-items/checkbox.component";
import { Input } from "../../../components/UI/form-items/input.component";
// REDUX ACTIONS
import { signupInit } from "../../../store/actions";
// HELPER
import { signupValidation } from "../helpers/formValidations";
// CLASSES
import sharedClass from "./modules/sharedClasses.module.scss";


const Signup = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);
  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "", affiliate: "", allowPromotionalEmail: false, acceptTerms: false },
    validationSchema: signupValidation,
    onSubmit: (values) => dispatch(signupInit(values)),
  });

  return (
    <main className={`h-full md:h-screen ${sharedClass.AuthBackground}`}>
      <div className={sharedClass.AuthWrapper}>
        <h2>¡Bienvenido a Instakash!</h2>
        <p className="mt-2 mb-4">Regístrate y realiza tus operaciones de forma segura desde nuestra plataforma digital.</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
          <Input
            name="email"
            type="email"
            label="Correo electrónico"
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
            iconEnd={Mail}
          />
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
          <h2 className="text-center mt-5 mb-0">¿Te ha referido un amigo?</h2>
          <Input
            className="mb-3"
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
            value={formik.values.allowPromotionalEmail}
            error={formik.errors.allowPromotionalEmail}
            onChange={formik.handleChange}
          >
            Autorizo recibir noticias y promociones de parte de Instakash.
          </CheckboxComponent>
          <CheckboxComponent
            name="acceptTerms"
            value={formik.values.acceptTerms}
            error={formik.errors.acceptTerms}
            onChange={formik.handleChange}
          >
            Declaro que he leído y acepto sus{" "}
            <a href="https://instakash.net/terminos-y-condiciones" target="_blank" rel="noopener noreferrer">
              Términos y condiciones
            </a>{" "}
            y las{" "}
            <a href="https://instakash.net/politicas-de-privacidad" target="_blank" rel="noopener noreferrer">
              Políticas de privacidad
            </a>
            .
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

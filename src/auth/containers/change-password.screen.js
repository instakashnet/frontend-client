import React from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";

// HELPERS
import { changePasswordValidation } from "../helpers/formValidations";
import { useDeviceDetect } from "../../shared/hooks/useDeviceDetect";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordInit } from "../store/actions";

// COMPONENTS
import { Input } from "../../components/UI/form-items/input.component";
import { Button } from "../../components/UI/button.component";

// STYLES
import classes from "../assets/css/auth.containers.module.scss";

const ChangePassword = (props) => {
  const query = new URLSearchParams(props.location.search),
    linkingUrl = query.get("linkingUrl"),
    token = query.get("t");

  // FOMRIK & REDUx
  const dispatch = useDispatch(),
    { isMobile } = useDeviceDetect(),
    { isProcessing } = useSelector((state) => state.Auth),
    formik = useFormik({
      initialValues: { password: "", confirmPassword: "" },
      validationSchema: changePasswordValidation,
      onSubmit: (values) => dispatch(resetPasswordInit(values, token)),
    });

  if (!token) return <Redirect to="/signin" />;
  if (isMobile) {
    if (linkingUrl && token) return window.location.replace(`${linkingUrl}change-password?t=${token}`);
  }

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      <div className={classes.AuthWrapper}>
        <h2>Ingrese su nueva contraseña</h2>
        <p className="mt-4 mb-6">
          Coloque su nueva contraseña para poder acceder nuevamente. <br /> Te aconsejamos crear una que te sea facil de recordar.
        </p>
        <form onSubmit={formik.handleSubmit}>
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
          <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button mt-3 ld-over ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Cambiar contraseña
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ChangePassword;

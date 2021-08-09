import React from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changePasswordValidation } from "../helpers/formValidations";
import { resetPasswordInit } from "../store/actions";

// import Password from "../components/UI/password-input.component";
import { Button } from "../../components/UI/button.component";

import classes from "../assets/css/auth.containers.module.scss";

const ChangePassword = (props) => {
  const query = new URLSearchParams(props.location.search);
  const token = query.get("t");

  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: changePasswordValidation,
    onSubmit: (values) => dispatch(resetPasswordInit(values, token)),
  });

  if (!token) return <Redirect to="/signin" />;

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      <div className={classes.AuthWrapper}>
        <h1>Ingrese su nueva contraseña</h1>
        <p className="mt-6">
          Coloque su nueva contraseña para poder acceder nuevamente. <br /> Te aconsejamos crear una que te sea facil de recordar.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <Button type="submit" disabled={!formik.isValid || isProcessing} className={`${classes.SubmitButton} ld-ext-right ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Reestablecer contraseña
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ChangePassword;

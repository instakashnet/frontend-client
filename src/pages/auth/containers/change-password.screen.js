// FORMIK
import { useFormik } from "formik";
import React, { useEffect } from "react";
// REDUX
import { useDispatch,useSelector } from "react-redux";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";
import { Input } from "../../../components/UI/form-items/input.component";
// REDUX ACTIONS
import { resetPasswordInit } from "../../../store/actions";
// HELPER TO FORMIK
import { changePasswordValidation } from "../helpers/formValidations";
// CLASSES
import sharedClass from "./modules/sharedClasses.module.scss";

const ChangePassword = ({ history }) => {
  // HOOKS
  const dispatch = useDispatch(),
    { isProcessing, token } = useSelector((state) => state.Auth),
    formik = useFormik({
      initialValues: { password: "", confirmPassword: "" },
      validationSchema: changePasswordValidation,
      onSubmit: (values) => dispatch(resetPasswordInit(values)),
    });

  // EFFECTS
  useEffect(() => {
    if (!token) return history.push("/signin");
  }, [history, token]);

  return (
    <main className={`h-full md:h-screen ${sharedClass.AuthBackground}`}>
      <div className={sharedClass.AuthWrapper}>
        <h2>Ingrese su nueva contraseña</h2>
        <p className="mt-4 mb-6">
          Coloque su nueva contraseña para poder acceder nuevamente. <br /> Te aconsejamos crear una que te sea fácil de recordar.
        </p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
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

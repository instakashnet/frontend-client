import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/UI/button.component";
import { Input } from "../../../../components/UI/form-items/input.component";
import { editUserCodeInit } from "../../../../store/actions";
import { usernameValidation } from "../../helpers/validations";


const EditUserCode = () => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const username = useSelector((state) => state.Auth.user.username);
  const formik = useFormik({
    initialValues: { username },
    enableReinitialize: true,
    validationSchema: usernameValidation,
    onSubmit: (values) => dispatch(editUserCodeInit(values)),
  });

  return (
    <div className="text-center">
      <p>Puedes editar tu código de afiliado para que sea más fácil de compartir y recordar.</p>
      <form onSubmit={formik.handleSubmit} className="mt-6 text-left max-w-sm mx-auto">
        <Input
          name="username"
          label="Código de afiliado"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.username}
          touched={formik.touched.username}
        />

        <Button type="submit" className={`action-button ld-over max-w-xs ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
          <span className="ld ld-ring ld-spin" />
          Editar código
        </Button>
      </form>
    </div>
  );
};

export default React.memo(EditUserCode);

import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { usernameValidation } from "../helpers/validations";
import { editUserCodeInit } from "../../store/actions";

import Input from "../../core/components/UI/form/Input";
import Button from "../../core/components/UI/Button";

const EditUserCode = () => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const username = useSelector((state) => state.Auth.userCode);
  const formik = useFormik({
    initialValues: { username },
    enableReinitialize: true,
    validationSchema: usernameValidation,
    onSubmit: (values) => dispatch(editUserCodeInit(values)),
  });

  return (
    <div className="text-center">
      <h2>Editar código de afiliado</h2>
      <p>Puede editar su código de afiliado para que sea más facil de compartir y recordar.</p>
      <form onSubmit={formik.handleSubmit} className="mt-6 text-left flex flex-col items-center">
        <Input
          name="username"
          placeholder="Código de afiliado"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.username}
          touched={formik.touched.username}
        />

        <Button type="submit" className={`action-button ld-ext-right max-w-xs ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
          <span className="ld ld-ring ld-spin" />
          Editar código
        </Button>
      </form>
    </div>
  );
};

export default React.memo(EditUserCode);

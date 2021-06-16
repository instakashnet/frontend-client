import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addProfileInit } from "../../../store/actions";
import { addProfileValidation } from "../../helpers/validations";

import Input from "../../../core/components/UI/form-items/input.component";
import Checkbox from "../../../core/components/UI/form-items/checkbox.component";
import Button from "../../../core/components/UI/button.component";

const AddProfile = () => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const formik = useFormik({
    initialValues: { type: "juridica", razon_social: "", ruc: "", address: "", accept: false },
    validationSchema: addProfileValidation,
    onSubmit: (values) => dispatch(addProfileInit(values)),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex items-center justify-center flex-col">
      <h2 className="text-center mt-4">Agrega tu perfil de empresa</h2>
      <Input
        type="text"
        name="razon_social"
        label="Ingresa el nombre de tu empresa"
        placeholder="Nombre de la empresa"
        value={formik.values.razon_social}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.razon_social}
        touched={formik.touched.razon_social}
      />
      <Input
        type="text"
        name="ruc"
        placeholder="RUC de la empresa"
        label="Ingresa el RUC de tu empresa"
        value={formik.values.ruc}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.ruc}
        touched={formik.touched.ruc}
      />
      <Input
        type="text"
        name="address"
        placeholder="Dirección fiscal de la empresa"
        label="Ingresa la dirección fiscal de tu empresa"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.address}
        touched={formik.touched.address}
      />
      <Checkbox name="accept" value={formik.values.accept} onChange={formik.handleChange} error={formik.errors.accept}>
        Declaro que soy el representante legal de la empresa.
      </Checkbox>
      <Button type="submit" className={`ld-ext-right action-button ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
        <span className="ld ld-ring ld-spin" />
        Agregar empresa
      </Button>
    </form>
  );
};

export default AddProfile;

import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editProfileValidation } from "../../helpers/validations";
import { editProfileInit } from "../../store/actions";

import Input from "../../../core/components/UI/form-items/input.component";
import Button from "../../../core/components/UI/button.component";

import classes from "../../assets/css/profile-components.module.scss";

const EditCompanyProfile = ({ profile, onCancelEdit }) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const formik = useFormik({
    initialValues: {
      profileId: profile.id,
      type: profile.type,
      razon_social: profile.razon_social,
      address: profile.address,
    },
    validationSchema: editProfileValidation("company"),
    onSubmit: (values) => dispatch(editProfileInit(values, onCancelEdit)),
  });

  return (
    <div className={classes.ProfileInfoWrapper}>
      <h1 className="text-center">Editar perfil</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Input
            label="Razón social"
            name="razon_social"
            placeholder="Ingrese su razón social"
            value={formik.values.razon_social}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.razon_social}
            touched={formik.touched.razon_social}
          />
          <Input
            label="Dirección"
            name="address"
            placeholder="Ingrese su dirección"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.address}
            touched={formik.touched.address}
          />
        </div>

        <div className="flex items-center justify-center mt-12">
          <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button ld-ext-right ${isProcessing ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin" />
            Actualizar datos
          </Button>
          <Button type="button" className="secondary-button" onClick={onCancelEdit}>
            Regresar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCompanyProfile;

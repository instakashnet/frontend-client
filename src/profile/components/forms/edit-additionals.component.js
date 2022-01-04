import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editProfileValidation } from "../../helpers/validations";
import { editProfileInit } from "../../store/actions";

import { Input } from "../../../components/UI/form-items/input.component";
import { DatePickerInput } from "../../../components/UI/form-items/datepicker.component";
import { Button } from "../../../components/UI/button.component";

const EditAdditionalData = ({ user }) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const formik = useFormik({
    initialValues: {
      job: user.job || "",
      profession: user.profession || "",
      date_birth: user.dateBirth,
      address: user.address || "",
    },
    validationSchema: editProfileValidation("personal"),
    onSubmit: (values) => dispatch(editProfileInit(values, onEdit)),
  });

  const onDateChange = (value) => formik.setFieldValue("date_birth", value.toDate());

  return (
    <form onSubmit={formik.handleSubmit}>
      <DatePickerInput placeholder="Fecha de nacimiento" error={formik.errors.date_birth} value={formik.values.date_birth} onChange={onDateChange} />
      <Input
        label="Dirección corta"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.address}
        touched={formik.touched.address}
      />
      <Input
        label="Ocupación"
        name="job"
        value={formik.values.job}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.job}
        touched={formik.touched.job}
      />
      <Input
        label="Profesión"
        name="profession"
        value={formik.values.profession}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.profession}
        touched={formik.touched.profession}
      />
      <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button ld-over ${isProcessing ? "running" : ""}`}>
        <span className="ld ld-ring ld-spin" />
        Actualizar datos
      </Button>
    </form>
  );
};

export default EditAdditionalData;

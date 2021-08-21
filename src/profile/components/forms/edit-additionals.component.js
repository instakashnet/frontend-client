import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editProfileValidation } from "../../helpers/validations";
import { editProfileInit } from "../../store/actions";

import { Input } from "../../../components/UI/form-items/input.component";
import DatePicker from "../../../components/UI/form-items/datepicker.component";
import { Button } from "../../../components/UI/button.component";

const EditAdditionalData = ({ profile, onEdit }) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const formik = useFormik({
    initialValues: {
      profileId: profile.id,
      type: profile.type,
      job: profile.job || "",
      profession: profile.profession || "",
      date_birth: profile.date_birth,
      address: profile.address || "",
    },
    validationSchema: editProfileValidation("personal"),
    onSubmit: (values) => dispatch(editProfileInit(values, onEdit)),
  });

  const onDateChange = (value) => formik.setFieldValue("date_birth", value.toDate());

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-6">
        <DatePicker placeholder="Fecha de nacimiento" error={formik.errors.date_birth} value={formik.values.date_birth} onChange={onDateChange} />
        <Input
          label="Dirección corta"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.address}
          touched={formik.touched.address}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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
      </div>
      <div className="flex flex-col items-center justify-center mt-3">
        <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button ld-ext-right ${isProcessing ? "running" : ""}`}>
          <span className="ld ld-ring ld-spin" />
          Actualizar datos
        </Button>
        <Button type="button" className="secondary-button mt-4" onClick={() => onEdit(false)}>
          Regresar
        </Button>
      </div>
    </form>
  );
};

export default EditAdditionalData;

import React from "react";

// FORMIK
import { useFormik } from "formik";
import { editProfileValidation } from "../../helpers/validations";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { editAdditionalInfo } from "../../../../store/actions";

// COMPONENTS
import { Input } from "../../../../components/UI/form-items/input.component";
import { DatePickerInput } from "../../../../components/UI/form-items/datepicker.component";
import { Button } from "../../../../components/UI/button.component";

export const AddAdditionalInfo = ({ user }) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const formik = useFormik({
    initialValues: {
      type: "natural",
      profileId: user.profileId,
      job: user.job || "",
      profession: user.profession || "",
      date_birth: user.dateBirth,
      address: user.address || "",
    },
    validationSchema: editProfileValidation("personal"),
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editAdditionalInfo(values)),
  });

  const onDateChange = (value) => formik.setFieldValue("date_birth", value.toDate());

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 w-full">
        <DatePickerInput
          placeholder="Fecha de nacimiento"
          error={formik.errors.date_birth}
          value={formik.values.date_birth}
          onChange={onDateChange}
          establishedInfo={false}
        />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 w-full">
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

      <Button type="submit" disabled={!formik.isValid || isProcessing} className={`action-button ld-over ${isProcessing ? "running" : ""}`}>
        <span className="ld ld-ring ld-spin" />
        Actualizar datos
      </Button>
    </form>
  );
};

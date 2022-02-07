import React, { useState } from "react";
import moment from "moment";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { editAdditionalInfo } from "../../../store/actions";

// FORMIK
import { useFormik } from "formik";

// COMPONENTS
import Card from "../../../components/UI/card.component";
import { InfoItem } from "../components/info-item.component";
import { AddAdditionalInfo } from "../components/forms/add-additionals.component";

export const AdditionalInfoScreen = ({ user }) => {
  const [submitted, setSubmitted] = useState(false),
    dispatch = useDispatch(),
    isProcessing = useSelector((state) => state.Profile.isProcessing),
    formik = useFormik({
      initialValues: {
        profileId: user.profileId,
        type: "natural",
        date_birth: user.dateBirth || "",
        address: user.address || "",
        job: user.job || "",
        profession: user.profession || "",
      },
      enableReinitialize: true,
      onSubmit: (values) => dispatch(editAdditionalInfo(values, setSubmitted)),
    });

  const onDateChange = (value) => formik.setFieldValue("date_birth", value.toDate());

  return (
    <Card className="mt-8">
      {!user.dateBirth && !user.address ? (
        <AddAdditionalInfo user={user} />
      ) : (
        <>
          <InfoItem
            label="Fecha de nacimiento"
            item={moment(user.dateBirth).format("DD/MM/YYYY")}
            value={formik.values.date_birth}
            edit
            name="date_birth"
            onSubmit={formik.handleSubmit}
            onChange={onDateChange}
            error={formik.errors.date_birth}
            isProcessing={isProcessing}
            submitted={submitted}
          />
          <InfoItem
            label="Dirección corta"
            name="address"
            onChange={formik.handleChange}
            error={formik.errors.address}
            touched={formik.touched.address}
            item={user.address}
            value={formik.values.address}
            edit
            onSubmit={formik.handleSubmit}
            isProcessing={isProcessing}
            submitted={submitted}
          />
          <InfoItem
            label="Ocupación"
            name="job"
            onChange={formik.handleChange}
            error={formik.errors.job}
            touched={formik.touched.job}
            item={user.job}
            value={formik.values.job}
            edit
            onSubmit={formik.handleSubmit}
            isProcessing={isProcessing}
            submitted={submitted}
          />
          <InfoItem
            label="Profesión"
            name="profession"
            onChange={formik.handleChange}
            error={formik.errors.profession}
            touched={formik.touched.profession}
            item={user.profession}
            value={formik.values.profession}
            edit
            onSubmit={formik.handleSubmit}
            isProcessing={isProcessing}
            submitted={submitted}
          />
        </>
      )}
    </Card>
  );
};

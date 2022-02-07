import React, { useState } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { editBasicInfo } from "../../../store/actions";

// FORMIK
import { useFormik } from "formik";

// COMPONENTS
import Card from "../../../components/UI/card.component";
import { InfoItem } from "../components/info-item.component";

export const BasicInfoScreen = ({ user }) => {
  const [submitted, setSubmitted] = useState(false),
    [editType, setEditType] = useState(""),
    dispatch = useDispatch(),
    isProcessing = useSelector((state) => state.Profile.isProcessing),
    formik = useFormik({
      initialValues: { email: user.email, phone: user.phone },
      enableReinitialize: true,
      onSubmit: (values) => dispatch(editBasicInfo(values, editType, setSubmitted)),
    });

  return (
    <Card className="mt-8">
      <InfoItem label="Nombre(s) y apellido(s)" item={user.name} />
      <InfoItem label="Documento" item={`${user.documentType} ${user.documentIdentification}`} />
      <InfoItem
        label="Correo electrónico"
        value={formik.values.email}
        item={user.email}
        name="email"
        error={formik.errors.email}
        touched={formik.touched.email}
        onChange={formik.handleChange}
        edit
        onSubmit={() => {
          setEditType("email");
          formik.handleSubmit();
        }}
        isProcessing={isProcessing}
        submitted={submitted}
      />
      <InfoItem
        label="Teléfono"
        name="phone"
        item={user.phone}
        value={formik.values.phone}
        error={formik.errors.phone}
        touched={formik.touched.phone}
        onChange={formik.handleChange}
        edit
        onSubmit={() => {
          setEditType("phone");
          formik.handleSubmit();
        }}
        isProcessing={isProcessing}
        submitted={submitted}
      />
    </Card>
  );
};

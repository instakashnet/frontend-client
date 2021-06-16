import React from "react";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { completeProfileValidation } from "../helpers/formValidations";
import { User, FileText } from "react-feather";
import { logoutInit, completeProfileInit, openModal, closeModal } from "../../store/actions";

import Input from "../components/UI/input.component";
import Select from "../components/UI/select.component";
import PhoneInput from "../components/UI/phone-input.component";
import Button from "../../core/components/UI/button.component";

import classes from "../assets/css/auth.containers.module.scss";

const CompleteProfile = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  const formik = useFormik({
    initialValues: { type: "natural", first_name: "", last_name: "", identity_sex: "", phone: "", document_type: "DNI", document_identification: "", affiliate: "" },
    validationSchema: completeProfileValidation(userSession ? userSession.is_google : false),
    onSubmit: (values) => dispatch(completeProfileInit(values)),
  });

  if (!userSession) return <Redirect to="/signin" />;

  const documentOptions = [
    { value: "DNI", label: "DNI" },
    { value: "CE", label: "CE" },
    { value: "PTP", label: "PTP" },
    { value: "pasaporte", label: "Pasaporte" },
  ];

  const sexOptions = [
    { value: "male", label: "Masculino" },
    { value: "female", label: "Femeníno" },
  ];

  const onPhoneChange = (value) => formik.setFieldValue("phone", value);

  const openModalHandler = () => dispatch(openModal(DataInfo));

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      <div className={classes.AuthWrapper}>
        <h1>¡Felicidades, Tu cuenta ha sido creada!</h1>
        <p className="mt-6">Ahora, debes completar todos tus datos</p>
        <form onSubmit={formik.handleSubmit} className="text-center">
          <Input
            name="first_name"
            type="text"
            placeholder="Nombre(s)"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.first_name}
            touched={formik.touched.first_name}
            icon={User}
          />
          <Input
            name="last_name"
            type="text"
            placeholder="Apellido(s)"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.last_name}
            touched={formik.touched.last_name}
            icon={User}
          />
          {userSession.is_google && <PhoneInput value={formik.values.phone} onChange={onPhoneChange} error={formik.errors.phone} country="pe" />}
          <div className="grid grid-cols-3 gap-4">
            <Select name="document_type" options={documentOptions} value={formik.values.document_type} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <Input
              name="document_identification"
              type="text"
              placeholder="Nro. de documento"
              value={formik.values.document_identification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.document_identification}
              touched={formik.touched.document_identification}
              icon={FileText}
              groupClass="col-span-2"
            />
          </div>
          <Select
            name="identity_sex"
            value={formik.values.identity_sex}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.identity_sex}
            touched={formik.touched.identity_sex}
            options={sexOptions}>
            <option value="" defaultValue>
              Selecciona tu sexo
            </option>
          </Select>
          <Button type="submit" className={`action-button ld-ext-right ${isProcessing ? "running" : ""}`} disabled={!formik.isValid || isProcessing}>
            <span className="ld ld-ring ld-spin" />
            Completar mi perfil
          </Button>
        </form>
        <button className={classes.InfoButton} type="button" onClick={() => dispatch(logoutInit())}>
          Acceder con otra cuenta
        </button>
        <div className="flex justify-center">
          <button type="button" className={classes.InfoButton} onClick={openModalHandler}>
            ¿Porque me piden estos datos?
          </button>
        </div>
      </div>
    </main>
  );
};

const DataInfo = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h2>¡Queremos proteger tu identidad!</h2>
      <p className="px-4 mb-6 text-center">
        Al realizar una operación queremos estar seguro que eres tu quien lo realiza. Además, nos ayuda a saber según tu perfil registrado si debemos entregarte boleta o factura.
      </p>
      <Button className="action-button" onClick={() => dispatch(closeModal())}>
        De acuerdo
      </Button>
    </>
  );
};

export default CompleteProfile;

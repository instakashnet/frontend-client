import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { completeProfileValidation } from "../helpers/formValidations";
import { User, FileText } from "react-feather";
import { logoutInit, completeProfileInit, openModal, closeModal } from "../../store/actions";

import Modal from "../../core/components/UI/modals/modal.component";
import Input from "../components/UI/input.component";
import Select from "../components/UI/select.component";
import PhoneInput from "../components/UI/phone-input.component";
import Button from "../../core/components/UI/button.component";
import Spinner from "../../core/components/UI/spinner.component";

import classes from "../assets/css/auth.containers.module.scss";

const CompleteProfile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [invalidDNI, setInvalidDNI] = useState(false);
  const { isProcessing } = useSelector((state) => state.Auth);
  const ModalComponent = useSelector((state) => state.Modal.Component);
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  const formik = useFormik({
    initialValues: { type: "natural", first_name: "", last_name: "", identity_sex: "", phone: "", document_type: "DNI", document_identification: "", affiliate: "" },
    validationSchema: completeProfileValidation(userSession ? userSession.is_google : false),
    onSubmit: (values) => dispatch(completeProfileInit(values)),
  });

  const { setFieldValue } = formik;
  const { document_identification, document_type } = formik.values;

  const documentOptions = [
    { value: "DNI", label: "DNI" },
    { value: "CE", label: "CE" },
    { value: "PTP", label: "PTP" },
    { value: "pasaporte", label: "Pasaporte" },
  ];

  const sexOptions = [
    { value: "male", label: "Masculino" },
    { value: "female", label: "Femeníno" },
    { value: "other", label: "Otro" },
  ];

  useEffect(() => {
    if (document_type === "DNI" && document_identification.length === 8) {
      const validateDocument = async () => {
        setIsLoading(true);

        try {
          const res = await axios.post("https://api.migo.pe/api/v1/dni", { token: process.env.REACT_APP_MIGO_API, dni: document_identification });
          if (res.status === 200) {
            const names = res.data.nombre.split(" ");
            let firstName = names[1];
            let lastName = names[0];

            if (names.length > 2) {
              firstName = `${names[2]} ${names[3]}`;
              lastName = `${names[0]} ${names[1] || ""}`;
            }

            setFieldValue("first_name", firstName);
            setFieldValue("last_name", lastName);
          }
          setInvalidDNI(false);
        } catch (error) {
          setInvalidDNI("El DNI ingresado no puede ser verificado. Por favor verifique sus datos.");
        } finally {
          setIsLoading(false);
        }
      };

      validateDocument();
    } else setInvalidDNI(false);
  }, [document_type, document_identification, setFieldValue]);

  const onPhoneChange = (value) => formik.setFieldValue("phone", value);
  const openModalHandler = () => dispatch(openModal(DataInfo));

  const onDocumentTypeHandler = (e) => {
    const { value } = e.target;
    formik.setFieldValue("document_type", value);
    formik.setFieldValue("document_identification", "");
    formik.setFieldValue("first_name", "");
    formik.setFieldValue("last_name", "");
  };

  const onDocumentIdentificationHandler = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      formik.setFieldValue("document_identification", e.target.value);
    }
  };

  if (!userSession) return <Redirect to="/signin" />;

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      {isLoading && <Spinner />}
      <div className={classes.AuthWrapper}>
        <h1>¡Felicidades, Tu cuenta ha sido creada!</h1>
        <p className="mt-6">Ahora, debes completar todos tus datos</p>
        <form onSubmit={formik.handleSubmit} className="text-center flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 w-full gap-4">
            <Select name="document_type" options={documentOptions} value={formik.values.document_type} onChange={onDocumentTypeHandler} onBlur={onDocumentTypeHandler} />
            <Input
              name="document_identification"
              type="text"
              placeholder="Nro. de documento"
              value={formik.values.document_identification}
              onChange={onDocumentIdentificationHandler}
              onBlur={formik.handleBlur}
              error={formik.errors.document_identification}
              touched={formik.touched.document_identification}
              icon={FileText}
              groupClass="col-span-2"
            />
          </div>
          {invalidDNI && <p className="error-msg">{invalidDNI}</p>}
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
          <Button
            type="submit"
            className={`action-button ld-ext-right mt-3 ${isProcessing ? "running" : ""}`}
            disabled={!formik.isValid || (document_type === "DNI" && invalidDNI) || isProcessing}>
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
      {ModalComponent && (
        <Modal>
          <ModalComponent />
        </Modal>
      )}
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

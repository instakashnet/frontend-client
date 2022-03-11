import React, { useEffect, useState } from "react";
import axios from "axios";

// FORMIK
import { useFormik } from "formik";
import { completeProfileValidation } from "../helpers/formValidations";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { logoutInit, completeProfileInit, openModal, closeModal } from "../../../store/actions";

// HELPERS
import { AllowOnlyNumbers } from "../../../shared/functions";

// COMPONENTS
import { Modal } from "../../../components/UI/modals/modal.component";
import { Input } from "../../../components/UI/form-items/input.component";
import { SelectComponent } from "../../../components/UI/form-items/select.component";
import { InputPhone } from "../../../components/UI/form-items/phone-input.component";
import { Button } from "../../../components/UI/button.component";

// CLASSES
import classes from "../assets/css/auth.containers.module.scss";

const CompleteProfile = ({ history }) => {
  // HOOKS & VARIABLES
  const dispatch = useDispatch(),
    [isLoading, setIsLoading] = useState(false),
    [isGoogle, setIsGoogle] = useState(false),
    [invalidDNI, setInvalidDNI] = useState(null),
    { isProcessing } = useSelector((state) => state.Auth),
    ModalComponent = useSelector((state) => state.Modal.Component),
    formik = useFormik({
      initialValues: { type: "natural", first_name: "", last_name: "", identity_sex: "", phone: "", document_type: "DNI", document_identification: "", affiliate: "" },
      enableReinitialize: true,
      validationSchema: completeProfileValidation,
      onSubmit: (values) => dispatch(completeProfileInit(values)),
    }),
    { setFieldValue } = formik,
    { document_identification, document_type } = formik.values,
    documentOptions = [
      { value: "DNI", label: "DNI" },
      { value: "CE", label: "CE" },
      { value: "PTP", label: "PTP" },
      { value: "pasaporte", label: "Pasaporte" },
    ],
    sexOptions = [
      { value: "male", label: "Masculino" },
      { value: "female", label: "Femenino" },
      { value: "other", label: "Otro" },
    ];

  // EFFECTS
  useEffect(() => {
    const userVerification = sessionStorage.getItem("userVerification");
    if (!JSON.parse(userVerification)) return history.push("/signin");

    const user = JSON.parse(userVerification);

    setIsGoogle(user.isGoogle);
  }, [history]);

  useEffect(() => {
    if (document_type === "DNI" && document_identification.length === 8) {
      const validateDocument = async () => {
        setIsLoading(true);

        try {
          const res = await axios.post("https://api.migo.pe/api/v1/dni", { token: process.env.REACT_APP_MIGO_API, dni: document_identification });
          if (res.status === 200) {
            const names = res.data.nombre.split(" ");
            let firstName = names[1] || "";
            let lastName = names[0] || "";

            if (names.length === 3) {
              firstName = names[2] || "";
              lastName = `${names[0] || ""} ${names[1] || ""}`;
            } else if (names.length > 3) {
              firstName = `${names[2] || ""} ${names[3] || ""}`;
              lastName = `${names[0]} ${names[1] || ""}`;
            }

            setFieldValue("first_name", firstName);
            setFieldValue("last_name", lastName);
            setInvalidDNI(null);
          }
        } catch (error) {
          setInvalidDNI("El DNI ingresado no se ha podido verificar. Por favor revise sus datos.");
        } finally {
          setIsLoading(false);
        }
      };

      validateDocument();
    } else setInvalidDNI(false);
  }, [document_type, document_identification, setFieldValue]);

  // HANDLERS
  const onPhoneChange = (value) => formik.setFieldValue("phone", value),
    openModalHandler = () => dispatch(openModal(DataInfo)),
    onDocumentTypeHandler = (e) => {
      const { value } = e.target;
      setFieldValue("document_type", value);
      setFieldValue("document_identification", "");
      setFieldValue("first_name", "");
      setFieldValue("last_name", "");
    },
    onDocumentChangeHandler = (e) => (AllowOnlyNumbers(e.target.value) ? setFieldValue("document_identification", e.target.value) : null);

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      <div className={classes.AuthWrapper}>
        <h2>¡Felicidades, tu cuenta ha sido creada!</h2>
        <p className="mt-2 mb-8">Por favor, completa tus datos</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
          <div className="grid grid-cols-3 w-full gap-2 items-start">
            <div className="grid place-items-center mt-2">
              <SelectComponent name="document_type" label="Tipo de doc." value={formik.values.document_type} onChange={onDocumentTypeHandler} options={documentOptions} />
            </div>
            <div className="col-span-2">
              <Input
                name="document_identification"
                type="text"
                label="Nro. de documento"
                value={formik.values.document_identification}
                onChange={onDocumentChangeHandler}
                onBlur={formik.handleBlur}
                error={invalidDNI ? invalidDNI : formik.errors.document_identification}
                touched={formik.touched.document_identification}
              />
            </div>
          </div>
          <Input
            name="first_name"
            type="text"
            label="Nombre(s)"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.first_name}
            touched={formik.touched.first_name}
            isLoading={isLoading}
            disabled={isLoading}
          />
          <Input
            name="last_name"
            type="text"
            label="Apellido(s)"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.last_name}
            touched={formik.touched.last_name}
            isLoading={isLoading}
            disabled={isLoading}
          />
          <InputPhone value={formik.values.phone} onChange={onPhoneChange} error={formik.errors.phone} country="pe" />
          <SelectComponent name="identity_sex" label="Sexo" value={formik.values.identity_sex} onChange={formik.handleChange} options={sexOptions} />
          {isGoogle && (
            <>
              <h2 className="text-center mb-2">¿Te ha referido un amigo?</h2>
              <Input
                type="text"
                label="Ingresa el código de afiliado"
                name="affiliate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.affiliate}
                error={formik.errors.affiliate}
                touched={formik.touched.affiliate}
                autoComplete="off"
              />
            </>
          )}

          <div className="flex justify-center mt-6 mb-3">
            <button type="button" className={classes.InfoButton} onClick={openModalHandler}>
              ¿Por qué me piden estos datos?
            </button>
          </div>
          <Button
            type="submit"
            className={`action-button ld-over mt-3 ${isProcessing ? "running" : ""}`}
            disabled={!formik.isValid || (document_type === "DNI" && invalidDNI) || isProcessing}
          >
            <span className="ld ld-ring ld-spin" />
            Completar
          </Button>
        </form>
        <button className="mt-4" type="button" onClick={() => dispatch(logoutInit())}>
          Regresar a inicio de sesión
        </button>
      </div>
      {ModalComponent && (
        <Modal title="¡Queremos proteger tu identidad!">
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

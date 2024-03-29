import * as Yup from "yup";

export const signinValidation = Yup.object().shape({
  email: Yup.string().required("Debes colocar un correo electrónico.").email("Coloca un correo válido."),
  password: Yup.string()
    .required("Debes colocar una contraseña.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/, "Coloca una contraseña válida."),
});

export const signupValidation = Yup.object().shape({
  email: Yup.string().required("Debes colocar un correo electrónico.").email("Coloca un correo válido."),
  password: Yup.string()
    .required("Debes colocar una contraseña")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/, "Debe ser de al menos 6 caracteres, con 1 mayúscula y 1 número."),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir."),
  affiliate: Yup.string()
    .notRequired()
    .matches(/^[a-zA-Z0-9]+$/i, "Código de afiliado inválido."),
  acceptTerms: Yup.boolean().oneOf([true], "Debes aceptar nuestros términos y condiciones."),
});

export const completeProfileValidation = Yup.object().shape({
  first_name: Yup.string().required("Debes colocar un nombre."),
  last_name: Yup.string().required("Debes colocar un apellido."),
  document_type: Yup.string().required("Debes seleccionar un tipo de documento."),
  document_identification: Yup.string()
    .required("Coloca tu nro. de documento")
    .matches(/^[0-9]{8,13}$/, "Número de documento ingresado inválido."),
  phone: Yup.string()
    .required("Debes colocar un teléfono de contacto.")
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]{10,13}$/, "Debes colocar un teléfono válido."),
  affiliate: Yup.string()
    .notRequired()
    .matches(/^[a-zA-Z0-9]+$/i, "Código de afiliado inválido."),
  identity_sex: Yup.string().required("Debes seleccionar una opción."),
});

export const emailValidation = Yup.object().shape({
  email: Yup.string().required("Debes colocar un correo electrónico.").email("Coloca un correo válido."),
});

export const emailValidationSchema = Yup.object().shape({
  otp_1: Yup.string().required("Debes completar el código de validación.").matches(/[0-9]/, "Código de validación inválido."),
  otp_2: Yup.string().required("Debes completar el código de validación.").matches(/[0-9]/, "Código de validación inválido."),
  otp_3: Yup.string().required("Debes completar el código de validación.").matches(/[0-9]/, "Código de validación inválido."),
  otp_4: Yup.string().required("Debes completar el código de validación.").matches(/[0-9]/, "Código de validación inválido."),
});

export const changePasswordValidation = Yup.object().shape({
  password: Yup.string()
    .required("Debes colocar una contraseña")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/, "Debe ser de al menos 6 caracteres, con 1 mayúscula y un 1 número."),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir."),
});

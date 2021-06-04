import * as Yup from "yup";

export const addProfileValidation = Yup.object().shape({
  razon_social: Yup.string().required("Debes ingresa el nombre de tu empresa."),
  ruc: Yup.string()
    .required("Debes ingresa el RUC de tu empresa.")
    .matches(/^[0-9]{10,13}$/, "Ingresa un RUC válido."),
  address: Yup.string().required("Debes colocar la dirección fiscal.").min(12, "Dirección fiscal muy corta."),
  accept: Yup.boolean().oneOf([true], "Debes aceptar que eres el representante legal."),
});

export const editProfileValidation = (type) =>
  type === "personal"
    ? Yup.object().shape({
        job: Yup.string().required("Debes ingresar tu ocupación."),
        profession: Yup.string().required("Debes ingresar tu profesión."),
        date_birth: Yup.date().required("Debes colocar tu fecha de nacimiento."),
        address: Yup.string().required("Debes ingresar tu dirección."),
      })
    : Yup.object().shape({
        razon_social: Yup.string().required("Debes colocar la razón social."),
        address: Yup.string().required("Debes ingresar tu dirección."),
      });

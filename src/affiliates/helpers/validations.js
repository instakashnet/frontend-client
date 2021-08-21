import * as Yup from "yup";

export const usernameValidation = Yup.object().shape({
  username: Yup.string()
    .required("Debes colocar un código de afiliado.")
    .matches(/^[a-z0-9]{8,15}$/i, "Deben ser entre 8 y 15 caracteres. Solo letras y números."),
});

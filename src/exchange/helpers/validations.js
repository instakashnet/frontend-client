import * as Yup from "yup";

export const completeExchangeValidation = (funds, amount, totalSent) =>
  Yup.object().shape({
    account_to_id: Yup.number().required("Debes seleccionar tu cuenta para recibir."),
    bank_id: Yup.number().when("kashApplied", {
      is: "yes",
      then: totalSent <= 0 ? Yup.number().notRequired() : Yup.number().required("Debes seleccionar el banco donde transferirás."),
      otherwise: Yup.number().required("Debes seleccionar el banco donde transferirás."),
    }),
    funds_origin: funds ? Yup.string().required("Deles seleccionar una opción.") : Yup.string().notRequired(),
    funds_text: Yup.string().when("funds_origin", {
      is: "otros",
      then: Yup.string().required("debes escribir el origen de tus fondos.").max(60, "Máximo 60 caracteres."),
      otherwise: Yup.string().notRequired(),
    }),
    kashUsed: Yup.number().when("kashApplied", {
      is: "yes",
      then: Yup.number().required("Debes ingresar los kash a retirar.").max(amount, `No puedes retirar más de tu disponible.`),
      otherwise: Yup.number().notRequired(),
    }),
  });

export const transferCodeValidation = Yup.object().shape({
  transaction_code: Yup.string()
    .required("Debes ingresar el nro. de tu transferencia.")
    .matches(/^[0-9]{6,9}$/, "El nro. que intentas ingresar es inválido. Verifica que no tengas espacios y solo sean números."),
});

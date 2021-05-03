import * as Yup from 'yup';

export const completeExchangeValidation = (funds, useKash, amount) =>
  Yup.object().shape({
    account_to_id: Yup.number().required('Debes seleccionar tu cuenta para recibir.'),
    bank_id: Yup.number().required('Debes seleccionar el banco donde transferirás.'),
    funds_origin: funds ? Yup.string().required('Deles seleccionar una opción.') : Yup.string().notRequired(),
    kashUsed: useKash
      ? Yup.number().required('Debes ingresar los kash a usar.').max(amount, `No puedes usar más de la cantidad que posees. (${amount} kash).`)
      : Yup.number().notRequired(),
  });

export const transferCodeValidation = Yup.object().shape({
  transaction_code: Yup.string()
    .required('Debes ingresar el nro. de tu transferencia')
    .matches(/^[0-9]{5,11}$/, 'El nro. que intentas ingresar es inválido.'),
});

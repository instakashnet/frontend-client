import * as Yup from 'yup';

export const transactionCodeValidation = Yup.object().shape({
  transaction_code: Yup.string()
    .required('Debes colocar el nro. de transferencia.')
    .matches(/^[0-9]{5,12}$/, 'Código de transferencia inválido.'),
});

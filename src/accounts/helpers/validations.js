import * as Yup from 'yup';

export const addAccountValidation = Yup.object().shape({
  account_number: Yup.string()
    .required('Debes ingresar tu número de cuenta.')
    .matches(/^[0-9]{13,14}$/, 'Número de cuenta inválido. Verifica los datos.'),
  bankId: Yup.number().required('Debes seleccionar un banco.'),
  currencyId: Yup.string().required('Debes seleccionar una moneda.'),
  alias: Yup.string().required('Debes ingresar un alias.').max(40, 'No deben ser más de 40 caracteres.'),
  acc_type: Yup.string().required('Debes seleccionar un tipo de cuenta.'),
});

export const editAccountValidation = Yup.object().shape({
  account_number: Yup.string()
    .required('Debes ingresar tu número de cuenta.')
    .matches(/^[0-9]{13,14}$/, 'Número de cuenta inválido. Verifica los datos.'),
  alias: Yup.string().required('Debes ingresar un alias.').max(40, 'No deben ser más de 40 caracteres.'),
});

export const kashWithdrawalValidation = (amount) =>
  Yup.object().shape({
    kashQty: Yup.number().required('Debes colocar la cantidad a retirar').max(amount, `No puedes retirar más de la cantidad que posees. (${amount} kash).`),
    accountId: Yup.number().required('Debes seleccionar la cuenta donde recibirás.'),
  });

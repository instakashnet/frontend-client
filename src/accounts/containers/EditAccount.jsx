import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { editAccountInit } from '../../store/actions';
import { editAccountValidation } from '../helpers/validations';

import Input from '../../core/components/UI/form/Input';
import Button from '../../core/components/UI/Button';

const EditAccount = ({ account, cancelEdit, setEdit }) => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Accounts);
  const formik = useFormik({
    initialValues: { account_number: account.account_number, cci: '', alias: account.alias },
    validationSchema: editAccountValidation,
    onSubmit: (values) => dispatch(editAccountInit(account.id, values, setEdit)),
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <Input
          name='account_number'
          label='Número de cuenta'
          value={formik.values.account_number}
          error={formik.errors.account_number}
          touched={formik.touched.account_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Ingrese su número de cuenta'
        />
        <Input
          name='alias'
          label='Alias de la cuenta'
          value={formik.values.alias}
          error={formik.errors.alias}
          touched={formik.touched.alias}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Ingresa un alias'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5'>
          <Button type='submit' disabled={!formik.isValid || isProcessing} className={`action-button ld-ext-right ${isProcessing ? 'running' : ''}`}>
            <span className='ld ld-ring ld-spin' />
            Editar cuenta
          </Button>
          <Button className='secondary-button' type='button' onClick={cancelEdit}>
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
};

export default React.memo(EditAccount);

import React from 'react';
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changePasswordValidation } from '../helpers/formValidations';
import { resetPasswordInit } from '../store/actions';

import Password from '../components/UI/Password';
import Button from '../../core/components/UI/Button';

import classes from './Auth.module.scss';

const ChangePassword = (props) => {
  const query = new URLSearchParams(props.location.search);
  const token = query.get('t');

  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);
  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: changePasswordValidation,
    onSubmit: (values) => dispatch(resetPasswordInit(values, token)),
  });

  if (!token) return <Redirect to='/signin' />;

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      <div className={classes.AuthWrapper}>
        <h1>Ingrese su nueva contraseña</h1>
        <p className='mt-6'>
          Coloque su nueva contraseña para poder acceder nuevamente. <br /> Te aconsejamos crear una que te sea facil de recordar.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <Password
            name='password'
            placeholder='Nueva contraseña'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <Password
            name='confirmPassword'
            placeholder='Confirmar contraseña'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />
          <Button type='submit' disabled={!formik.isValid || isProcessing} className={`${classes.SubmitButton} ld-ext-right ${isProcessing ? 'running' : ''}`}>
            <span className='ld ld-ring ld-spin' />
            Reestablecer contraseña
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ChangePassword;

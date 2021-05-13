import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { editProfileValidation } from '../helpers/validations';
import { editProfileInit } from '../store/actions';

import Input from '../../core/components/UI/form/Input';
import DatePicker from '../../core/components/UI/form/Datepicker';
import Button from '../../core/components/UI/Button';
import Switch from '../../core/components/UI/form/Switch';

import classes from './Profile.module.scss';

const EditPersonalProfile = ({ profile, onCancelEdit }) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const formik = useFormik({
    initialValues: {
      profileId: profile.id,
      type: profile.type,
      job: profile.job || '',
      profession: profile.profession || '',
      pep: !!+profile.pep || false,
      date_birth: profile.date_birth,
      address: profile.address || '',
    },
    validationSchema: editProfileValidation('personal'),
    onSubmit: (values) => dispatch(editProfileInit(values, onCancelEdit)),
  });

  const onDateChange = (value) => formik.setFieldValue('date_birth', value.toDate());
  const onPepChange = () => formik.setFieldValue('pep', !formik.values.pep);

  return (
    <div className={classes.ProfileInfoWrapper}>
      <h1 className='text-center'>Editar perfil</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-6'>
          <Input
            label='Ocupación'
            name='job'
            placeholder='Ingrese su ocupación'
            value={formik.values.job}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.job}
            touched={formik.touched.job}
          />
          <Input
            label='Profesión'
            name='profession'
            placeholder='Ingrese su profesión'
            value={formik.values.profession}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.profession}
            touched={formik.touched.profession}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-6'>
          <Input
            label='Dirección'
            name='address'
            placeholder='Ingrese su dirección'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.address}
            touched={formik.touched.address}
          />
          <DatePicker label='Fecha de nacimiento' placeholder='DD/MM/YYYY' value={formik.values.date_birth} onChange={onDateChange} />
        </div>
        <Switch label='PEP' name='pep' placeholder='¿Eres una persona políticamente expuesta?' value={formik.values.pep} onChange={onPepChange} />
        <div className='flex items-center justify-center mt-12'>
          <Button type='button' onClick={onCancelEdit}>
            Regresar
          </Button>
          <Button type='submit' disabled={!formik.isValid || isProcessing} className={`ld-ext-right ${isProcessing ? 'running' : ''}`}>
            <span className='ld ld-ring ld-spin' />
            Actualizar datos
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPersonalProfile;

import React from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { completeProfileValidation } from '../helpers/formValidations';
import { User, FileText } from 'react-feather';
import { logoutInit, completeProfileInit, openModal, closeModal } from '../../store/actions';

import Input from '../components/UI/Input';
import CodeInput from '../../core/components/UI/form/Input';
import Select from '../components/UI/Select';
import PhoneInput from '../components/UI/PhoneInput';
import Button from '../../core/components/UI/Button';
import Modal from '../../core/components/UI/Modal';

import classes from './Auth.module.scss';

const CompleteProfile = () => {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.Auth);
  const userSession = JSON.parse(localStorage.getItem('userSession'));

  const formik = useFormik({
    initialValues: { type: 'natural', first_name: '', last_name: '', identity_sex: '', phone: '', document_type: 'DNI', document_identification: '', affiliate: '' },
    validationSchema: completeProfileValidation(userSession ? userSession.is_google : false),
    onSubmit: (values) => dispatch(completeProfileInit(values)),
  });

  if (!userSession) return <Redirect to='/signin' />;

  const documentOptions = [
    { value: 'DNI', label: 'DNI' },
    { value: 'CE', label: 'CE' },
    { value: 'PTP', label: 'PTP' },
    { value: 'pasaporte', label: 'Pasaporte' },
  ];

  const sexOptions = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Femeníno' },
  ];

  const onPhoneChange = (value) => formik.setFieldValue('phone', value);

  const openModalHandler = () => dispatch(openModal());
  const closeModalHandler = () => dispatch(closeModal());

  return (
    <main className={`h-full md:h-screen ${classes.SignupBackground}`}>
      <div className={classes.AuthWrapper}>
        <h1>¡Felicidades, Tu cuenta ha sido creada!</h1>
        <p className='mt-6'>Ahora, debes completar todos tus datos</p>
        <form onSubmit={formik.handleSubmit} className='text-center'>
          <Input
            name='first_name'
            type='text'
            placeholder='Nombre(s)'
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.first_name}
            touched={formik.touched.first_name}
            icon={User}
          />
          <Input
            name='last_name'
            type='text'
            placeholder='Apellido(s)'
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.last_name}
            touched={formik.touched.last_name}
            icon={User}
          />
          {userSession.is_google && <PhoneInput value={formik.values.phone} onChange={onPhoneChange} error={formik.errors.phone} country='pe' />}
          <div className='grid grid-cols-3 gap-4'>
            <Select name='document_type' options={documentOptions} value={formik.values.document_type} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <Input
              name='document_identification'
              type='text'
              placeholder='Nro. de documento'
              value={formik.values.document_identification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.document_identification}
              touched={formik.touched.document_identification}
              icon={FileText}
              groupClass='col-span-2'
            />
          </div>
          <Select
            name='identity_sex'
            value={formik.values.identity_sex}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.identity_sex}
            touched={formik.touched.identity_sex}
            options={sexOptions}>
            <option value='' defaultValue>
              Selecciona tu sexo
            </option>
          </Select>
          <h4 className='text-center mb-2'>¿Te ha referido un amigo?</h4>
          <p className='text-sm text-center'>¡Ingresa su código y recibe una tasa preferencial!</p>
          <CodeInput
            name='affiliate'
            placeholder='Ingresa el código de afiliado aquí'
            value={formik.values.affiliate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.affiliate}
            touched={formik.touched.affiliate}
          />
          <Button type='submit' className={`${classes.SubmitButton} ld-ext-right ${isProcessing ? 'running' : ''}`} disabled={!formik.isValid || isProcessing}>
            <span className='ld ld-ring ld-spin' />
            Completar mi perfil
          </Button>
        </form>
        <button className={classes.InfoButton} type='button' onClick={() => dispatch(logoutInit())}>
          Acceder con otra cuenta
        </button>
        <div className='flex justify-center'>
          <button type='button' className={classes.InfoButton} onClick={openModalHandler}>
            ¿Porque me piden estos datos?
          </button>
        </div>
      </div>
      <Modal closeModal={closeModalHandler}>
        <h2>¡Lo hacemos todo por su seguridad!</h2>
        <p className='px-4 mb-6 text-center'>
          Al realizar una operación, la creación del perfil nos ayuda a mejorar la seguridad y validación de nuestros usuarios. Así como saber si requieres una boleta (persona
          natural) o una factura (persona jurídica).
        </p>
        <Button className={classes.SubmitButton} onClick={closeModalHandler}>
          Lo entiendo
        </Button>
      </Modal>
    </main>
  );
};

export default CompleteProfile;

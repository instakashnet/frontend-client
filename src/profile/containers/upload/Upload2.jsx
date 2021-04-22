import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../../store/actions';
import { uploadDocumentInit } from '../../../store/actions';

import UploadInput from '../../../core/components/UI/form/UploadInput';
import Button from '../../../core/components/UI/Button';
import DNI from '../../images/dni-trasera.svg';

import classes from './UploadDocument.module.scss';

const Upload2 = () => {
  const dispatch = useDispatch();
  const isProcessing = useSelector((state) => state.Profile.isProcessing);
  const formik = useFormik({ initialValues: { identity_photo_two: '' }, onSubmit: (values) => dispatch(uploadDocumentInit(values, 'trasera')) });

  const onFileChange = (e) => formik.setFieldValue('identity_photo_two', e.currentTarget.files[0]);

  return (
    <div className={classes.UploadDocument}>
      <h2>Sube la foto trasera de tu documento</h2>
      <p>Foto 2 de 2</p>
      <div className='flex flex-wrap md:flex-nowrap items-end justify-center mt-4 mb-12'>
        <img src={DNI} alt='dni-sample' />
        <div className='text-left mt-6 md:mt-0 md:ml-10'>
          <h4>Toma en cuenta:</h4>
          <ul>
            <li>Sube una imagen a color de la parte frontal.</li>
            <li>Solo se aceptan los formatos JPG/PNG.</li>
            <li>La imágen debe ser de un peso máximo de 2MB.</li>
          </ul>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <UploadInput name='identity_photo_two' value={formik.values.identity_photo_two} onChange={onFileChange} />
        <div className='flex flex-col items-center'>
          <Button type='submit' disabled={!formik.values.identity_photo_two || isProcessing} className={`ld-ext-right ${isProcessing ? 'runnning' : ''}`}>
            <span className='ld ld-ring ld-spin' />
            Guardar foto
          </Button>
          <Button type='button' onClick={() => dispatch(closeModal())}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Upload2;

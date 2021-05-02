import React from 'react';
import { Edit } from 'react-feather';
import moment from 'moment';

import classes from './Details.module.scss';

const PersonalDetails = ({ profile, user, onEdit }) => (
  <>
    <h3 className='mt-10'>Datos básicos</h3>
    <hr />
    <div className='flex items-center justify-between mt-4'>
      <div>
        <h4>Nombre completo</h4>
        <p>{`${profile.first_name} ${profile.last_name}`}</p>
      </div>
      <div className='text-right'>
        <h4>Documento de identidad</h4>
        <p>{`${profile.document_type} ${profile.document_identification}`}</p>
      </div>
    </div>
    <div className='flex items-center justify-between mt-4'>
      <div>
        <h4>Teléfono</h4>
        <p>{user.phone}</p>
      </div>
      <div className='text-right'>
        <h4>Correo electrónico</h4>
        <p>{user.email}</p>
      </div>
    </div>
    <div className='flex items-center justify-between mt-8'>
      <h3>Datos adicionales</h3>
      <button className='flex items-center' type='button' onClick={() => onEdit('personal')}>
        {!profile.address || !profile.date_birth ? 'Completar perfil' : 'Editar datos'} <Edit className='ml-2' size={20} />
      </button>
    </div>
    <hr />
    {!profile.address || !profile.date_birth ? (
      <p className={classes.NoDetails}>Debes completar tus datos del perfil</p>
    ) : (
      <>
        <div className='flex items-center justify-between mt-4'>
          <div>
            <h4>Ocupación</h4>
            <p>{profile.job}</p>
          </div>
          <div className='text-right'>
            <h4>Profesión</h4>
            <p>{profile.profession}</p>
          </div>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div>
            <h4>Dirección</h4>
            <p>{profile.address}</p>
          </div>
          <div className='text-right'>
            <h4>Fecha de nacimiento</h4>
            <p>{moment(profile.date_birth).format('DD/MM/YYYY')}</p>
          </div>
        </div>
      </>
    )}
  </>
);

export default PersonalDetails;

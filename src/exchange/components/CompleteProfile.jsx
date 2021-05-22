import React from 'react';

import Button from '../../core/components/UI/Button';

import classes from '../containers/Exchange.module.scss';

const CompleteProfile = ({ onClose }) => {
  return (
    <div className={classes.CompleteProfile}>
      <h2 className='text-center'>Completa tu perfil</h2>
      <p>
        Para realizar operaciones mayores a <b>$ 5,000</b> o <b>S/. 15,000</b> deberás:
      </p>
      <ul className='my-3'>
        <li>
          Completar tu <b>información de perfil</b> al 100%.
        </li>
        <li>
          Cargar ambas fotos de tu <b>documento de identidad</b>.
        </li>
      </ul>
      <p className='text-center'>
        Haz click en <b>completar mi perfil</b> para agregar tus datos.
      </p>

      <Button type='button' className='action-button' onClick={onClose}>
        Completar mi perfil
      </Button>
    </div>
  );
};

export default CompleteProfile;

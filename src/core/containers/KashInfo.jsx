import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeModal } from '../../store/actions';

import Button from '../components/UI/Button';

import classes from './CoreContainers.module.scss';

const KashInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const closeModalHandler = () => dispatch(closeModal());

  return (
    <div className={classes.KashInfo}>
      <h2 className='text-center'>¡GANA 1 KASH por cada referído!</h2>
      <ul>
        <li>Comparte tu código con tus amigos y conocidos.</li>
        <li>Cada amigo registrado con tu código obtendrá una tasa preferencial en su primer cambio.</li>
        <li>
          Una vez tu amigo complete su primer cambio tu ganarás <b>1 KASH</b> reflejado en tu cuenta{' '}
          <button
            onClick={() => {
              closeModalHandler();
              history.push('/my-accounts');
            }}>
            que puedes ver aquí.
          </button>
        </li>
        <li>
          No hay límites, mientras más compartas tu código podrás acumular más <b>KASH</b>.
        </li>
      </ul>
      <p className={classes.KashPrice}>1 KASH equivale a $ 1 USD</p>
      <p>
        Puedes retirar tus <b>KASH</b> en tus cambios de divisas adicionandolos a tu monto a recibir, o retiralos direactamente a una de tus cuentas en dólares.
      </p>
      <p className='mt-4'>
        Para mayor información te invitamos a leer nuestros <a href='https://instakash.net/terminos-y-condiciones'>términos y condiciones</a> en la sección <b>KASH</b>.
      </p>
      <Button onClick={closeModalHandler} className='action-button mt-3'>
        ¡Lo entiendo!
      </Button>
    </div>
  );
};

export default React.memo(KashInfo);

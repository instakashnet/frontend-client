import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/actions';

import Button from '../../core/components/UI/Button';

const KashInfo = () => {
  const dispatch = useDispatch();

  const closeModalHandler = () => dispatch(closeModal());

  return (
    <div className='text-center'>
      <h2>Beneficios de promocionar tu código</h2>
      <ul>
        <li>Ganarás dinero por cada usuario que se registre y haga un cambio.</li>
        <li>El nuevo usuario también gana un descuento en su primer cambio.</li>
      </ul>
      <p>
        Si se registran 100 personas con tu código y generan un cambio de divisas con Instakash, ¡estarías ganando 100$ que puedes retirar en cualquiera de nuestros bancos
        afiliados!
      </p>
      <Button onClick={closeModalHandler} className='action-button mt-3'>
        ¡Lo entiendo!
      </Button>
    </div>
  );
};

export default React.memo(KashInfo);

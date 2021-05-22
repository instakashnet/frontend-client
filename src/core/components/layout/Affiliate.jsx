import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/actions';

import Card from '../UI/Card';
import CopyButton from '../UI/CopyButton';
import KashInfo from '../../containers/KashInfo';

import AffiliateImg from '../../assets/images/affiliate.svg';
import classes from './Affiliate.module.scss';

const Affiliate = ({ usercode }) => {
  const dispatch = useDispatch();

  return (
    <Card className={classes.AffiliateCard}>
      <img src={AffiliateImg} alt='affiliate' />
      <h3>¡Comparte y gana!</h3>
      <div className={classes.Code}>
        <span>{usercode}</span>
      </div>
      <p className={classes.Copy}>
        Copiar código <CopyButton textToCopy={usercode} />
      </p>
      <p>
        ¡Comparte el código con tus amigos! <br />{' '}
        <button className='mt-1' onClick={() => dispatch(openModal(KashInfo))}>
          Conoce más
        </button>
      </p>
    </Card>
  );
};

export default React.memo(Affiliate);

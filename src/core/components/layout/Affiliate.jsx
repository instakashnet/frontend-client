import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../UI/Card';
import CopyButton from '../UI/CopyButton';

import AffiliateImg from '../../assets/images/affiliate.svg';
import classes from './Affiliate.module.scss';

const Affiliate = ({ usercode }) => {
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
        ¡Comparte el código con tus amigos!. <Link to='/my-profile'>Conoce más</Link>
      </p>
    </Card>
  );
};

export default Affiliate;

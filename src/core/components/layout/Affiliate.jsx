import React from 'react';

import Card from '../UI/Card';
import UserCode from '../../../affiliate/components/UserCode';

import KashImg from '../../../core/assets/images/kash.svg';
import classes from './Affiliate.module.scss';

const Affiliate = ({ usercode }) => {
  return (
    <Card className={classes.AffiliateCard}>
      <img src={KashImg} alt='affiliate' />
      <h3>¡Comparte y gana!</h3>
      <UserCode userCode={usercode} />
      <p>
        <b>¡Comparte el código con tus amigos!</b>
      </p>
    </Card>
  );
};

export default React.memo(Affiliate);

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNav, openSliderModal } from '../../../store/actions';

import Whatsapp from '../UI/Whatsapp';
import ProfileInfo from '../UI/ProfileInfo';

import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.Profile);
  const profileSelected = JSON.parse(sessionStorage.getItem('profileSelected'));

  const openNav = () => dispatch(openSliderModal('profile'));

  return (
    <div className={classes.Header}>
      <button onClick={() => dispatch(toggleNav())} className={classes.NavButton}>
        <span />
        <span />
        <span />
      </button>
      <div className={classes.Hours}>
        <p>Lunes a Viernes: 9am a 7pm</p>
        <p>Sábados y feriados: 9am a 3pm</p>
      </div>
      <div className='flex items-center ml-auto'>
        <a href='https://wa.me/51929324006?text=Hola%20Instakash,%20deseo%20informacion' target='_blank' rel='noopener noreferrer'>
          <Whatsapp />
        </a>
        <ProfileInfo main={profiles.find((profile) => profile.type === 'natural')} openNav={openNav} selected={profileSelected} />
      </div>
    </div>
  );
};

export default React.memo(Header);

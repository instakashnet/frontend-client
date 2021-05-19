import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { toggleNav } from '../../../store/actions';

import Logo from '../UI/Logo';
import Navigation from './navigation/NavItems';
import Backdrop from '../UI/Backdrop';
import Affiliate from './Affiliate';

import classes from './Sidebar.module.scss';

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const opened = useSelector((state) => state.Nav.opened);
  const usercode = useSelector((state) => state.Auth.userCode);

  useEffect(() => {
    if (opened) dispatch(toggleNav());
    // eslint-disable-next-line
  }, [location, dispatch]);

  useEffect(() => {
    if (opened) document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, [opened]);

  return (
    <>
      <div className={`${classes.Sidebar} ${opened ? classes.Open : ''}`}>
        <Logo className='lg:w-52 md:w-44 w-40 mt-5' />
        <Navigation />
        <Affiliate usercode={usercode} />
      </div>
      {isMobile && <Backdrop opened={opened} onClick={() => dispatch(toggleNav())} />}
    </>
  );
};

export default React.memo(Sidebar);

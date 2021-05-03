import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutInit } from '../../../../store/actions';

import NavItem from './NavItem';
import ProgressBar from '../../UI/ProgressBar';

import Male from '../../../assets/images/profiles/male.svg';
import Female from '../../../assets/images/profiles/female.svg';
import Company from '../../../assets/images/profiles/company.svg';
import Profile from '../../../assets/images/icons/avatar.svg';
import ChangeProfile from '../../../assets/images/icons/profiles.svg';
import Logout from '../../../assets/images/icons/logout.svg';

import classes from './Navigation.module.scss';

const ProfileNavigation = () => {
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.Profile);
  const profileSelected = JSON.parse(sessionStorage.getItem('profileSelected'));
  const userProfile = profiles.find((profile) => profile.type === 'natural');
  const profile = {
    ...profileSelected,
    first_name: userProfile.first_name,
    last_name: userProfile.last_name,
    document_type: userProfile.document_type,
    document_identification: userProfile.document_identification,
    identity_photo: userProfile.identity_photo,
    identity_photo_two: userProfile.identity_photo_two,
  };

  let Avatar;
  let profileName;
  let profileType;
  let width = 0;

  if (!profileSelected && userProfile) {
    Avatar = userProfile.identity_sex === 'male' ? Male : Female;
    profileName = `${userProfile.first_name} ${userProfile.last_name}`;
    profileType = 'Usuario';
  }
  if (profileSelected) {
    if (profileSelected.type === 'juridica') {
      Avatar = Company;
      profileName = profileSelected.razon_social;
      profileType = 'Empresa';
    } else {
      Avatar = profileSelected.identity_sex === 'male' ? Male : Female;
      profileName = `${profileSelected.first_name} ${profileSelected.last_name}`;
      profileType = 'Usuario';
    }

    if (!profile.address && !profile.identity_photo) width = 33;
    if ((!profile.address && profile.identity_photo) || (profile.address && !profile.identity_photo)) width = 66;
    if (profile.address && profile.identity_photo && !profile.identity_photo_two) width = 88;
    if (profile.address && profile.identity_photo && profile.identity_photo_two) width = 100;
  }

  return (
    <div className={classes.ProfileNavigation}>
      <div className={classes.ProfileInfo}>
        <div className={classes.ProfileImg}>
          <img src={Avatar} alt='profile' />
        </div>
        <div className='text-left flex flex-col items-start'>
          <h3>{profileName}</h3>
          <p>{profileType}</p>
        </div>
      </div>
      {profileSelected && (
        <div className={classes.ProfileProgress}>
          <h3>Progreso de tu perfil</h3>
          <ProgressBar width={width} />
          <p>{width}% completado</p>
        </div>
      )}
      <nav className='w-full mt-8'>
        <ul>
          {profileSelected && <NavItem label='Ver perfil' icon={Profile} link='/my-profile' />}
          <NavItem label='Cambiar perfil' icon={ChangeProfile} link='/profile-selection' />
          <li>
            <button className='flex items-center' onClick={() => dispatch(logoutInit())}>
              <img src={Logout} alt='cerrar-sesión' width={20} className='mr-3' />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileNavigation;

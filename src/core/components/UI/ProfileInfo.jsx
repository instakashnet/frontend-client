import React from 'react';

import Male from '../../assets/images/profiles/male.svg';
import Female from '../../assets/images/profiles/female.svg';
import Company from '../../assets/images/profiles/company.svg';
import Arrow from '../../assets/images/icons/arrow.svg';

import classes from './ProfileInfo.module.scss';

const ProfileInfo = ({ main, selected, openNav }) => {
  let Avatar;
  let profileName;

  if (!selected && main) {
    Avatar = main.identity_sex === 'male' ? Male : Female;
    profileName = `${main.first_name} ${main.last_name}`;
  }
  if (selected) {
    if (selected.type === 'juridica') {
      Avatar = Company;
      profileName = selected.razon_social;
    } else {
      Avatar = selected.identity_sex === 'male' ? Male : Female;
      profileName = `${selected.first_name} ${selected.last_name}`;
    }
  }

  return (
    <div className='flex items-center ml-4 md:ml-6'>
      <div className={classes.ProfilePhoto}>{Avatar && <img src={Avatar} alt='profile' />}</div>
      <div className={classes.ProfileInfo}>
        <p className='font-bold'>Hola</p>
        <p>{profileName}</p>
      </div>
      <button onClick={openNav} className='p-2 ml-2 md:ml-4 outline-none'>
        <img src={Arrow} alt='arrow-down' className='w-4' />
      </button>
    </div>
  );
};

export default ProfileInfo;

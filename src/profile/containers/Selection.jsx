import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfileInit, openModal } from '../../store/actions';

import Layout from '../../core/components/layout/Layout';
import ProfileBox from '../components/SelectionBox';
import Spinner from '../../core/components/UI/Spinner';
import AddProfile from './AddProfile';

import classes from './Profile.module.scss';

const Selection = () => {
  const dispatch = useDispatch();
  const { isLoading, profiles } = useSelector((state) => state.Profile);

  const addProfileHandler = () => dispatch(openModal());

  return (
    <Layout ModalComponent={() => <AddProfile />}>
      {isLoading && (
        <div className='flex items-center justify-center'>
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className={classes.ProfileWrapper}>
          <h1>¡Nos alegra que estés aqui!</h1>
          <h3>Elije el perfil que usarás hoy</h3>
          <div className='flex items-center flex-wrap justify-center mt-10'>
            {profiles.map((profile) => (
              <ProfileBox
                onClick={() => dispatch(selectProfileInit(profile.id))}
                key={profile.id}
                type={profile.type}
                sex={profile.identity_sex}
                name={profile.type === 'natural' ? `${profile.first_name} ${profile.last_name}` : profile.razon_social}
              />
            ))}
            {profiles.length < 4 && <ProfileBox onClick={addProfileHandler} type='add' name='Agregar perfil' />}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Selection;

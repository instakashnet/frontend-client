import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfileInit, openModal } from '../../store/actions';
import { AlertTriangle } from 'react-feather';

import Layout from '../../core/components/layout/Layout';
import ProfileBox from '../components/SelectionBox';
import Spinner from '../../core/components/UI/Spinner';
import AddProfile from './AddProfile';

import classes from './Profile.module.scss';

const Selection = () => {
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, profiles } = useSelector((state) => state.Profile);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setModalType('info');
  //     dispatch(openModal());
  //   }, 600);
  //   return () => clearTimeout(timeout);
  // }, [dispatch]);

  const addProfileHandler = () => {
    setModalType('profile');
    dispatch(openModal());
  };

  let ModalComponent;

  if (modalType === 'profile') ModalComponent = () => <AddProfile />;
  if (modalType === 'info') ModalComponent = () => <InfoModal />;

  return (
    <Layout ModalComponent={ModalComponent}>
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

export const InfoModal = () => (
  <div className='flex flex-col items-center justify-center text-center'>
    <AlertTriangle size={70} className='error-msg mb-4' />
    <h2>Estimado usuario</h2>
    <p>
      Le informamos que en estos momentos la plataforma para empresas de <b>Interbank</b> está caida en su totalidad y no se pueden realizar transferencias. Hemos hablado con el
      banco y están trabajando para solucionarlo. <br /> Agradecemos su comprensión.
    </p>
  </div>
);

export default Selection;

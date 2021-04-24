import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBanksInit, getCurenciesInit, getAccountsInit, getKashAccountInit, openModal, closeModal } from '../../store/actions';

import Layout from '../../core/components/layout/Layout';
import AddAccount from '../../accounts/containers/AddAccount';
import Calculator from './Calculator';
import Accounts from './Accounts';
import Information from '../components/Information';
import Complete from './Complete';
import Button from '../../core/components/UI/Button';

import classes from './Exchange.module.scss';

const Exchange = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [modalType, setModalType] = useState(null);
  const profileSelected = JSON.parse(sessionStorage.getItem('profileSelected'));
  const order = useSelector((state) => state.Exchange.order);
  const profiles = useSelector((state) => state.Profile.profiles);
  const naturalProfile = profiles.find((profile) => profile.type === 'natural');
  const profile = {
    ...profileSelected,
    first_name: naturalProfile.first_name,
    last_name: naturalProfile.last_name,
    document_type: naturalProfile.document_type,
    document_identification: naturalProfile.document_identification,
    identity_photo: naturalProfile.identity_photo,
    identity_photo_two: naturalProfile.identity_photo_two,
  };

  useEffect(() => {
    dispatch(getBanksInit());
    dispatch(getCurenciesInit());
    dispatch(getAccountsInit('orders'));
    dispatch(getKashAccountInit());
  }, [dispatch]);

  useEffect(() => {
    if (step > 0) {
      window.addEventListener('beforeunload', preventLoad);
      window.scrollTo(0, 0);
      return () => {
        window.removeEventListener('beforeunload', preventLoad);
      };
    }
  }, [step]);
  const preventLoad = (e) => {
    e.preventDefault();
    if (e) e.returnValue = '¿Deseas salir del proceso de cambio de divisas?';
    return '';
  };

  useEffect(() => {
    let timer;

    if (step === 1) timer = setTimeout(() => setStep(0), 300000);

    return () => clearTimeout(timer);
  }, [step, order, dispatch]);

  const openModalHandler = (type = null) => {
    setModalType(type);
    dispatch(openModal());
  };

  const pages = [
    <Calculator profile={profile} setModal={openModalHandler} setStep={setStep} />,
    <Accounts order={order} setModal={openModalHandler} setStep={setStep} />,
    <Complete order={order} />,
  ];

  let ModalComponent;

  if (modalType === 'account') ModalComponent = () => <AddAccount order={order} accType='orders' />;
  if (modalType === 'complete') ModalComponent = () => <CompleteProfile dispatch={dispatch} history={history} />;

  return (
    <Layout ModalComponent={ModalComponent}>
      <div className={classes.Exchange}>
        {pages[step]}
        <Information />
      </div>
    </Layout>
  );
};

const CompleteProfile = ({ history, dispatch }) => {
  return (
    <>
      <h2>Completa tu perfil</h2>
      <p className='mb-3 text-center'>
        Estimado usuario, para poder hacer operaciones con montos mayores de <b>$ 5,000</b> o <b>S/. 15,000</b> debes <b>completar el 100%</b> de tu información de perfil. Si aún
        no lo has hecho por favor haz click en continuar y ten a la mano tu documento de identidad.
      </p>
      <Button
        type='button'
        className='action-button'
        onClick={() => {
          history.push('/my-profile');
          dispatch(closeModal());
        }}>
        Completar mi perfil
      </Button>
    </>
  );
};

export default Exchange;

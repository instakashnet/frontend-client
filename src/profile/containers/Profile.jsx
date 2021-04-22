import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, getAccountsInit } from '../../store/actions';
import { ArrowUp, ArrowDown } from 'react-feather';

import PersonalDetails from '../components/additionals/PersonalDetails';
import CompanyDetails from '../components/additionals/CompanyDetails';
import DocumentDetails from '../components/additionals/DocumentDetails';
import EditPersonalProfile from './EditPersonalProfile';
import EditCompanyProfile from './EditCompanyProfile';
import Layout from '../../core/components/layout/Layout';
import ProgressBar from '../../core/components/UI/ProgressBar';
import CopyButton from '../../core/components/UI/CopyButton';

// MODAL
import Upload1 from './upload/Upload1';
import Upload2 from './upload/Upload2';
import KashInfo from '../components/KashInfo';
import EditUserCode from './EditUserCode';

import KashIcon from '../../core/assets/images/kash.svg';
import Facebook from '../images/facebook.svg';
import Instagram from '../images/instagram.svg';
import Whatsapp from '../images/whatsapp.svg';

import classes from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editType, setEditType] = useState('');

  const { profiles, user } = useSelector((state) => state.Profile);
  const { kashAccount, isLoading } = useSelector((state) => state.Accounts);
  const usercode = useSelector((state) => state.Auth.userCode);
  const profileSelected = JSON.parse(sessionStorage.getItem('profileSelected'));
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

  let width = 0;
  if (!profile.address && !profile.identity_photo) width = 33;
  if ((!profile.address && profile.identity_photo) || (profile.address && !profile.identity_photo)) width = 66;
  if (profile.address && profile.identity_photo) width = 100;

  useEffect(() => {
    dispatch(getAccountsInit('kash'));
  }, [dispatch]);

  const setEdit = (type) => {
    setIsEdit(true);
    setEditType(type);
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setEditType('');
  };

  const openModalHandler = (type) => {
    setModalType(type);
    dispatch(openModal());
  };

  let UploadComponent;

  if (modalType === 'frontal') UploadComponent = () => <Upload1 />;
  if (modalType === 'trasera') UploadComponent = () => <Upload2 />;
  if (modalType === 'kash') UploadComponent = () => <KashInfo />;
  if (modalType === 'editCode') UploadComponent = () => <EditUserCode />;

  return (
    <Layout ModalComponent={UploadComponent} className='content-start'>
      {isEdit ? (
        editType === 'personal' ? (
          <EditPersonalProfile onCancelEdit={cancelEdit} profile={profile} />
        ) : (
          <EditCompanyProfile onCancelEdit={cancelEdit} profile={profile} />
        )
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 overscroll-x-auto'>
          <div className={`${classes.ProfileInfoWrapper} col-span-3 md:mr-12`}>
            <div className='flex items-center justify-between'>
              <h1>Mi perfil</h1>
              <p className={classes.Percentage}>{width}% completado</p>
            </div>
            <ProgressBar width={width} />
            {profileSelected.type === 'natural' ? <PersonalDetails profile={profile} user={user} onEdit={setEdit} /> : <CompanyDetails profile={profile} onEdit={setEdit} />}
            <DocumentDetails uploadFile={openModalHandler} profile={profile} />
          </div>
          <div className={`${classes.AffiliateCard} ${showSlide ? classes.Show : ''}`}>
            <button onClick={() => setShowSlide((prev) => !prev)} className={classes.ShowMoreButton}>
              {!showSlide ? <ArrowUp /> : <ArrowDown />}
              <p>Saber más sobre los KASH</p>
            </button>
            <div className='flex items-center justify-center md:flex-col'>
              <img src={KashIcon} alt='kash-icon' width={80} className='mr-2' />
              {!isLoading && <h2>{kashAccount && kashAccount.balance ? `¡Tienes ${kashAccount.balance} KASH!` : 'No has ganado ningún KASH'}</h2>}
            </div>
            <h3>
              ¡Comparte tu código! <br />
              Gana KASH y obtén beneficios
            </h3>
            <div className={classes.Code}>
              <span>{usercode}</span>
              <CopyButton textToCopy={usercode} />
            </div>
            <button onClick={() => openModalHandler('editCode')} className='mb-3 text-sm'>
              Editar mi código
            </button>
            <div className='flex items-center mt-3 mb-12 justify-between'>
              <img src={Whatsapp} alt='whatsapp' className='ml-3' />
              <img src={Facebook} alt='facebook' className='ml-3' />
              <img src={Instagram} alt='instagram' className='ml-3' />
            </div>
            <p>
              Por cada amigo que haga su primer cambio de divisas recibirás 1 <b>KASH</b>. Al usar nuestros <b>KASH</b> accederás a beneficios dentro de nuestra plataforma.
            </p>
            <button onClick={() => openModalHandler('kash')}>saber más</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;

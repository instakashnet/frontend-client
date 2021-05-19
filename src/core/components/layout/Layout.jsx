import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, closeSliderModal } from '../../../store/actions';

import Sidebar from './Sidebar';
import Header from './Header';
import Modal from '../UI/Modal';
import SliderModal from '../UI/SliderModal';

const Layout = ({ className, children, ModalComponent, SliderModalComponent }) => {
  const dispatch = useDispatch();

  const closeModalHandler = () => dispatch(closeModal());
  const closeSliderModalHandler = () => dispatch(closeSliderModal());

  return (
    <main className='main-app'>
      <Sidebar />
      <Header />
      <section className={`main-section px-4 lg:px-10 ${className || ''}`}>{children}</section>
      <Modal closeModal={closeModalHandler}>{ModalComponent && ModalComponent()}</Modal>
      <SliderModal closeModal={closeSliderModalHandler}>{SliderModalComponent && <SliderModalComponent />}</SliderModal>
    </main>
  );
};

export default Layout;

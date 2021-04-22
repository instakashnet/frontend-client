import React from 'react';
import { useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { X } from 'react-feather';

import ProfileNavigation from '../layout/navigation/ProfileNavigation';

import classes from './Modal.module.scss';

const SliderModal = ({ children, closeModal }) => {
  const { isSliderOpen, sliderType } = useSelector((state) => state.Modal);

  return (
    <ReactModal closeTimeoutMS={600} onRequestClose={closeModal} isOpen={isSliderOpen} ariaHideApp={false} className='slider-modal' preventScroll>
      <div className={sliderType === 'profile' ? classes.ProfileModalContent : classes.ModalContent}>
        <button onClick={closeModal} className={classes.Close}>
          <X />
        </button>
        {sliderType === 'profile' ? <ProfileNavigation /> : children}
      </div>
    </ReactModal>
  );
};

export default React.memo(SliderModal);

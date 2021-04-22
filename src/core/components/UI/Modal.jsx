import React from 'react';
import { useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { X } from 'react-feather';

import classes from './Modal.module.scss';

const Modal = ({ children, closeModal }) => {
  const isOpen = useSelector((state) => state.Modal.isOpen);

  return (
    <ReactModal closeTimeoutMS={300} onRequestClose={closeModal} isOpen={isOpen} className={classes.Modal} ariaHideApp={false} preventScroll>
      <div className={classes.ModalContent}>
        <button onClick={closeModal} className={classes.Close}>
          <X />
        </button>
        {children}
      </div>
    </ReactModal>
  );
};

export default React.memo(Modal);

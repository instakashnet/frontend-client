import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { X } from 'react-feather';

import classes from './Modal.module.scss';

function scrollToPreventBounce(htmlElement) {
  const { scrollTop, offsetHeight, scrollHeight } = htmlElement;

  // If at top, bump down 1px
  if (scrollTop <= 0) {
    htmlElement.scrollTo(0, 1);
    return;
  }

  // If at bottom, bump up 1px
  if (scrollTop + offsetHeight >= scrollHeight) {
    htmlElement.scrollTo(0, scrollHeight - offsetHeight - 1);
  }
}

const Modal = ({ children, closeModal }) => {
  const isOpen = useSelector((state) => state.Modal.isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchstart', scrollToPreventBounce);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('touchstart', scrollToPreventBounce);
    };
  }, [isOpen]);

  return (
    <ReactModal closeTimeoutMS={300} onRequestClose={closeModal} isOpen={isOpen} className={classes.Modal} ariaHideApp={false} preventScroll>
      <div className={classes.ModalContent}>
        <button onClick={closeModal} className={classes.Close}>
          <X size={30} />
        </button>
        {children}
      </div>
    </ReactModal>
  );
};

export default React.memo(Modal);

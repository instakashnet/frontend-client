import React from "react";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import { X } from "react-feather";

import classes from "./modal-components.module.scss";

const SliderModal = ({ children, closeModal }) => {
  const isOpen = useSelector((state) => state.Modal.isSliderOpen);

  return (
    <ReactModal closeTimeoutMS={600} onRequestClose={closeModal} isOpen={isOpen} ariaHideApp={false} className="slider-modal" preventScroll>
      <div className={classes.ModalContent}>
        <button onClick={closeModal} className={classes.Close}>
          <X size={27} />
        </button>
        {children}
      </div>
    </ReactModal>
  );
};

export default React.memo(SliderModal);

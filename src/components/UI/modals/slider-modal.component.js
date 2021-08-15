import React from "react";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import { Close } from "@material-ui/icons";

import classes from "./modal-components.module.scss";

const SliderModal = ({ children, closeModal }) => {
  const isOpen = useSelector((state) => state.Modal.isSliderOpen);

  return (
    <ReactModal closeTimeoutMS={600} onRequestClose={closeModal} isOpen={isOpen} ariaHideApp={false} className="slider-modal" preventScroll>
      <div className={classes.ModalContent}>
        <button onClick={closeModal} className={classes.Close}>
          <Close fontSize="large" />
        </button>
        {children}
      </div>
    </ReactModal>
  );
};

export default React.memo(SliderModal);

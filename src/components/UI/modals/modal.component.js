import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactModal from "react-modal";
import { Close } from "@material-ui/icons";
import { closeModal } from "../../../store/actions";

import classes from "./modal-components.module.scss";

const Modal = ({ children }) => {
  const isOpen = useSelector((state) => state.Modal.isOpen);
  const dispatch = useDispatch();

  return (
    <ReactModal closeTimeoutMS={300} onRequestClose={() => dispatch(closeModal())} isOpen={isOpen} className={classes.Modal} ariaHideApp={false} preventScroll>
      <div className={classes.ModalContent}>
        <button onClick={() => dispatch(closeModal())} className={classes.Close}>
          <Close fontSize="large" />
        </button>
        {children}
      </div>
    </ReactModal>
  );
};

export default React.memo(Modal);

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactModal from "react-modal";
import { X } from "react-feather";
import { closeModal } from "../../../../store/actions";

import classes from "./modal-components.module.scss";

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

const Modal = ({ children }) => {
  const isOpen = useSelector((state) => state.Modal.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("touchstart", scrollToPreventBounce);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("touchstart", scrollToPreventBounce);
    };
  }, []);

  return (
    <ReactModal closeTimeoutMS={300} onRequestClose={() => dispatch(closeModal())} isOpen={isOpen} className={classes.Modal} ariaHideApp={false} preventScroll>
      <div className={classes.ModalContent}>
        <button onClick={() => dispatch(closeModal())} className={classes.Close}>
          <X size={30} />
        </button>
        {children}
      </div>
    </ReactModal>
  );
};

export default React.memo(Modal);

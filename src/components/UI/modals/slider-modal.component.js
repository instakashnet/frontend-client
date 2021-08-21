import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { Dialog, Slide, DialogContent } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { closeSliderModal } from "../../../store/actions";

import classes from "./modal-components.module.scss";

const Transition = React.forwardRef((props, ref) => <Slide direction={isMobile ? "up" : "left"} ref={ref} {...props} />);

export const SliderModal = ({ title, children }) => {
  const isOpen = useSelector((state) => state.Modal.isSliderOpen);
  const dispatch = useDispatch();

  const closeSliderModalHandler = () => dispatch(closeSliderModal());

  return (
    <Dialog
      open={isOpen}
      classes={{ container: classes.SliderModalContainer, paper: classes.SliderModal }}
      TransitionComponent={Transition}
      transitionDuration={{ enter: 700, exit: 600 }}
      keepMounted
      onClose={closeSliderModalHandler}
      aria-labelledby="slider-modal"
      aria-describedby="slider-modal">
      <div className={classes.ModalHeader}>
        <h2>{title}</h2>
        <button onClick={closeSliderModalHandler} className={classes.Close}>
          <Close />
        </button>
      </div>
      <DialogContent className={classes.SliderModalBody}>{children}</DialogContent>
    </Dialog>
  );
};
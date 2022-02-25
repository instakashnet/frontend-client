import React, { useEffect } from "react";
import { Dialog, Slide, DialogContent } from "@material-ui/core";
import { Close } from "@material-ui/icons";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { closeSliderModal } from "../../../store/actions";

import classes from "./modal-components.module.scss";

const Transition = React.forwardRef((props, ref) => <Slide direction={window.screen.width <= 768 ? "up" : "left"} ref={ref} {...props} />);

export const SliderModal = ({ title, children }) => {
  const dispatch = useDispatch(),
    location = useLocation(),
    isOpen = useSelector((state) => state.Modal.isSliderOpen);

  // HANDLERS
  const closeSliderModalHandler = () => dispatch(closeSliderModal());

  // EFFECTS
  useEffect(() => {
    dispatch(closeSliderModal());
  }, [location, dispatch]);

  return (
    <Dialog
      open={isOpen}
      classes={{ container: classes.SliderModalContainer, paper: classes.SliderModal }}
      TransitionComponent={Transition}
      transitionDuration={{ enter: 700, exit: 600 }}
      keepMounted
      onClose={closeSliderModalHandler}
      aria-labelledby="slider-modal"
      aria-describedby="slider-modal"
    >
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

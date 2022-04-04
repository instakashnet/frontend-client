import { Dialog, DialogContent,Slide } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";

// REDUX ACTION
import { closeSliderModal } from "../../../store/actions";
// CLASSES
import classes from "../modules/modals/g-modal.module.scss";

const Transition = React.forwardRef((props, ref) => <Slide direction={window.screen.width <= 768 ? "up" : "left"} ref={ref} {...props} />);

export const SliderModal = ({ title, children }) => {
  const dispatch = useDispatch(),
    isOpen = useSelector((state) => state.Modal.isSliderOpen);

  // HANDLERS
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

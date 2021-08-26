import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { WarningOutlined, InfoOutlined, ErrorOutline } from "@material-ui/icons";
import { Dialog, DialogContent } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { closeModal } from "../../../store/actions";

import classes from "./modal-components.module.scss";


export const Modal = ({ title, isAlert, alertType, children }) => {
  const isOpen = useSelector((state) => state.Modal.isOpen);
  const dispatch = useDispatch();

  let InfoIcon;

  if (alertType === "warning") InfoIcon = <WarningOutlined fontSize="large" htmlColor="#ffa755" />;
  if (alertType === "info") InfoIcon = <InfoOutlined fontSize="large" htmlColor="#20a2a5" />;
  if (alertType === "danger") InfoIcon = <ErrorOutline fontSize="large" htmlColor="#ff4b55" />;

  return (
    <Dialog aria-labelledby="modal-title" classes={{ paper: classes.Modal }} open={isOpen} onClose={() => dispatch(closeModal())}>
      <div className={classes.ModalHeader}>
        <h2>{title}</h2>
        <button onClick={() => dispatch(closeModal())} className={classes.Close}>
          <Close />
        </button>
      </div>
      <DialogContent className={classes.ModalBody}>
        {isAlert && <div className="flex justify-center mb-3">{InfoIcon}</div>}
        {children}
      </DialogContent>
    </Dialog>
  );
};

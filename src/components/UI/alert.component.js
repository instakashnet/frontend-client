// ICONS
import CloseRounded from "@material-ui/icons/CloseRounded";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
// NOTISTACK
import { SnackbarContent, useSnackbar } from "notistack";
import React from "react";
// CLASSES
import classes from "./modules/alert.module.scss";


const Alert = React.forwardRef((props, ref) => {
  // VARIABLES
  const { id, message, type } = props;

  // HANDLERS
  const { closeSnackbar } = useSnackbar(),
    handleClose = () => closeSnackbar(id);

  return (
    <SnackbarContent ref={ref}>
      <div className={`${classes.Alert} ${type === "positive" ? classes.PositiveAlert : classes.NegativeAlert}`}>
        <InfoOutlined className={classes.AlertIcon} />
        <p>{message}</p>
        <button type="button" onClick={handleClose}>
          <CloseRounded />
        </button>
      </div>
    </SnackbarContent>
  );
});

export default React.memo(Alert);

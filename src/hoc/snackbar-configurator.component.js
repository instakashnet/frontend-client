import { useSnackbar } from "notistack";
import React from "react";
import Alert from "../components/UI/alert.component";

const InnerSnackbarConfigurator = (props) => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef;
const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarConfigurator = () => {
  return <InnerSnackbarConfigurator setUseSnackbarRef={setUseSnackbarRef} />;
}

export const snackActions = {
  success: (msg) => {
    snackActions.toast(msg, { type: "success" });
  },
  error: (msg) => {
    snackActions.toast(msg, { type: "error" });
  },
  warning: (msg) => {
    snackActions.toast(msg, { type: "warning" });
  },
  toast: (msg, options) => {
    useSnackbarRef.enqueueSnackbar(msg,
      {
        ...options,
        content: (key) => {
          const { type } = options || { type: "success" };

          return (
            <Alert
              id={key}
              message={msg}
              type={type} />
          );
        }
      })
  },
};
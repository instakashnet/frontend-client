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
  positive: (msg) => {
    snackActions.toast(msg, { type: "positive" });
  },
  negative: (msg) => {
    snackActions.toast(msg, { type: "negative" });
  },
  toast: (msg, options) => {
    useSnackbarRef.enqueueSnackbar(msg,
      {
        ...options,
        content: (key) => {
          const { type } = options || { type: "positive" };

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
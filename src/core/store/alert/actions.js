import * as types from "./types";

export const setAlertInit = (msg, alertType) => ({
  type: types.SET_ALERT_INIT,
  msg,
  alertType,
});

export const setAlert = (alert) => ({
  type: types.SET_ALERT,
  alert,
});

export const removeAlert = (id) => ({
  type: types.REMOVE_ALERT,
  id,
});

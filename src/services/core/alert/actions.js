import * as types from "./types";

export const setAlertInit = (msg, alertType) => ({
  type: types.SET_ALERT.INIT,
  msg,
  alertType,
});

export const setAlertSuccess = (alert) => ({
  type: types.SET_ALERT.SUCCESS,
  alert,
});

export const removeAlert = (id) => ({
  type: types.SET_ALERT.REMOVE,
  id,
});

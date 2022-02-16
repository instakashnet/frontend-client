import * as types from "./types";

export const setIsClosedInit = () => ({
  type: types.SET_IS_CLOSED.LOADING,
});

export const setIsClosedSuccess = (closed) => ({
  type: types.SET_IS_CLOSED.SUCCESS,
  closed,
});

export const dataError = () => ({
  type: types.DATA_ERROR,
});

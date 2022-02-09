import * as types from "./types";

export const getAccountsInit = (accType) => ({
  type: types.GET_ACCOUNTS_INIT,
  accType,
});

export const getAccountsSuccess = (accounts) => ({
  type: types.GET_ACCOUNTS_SUCCESS,
  accounts,
});

export const getKashAccountInit = () => ({
  type: types.GET_KASH_ACCOUNT_INIT,
});

export const getKashAccountSuccess = (account) => ({
  type: types.GET_KASH_ACCOUNT_SUCCESS,
  account,
});

export const setAccountDetailsInit = (accId) => ({
  type: types.SET_ACCOUNT_DETAILS_INIT,
  accId,
});

export const setAccountDetailsSuccess = (details) => ({
  type: types.SET_ACCOUNT_DETAILS_SUCCESS,
  details,
});

export const addAccountInit = (values, addType) => ({
  type: types.ADD_ACCOUNT_INIT,
  values,
  addType,
});

export const addAccountSuccess = () => ({
  type: types.ADD_ACCOUNT_SUCCESS,
});

export const editAccountInit = (id, values, setEdit) => ({
  type: types.EDIT_ACCOUNT_INIT,
  values,
  id,
  setEdit,
});

export const deleteAccountInit = (account) => ({
  type: types.DELETE_ACCOUNT_INIT,
  account,
});

export const deleteAccountSuccess = () => ({
  type: types.DELETE_ACCOUNT_SUCCESS,
});

export const editAccountSuccess = () => ({
  type: types.EDIT_ACCOUNT_SUCCESS,
});

export const withdrawKashInit = (values) => ({
  type: types.WITHDRAW_KASH_INIT,
  values,
});

export const withdrawKashSuccess = () => ({
  type: types.WITHDRAW_KASH_SUCCESS,
});

export const accountsError = () => ({
  type: types.ACCOUNTS_ERROR,
});

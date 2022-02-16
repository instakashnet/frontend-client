import * as types from "./types";

export const getBanks = (banks) => ({
  type: types.GET_BANKS,
  banks,
});

export const getCurrencies = (currencies) => ({
  type: types.GET_CURRENCIES,
  currencies,
});

export const getAccountsInit = (accType) => ({
  type: types.GET_ACCOUNTS.LOADING,
  accType,
});

export const getAccountsSuccess = (accounts) => ({
  type: types.GET_ACCOUNTS.SUCCESS,
  accounts,
});

export const getKashAccountInit = () => ({
  type: types.GET_KASH_ACCOUNT.LOADING,
});

export const getKashAccountSuccess = (account) => ({
  type: types.GET_KASH_ACCOUNT.SUCCESS,
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

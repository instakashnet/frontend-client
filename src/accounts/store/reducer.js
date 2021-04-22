import * as types from './types';
const initialState = {
  accounts: [],
  kashAccount: {},
  accountDetails: {},
  isLoading: true,
  isProcessing: false,
};

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.accounts, isLoading: false };
    case types.GET_KASH_ACCOUNT_SUCCESS:
      return { ...state, kashAccount: action.account, isLoading: false };
    case types.ADD_ACCOUNT_INIT:
    case types.EDIT_ACCOUNT_INIT:
    case types.DELETE_ACCOUNT_INIT:
    case types.WITHDRAW_KASH_INIT:
      return { ...state, isProcessing: true };
    case types.ADD_ACCOUNT_SUCCESS:
    case types.EDIT_ACCOUNT_SUCCESS:
    case types.DELETE_ACCOUNT_SUCCESS:
    case types.WITHDRAW_KASH_SUCCESS:
      return { ...state, isProcessing: false };
    case types.SET_ACCOUNT_DETAILS_SUCCESS:
      return { ...state, accountDetails: action.details };
    case types.ACCOUNTS_ERROR:
      return { ...state, isLoading: false, isProcessing: false };
    default:
      return state;
  }
};

export default accountsReducer;

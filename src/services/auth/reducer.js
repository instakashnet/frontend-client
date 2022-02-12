import * as types from "./types";

const initialState = {
  isProcessing: false,
  token: null,
  user: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADUSER_SUCCESS:
      return { ...state, isProcessing: false, isAuth: true, token: action.token, user: action.user };
    case types.SET_USER_DATA:
      return { ...state, user: action.user };

    case types.REFRESH_TOKEN_INIT:
      return { ...state, isLoading: true };
    case types.REFRESH_TOKEN_SUCCESS:
      return { ...state, isLoading: false, token: action.token };

    case types.SIGNGIN_INIT:
    case types.SIGNIN_GOOGLE:
    case types.SIGNGUP_INIT:
    case types.COMPLETE_PROFILE_INIT:
    case types.RECOVER_PASSWORD_INIT:
    case types.RESET_PASSWORD_INIT:
    case types.VALIDATE_EMAIL_INIT:
    case types.REFRESH_CODE_INIT:
      return { ...state, isProcessing: true };

    case types.SIGNGUP_SUCCESS:
    case types.SIGNGIN_SUCCESS:
    case types.RECOVER_PASSWORD_SUCCESS:
    case types.VALIDATE_EMAIL_SUCCESS:
    case types.REFRESH_CODE_SUCCESS:
      return { ...state, isProcessing: false, token: action.token };

    case types.LOGOUT_SUCCESS:
    case types.RESET_PASSWORD_SUCCESS:
      return { ...state, isProcessing: false, token: null, isAuth: false };

    case types.AUTH_ERROR:
      return { ...state, token: null, isAuth: false, isProcessing: false };

    default:
      return state;
  }
};

export default authReducer;

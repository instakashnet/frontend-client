import * as types from "./types";
import { EDIT_USER_CODE_SUCCESS } from "../../profile/store/types";
const initialState = {
  isProcessing: false,
  token: null,
  userCode: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADUSER_SUCCESS:
      return { ...state, isProcessing: false, isAuth: true, token: action.token, userCode: action.userCode };

    case types.SIGNGIN_INIT:
    case types.SIGNGUP_INIT:
    case types.LOADUSER_INIT:
    case types.COMPLETE_PROFILE_INIT:
    case types.RECOVER_PASSWORD_INIT:
    case types.RESET_PASSWORD_INIT:
    case types.VALIDATE_EMAIL_INIT:
    case types.REFRESH_CODE_INIT:
      return { ...state, isProcessing: true };

    case types.SIGNGUP_SUCCESS:
    case types.RECOVER_PASSWORD_SUCCESS:
    case types.RESET_PASSWORD_SUCCESS:
    case types.VALIDATE_EMAIL_SUCCESS:
    case types.REFRESH_CODE_SUCCESS:
      return { ...state, isProcessing: false };

    case EDIT_USER_CODE_SUCCESS:
      return { ...state, userCode: action.userCode };

    case types.LOGOUT_SUCCESS:
      return { ...state, isProcessing: false, token: null, isAuth: false };

    case types.AUTH_ERROR:
      return { ...state, token: null, isAuth: false, isProcessing: false };

    default:
      return state;
  }
};

export default authReducer;

import * as types from "./types";
import { LOGOUT_SUCCESS } from "../auth/types";

const initialState = {
  profiles: [],
  profileSelected: null,
  isLoading: true,
  isProcessing: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PROFILE_INIT:
    case types.EDIT_BASIC_INFO_INIT:
    case types.EDIT_ADDITIONAL_INFO_INIT:
    case types.UPLOAD_DOCUMENT_INIT:
    case types.EDIT_USER_CODE_INIT:
    case types.DISABLE_PROFILE_INIT:
      return { ...state, isProcessing: true };
    case types.ADD_PROFILE_SUCCESS:
    case types.EDIT_BASIC_INFO_SUCCESS:
    case types.EDIT_ADDITIONAL_INFO_SUCCESS:
    case types.UPLOAD_DOCUMENT_SUCCESS:
    case types.EDIT_USER_CODE_SUCCESS:
    case types.DISABLE_PROFILE_SUCCESS:
      return { ...state, isProcessing: false };

    case types.GET_PROFILES_INIT:
    case types.GET_USER_DATA_INIT:
      return { ...state, isLoading: true };
    case types.GET_PROFILES_SUCCESS:
      return { ...state, isLoading: false, profiles: action.profiles, user: action.user };
    case types.GET_USER_DATA_SUCCESS:
      return { ...state, isLoading: false };

    case types.SELECT_PROFILE_SUCCESS:
      return { ...state, profileSelected: action.profile };

    case LOGOUT_SUCCESS:
      return { ...state, profileSelected: null };

    case types.PROFILES_ERROR:
      return { ...state, isLoading: false, isProcessing: false };

    default:
      return state;
  }
};

export default profileReducer;

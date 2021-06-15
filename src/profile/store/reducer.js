import * as types from "./types";

const initialState = {
  profiles: [],
  user: null,
  profileSelected: null,
  isLoading: true,
  isProcessing: false,
  profileCompleted: 0,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PROFILE_INIT:
    case types.EDIT_PROFILE_INIT:
    case types.UPLOAD_DOCUMENT_INIT:
    case types.EDIT_USER_CODE_INIT:
    case types.DISABLE_PROFILE_INIT:
      return { ...state, isProcessing: true };
    case types.ADD_PROFILE_SUCCESS:
    case types.EDIT_PROFILE_SUCCESS:
    case types.UPLOAD_DOCUMENT_SUCCESS:
    case types.EDIT_USER_CODE_SUCCESS:
    case types.DISABLE_PROFILE_SUCCESS:
      return { ...state, isProcessing: false };

    case types.GET_PROFILES_INIT:
      return { ...state, isLoading: true };
    case types.GET_PROFILES_SUCCESS:
      return { ...state, isLoading: false, profiles: action.profiles, user: action.user };

    case types.SELECT_PROFILE_SUCCESS:
      return { ...state, profileSelected: action.profile, profileCompleted: action.completed };

    case types.PROFILES_ERROR:
      return { ...state, isLoading: false, isProcessing: false };

    default:
      return state;
  }
};

export default profileReducer;

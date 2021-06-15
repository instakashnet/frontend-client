import * as types from "./types";

export const getProfilesInit = () => ({
  type: types.GET_PROFILES_INIT,
});

export const getProfilesSuccess = (profiles, user) => ({
  type: types.GET_PROFILES_SUCCESS,
  profiles,
  user,
});

export const selectProfileInit = (profileId) => ({
  type: types.SELECT_PROFILE_INIT,
  profileId,
});

export const selectProfileSuccess = (profile, completed) => ({
  type: types.SELECT_PROFILE_SUCCESS,
  profile,
  completed,
});

export const addProfileInit = (values) => ({
  type: types.ADD_PROFILE_INIT,
  values,
});

export const addProfileSuccess = () => ({
  type: types.ADD_PROFILE_SUCCESS,
});

export const editProfileInit = (values, setEdit = null) => ({
  type: types.EDIT_PROFILE_INIT,
  values,
  setEdit,
});

export const editProfileSuccess = () => ({
  type: types.EDIT_PROFILE_SUCCESS,
});

export const uploadDocumentInit = (values, uploadType, setPercentage) => ({
  type: types.UPLOAD_DOCUMENT_INIT,
  values,
  uploadType,
  setPercentage,
});

export const uploadDocumentSuccess = () => ({
  type: types.UPLOAD_DOCUMENT_SUCCESS,
});

export const editUserCodeInit = (values) => ({
  type: types.EDIT_USER_CODE_INIT,
  values,
});

export const editUserCodeSuccess = (userCode) => ({
  type: types.EDIT_USER_CODE_SUCCESS,
  userCode,
});

export const disableProfileInit = (id) => ({
  type: types.DISABLE_PROFILE_INIT,
  id,
});

export const disableProfileSuccess = () => ({
  type: types.DISABLE_PROFILE_SUCCESS,
});

export const profilesError = () => ({
  type: types.PROFILES_ERROR,
});

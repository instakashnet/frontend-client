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

export const selectProfileSuccess = (profile) => ({
  type: types.SELECT_PROFILE_SUCCESS,
  profile,
});

export const addProfileInit = (values) => ({
  type: types.ADD_PROFILE_INIT,
  values,
});

export const addProfileSuccess = () => ({
  type: types.ADD_PROFILE_SUCCESS,
});

export const editBasicInfo = (values, editType, setSubmitted) => ({
  type: types.EDIT_BASIC_INFO_INIT,
  values,
  editType,
  setSubmitted,
});

export const editBasicInfoSuccess = () => ({
  type: types.EDIT_BASIC_INFO_SUCCESS,
});

export const editAdditionalInfo = (values, setSubmitted = null) => ({
  type: types.EDIT_ADDITIONAL_INFO_INIT,
  values,
  setSubmitted,
});

export const editAdditionalInfoSuccess = () => ({
  type: types.EDIT_ADDITIONAL_INFO_SUCCESS,
});

export const uploadDocumentInit = (photos, docType) => ({
  type: types.UPLOAD_DOCUMENT_INIT,
  photos,
  docType,
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

export const getUserData = () => ({
  type: types.GET_USER_DATA_INIT,
});

export const getUserDataSuccess = (user) => ({
  type: types.GET_USER_DATA_SUCCESS,
  user,
});

export const disableProfileSuccess = () => ({
  type: types.DISABLE_PROFILE_SUCCESS,
});

export const profilesError = () => ({
  type: types.PROFILES_ERROR,
});

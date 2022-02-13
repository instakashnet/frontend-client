import * as types from "./types";

export const refreshTokenInit = () => ({
  type: types.REFRESH_TOKEN_INIT,
});

export const refreshTokenSuccess = (token) => ({
  type: types.REFRESH_TOKEN_SUCCESS,
  token,
});

export const loadUserSuccess = (user) => ({
  type: types.LOADUSER_SUCCESS,
  user,
});

export const completeProfileInit = (values) => ({
  type: types.COMPLETE_PROFILE_INIT,
  values,
});

export const signinInit = (values) => ({
  type: types.SIGNGIN_INIT,
  values,
});

export const signinSuccess = (token) => ({
  type: types.SIGNGIN_SUCCESS,
  token,
});

export const signinGoogle = (token) => ({
  type: types.SIGNIN_GOOGLE,
  token,
});

export const signupInit = (values) => ({
  type: types.SIGNGUP_INIT,
  values,
});

export const signupSuccess = () => ({
  type: types.SIGNGUP_SUCCESS,
});

export const recoverPasswordInit = (values, setSent) => ({
  type: types.RECOVER_PASSWORD_INIT,
  values,
  setSent,
});

export const recoverPasswordSuccess = () => ({
  type: types.RECOVER_PASSWORD_SUCCESS,
});

export const resetPasswordInit = (values, token) => ({
  type: types.RESET_PASSWORD_INIT,
  values,
  token,
});

export const resetPasswordSuccess = () => ({
  type: types.RESET_PASSWORD_SUCCESS,
});

export const validateEmailInit = (values, otpType) => ({
  type: types.VALIDATE_EMAIL_INIT,
  values,
  otpType,
});

export const validateEmailSuccess = () => ({
  type: types.VALIDATE_EMAIL_SUCCESS,
});

export const refreshCodeInit = () => ({
  type: types.REFRESH_CODE_INIT,
});

export const refreshCodeSuccess = () => ({
  type: types.REFRESH_CODE_SUCCESS,
});

export const setUserData = (user) => ({
  type: types.SET_USER_DATA,
  user,
});

export const logoutInit = () => ({
  type: types.LOGOUT_INIT,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const authError = () => ({
  type: types.AUTH_ERROR,
});

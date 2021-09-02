import * as types from "./types";

export const loadUserInit = () => ({
  type: types.LOADUSER_INIT,
});

export const loadUserSuccess = (token, userCode) => ({
  type: types.LOADUSER_SUCCESS,
  token,
  userCode,
});

export const completeProfileInit = (values) => ({
  type: types.COMPLETE_PROFILE_INIT,
  values,
});

export const signinInit = (values) => ({
  type: types.SIGNGIN_INIT,
  values,
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

export const validateEmailInit = (values) => ({
  type: types.VALIDATE_EMAIL_INIT,
  values,
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

export const logoutInit = (logType = null) => ({
  type: types.LOGOUT_INIT,
  logType,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const authError = () => ({
  type: types.AUTH_ERROR,
});

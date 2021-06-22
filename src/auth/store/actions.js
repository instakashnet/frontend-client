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

export const logoutInit = () => ({
  type: types.LOGOUT_INIT,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const refreshToken = () => ({
  type: types.REFRESH_TOKEN,
});

export const authError = () => ({
  type: types.AUTH_ERROR,
});

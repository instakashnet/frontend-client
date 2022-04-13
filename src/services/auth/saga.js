import camelize from "camelize";
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
// API SERVICES
import { authService } from "../../api/axios";
import history from "../../shared/history";
import { setAlertInit } from "../core/alert/actions";
import { closeSocketConnection } from "../socket/actions";
import * as actions from "./actions";
import * as types from "./types";

function* refreshToken() {
  try {
    const res = yield authService.post("/auth/refresh");
    if (res.status === 200) {
      yield put(actions.refreshTokenSuccess(res.data.accessToken));
      yield call(loadUser);
    }
  } catch (error) {
    yield put(actions.logoutSuccess());
  }
}

function* loadUser() {
  try {
    const res = yield authService.get("/users/session");
    const user = camelize(res.data.user);
    yield call([sessionStorage, "setItem"], "userVerification", JSON.stringify(user));

    if (!user.verified) return yield call([history, "push"], "/email-verification/OTP");
    if (!user.completed) return yield call([history, "push"], "/complete-profile");

    yield put(actions.loadUserSuccess(user));
  } catch (error) {
    yield put(actions.logoutInit());
  }
}

function* signin({ values }) {
  try {
    const res = yield authService.post("/auth/signin", values);
    if (res.status === 200) {
      yield put(actions.signinSuccess(res.data.accessToken));
      yield put(actions.loadUserInit());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* signinGoogle({ token }) {
  try {
    const res = yield authService.post("/auth/google", { token });
    if (res.status === 201 || res.status === 200) {
      yield put(actions.signinSuccess(res.data.accessToken));
      yield put(actions.loadUserInit());
    }
  } catch (error) {
    yield put(actions.authError());
  }
}

function* signup({ values }) {
  try {
    const res = yield authService.post("/auth/signup", values);
    if (res.status === 201) {
      yield put(actions.signupSuccess(res.data.accessToken));
      yield call([history, "push"], "/email-verification/OTP");
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* completeProfile({ values }) {
  try {
    const res = yield authService.post("/users/profiles", values);
    if (res.status === 200) yield call(loadUser);
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* validateEmail({ values, otpType }) {
  const validateValues = { verificationCode: `${values.otp_1}${values.otp_2}${values.otp_3}${values.otp_4}`, operation: otpType };

  try {
    const res = yield authService.post("/auth/verify-code", validateValues);

    if (res.status === 200) {
      yield put(actions.validateEmailSuccess(res.data.accessToken));
      if (otpType === "PWD") return yield call([history, "push"], "/change-password");
      return yield call(loadUser);
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* refreshVerificationCode() {
  try {
    const res = yield authService.get("/auth/refresh-code");
    if (res.status === 200) {
      yield call([Swal, "fire"], "¡Correo enviado!", "Revisa tu correo electrónico con el nuevo código de verificación.", "success");
      yield put(actions.refreshCodeSuccess());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* recoverPassword({ values }) {
  try {
    const res = yield authService.post("/users/recover-password", values);

    if (res.status === 201) {
      yield put(actions.recoverPasswordSuccess(res.data.accessToken));
      yield call([history, "push"], "/email-verification/PWD");
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* resetPassword({ values }) {
  try {
    const res = yield authService.post("/users/reset-password", values);
    if (res.status === 201) {
      yield put(actions.resetPasswordSuccess());
      yield call([history, "push"], "/signin");
      yield call([Swal, "fire"], "Contraseña cambiada", "Ya puedes ingresar con tu nueva contraseña.", "success");
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* logout() {
  try {
    yield authService.post("/auth/logout");
  } catch (error) {
    yield put(actions.authError());
  }

  yield put(closeSocketConnection());
  yield call([history, "push"], "/signin");
  yield put(actions.logoutSuccess());
}

export function* watcRefreshToken() {
  yield takeEvery(types.REFRESH_TOKEN_INIT, refreshToken);
}

export function* watchCompleteProfile() {
  yield takeEvery(types.COMPLETE_PROFILE_INIT, completeProfile);
}

export function* watchSignin() {
  yield takeLatest(types.SIGNGIN_INIT, signin);
}

export function* watchRefreshVerificationCode() {
  yield takeEvery(types.REFRESH_CODE_INIT, refreshVerificationCode);
}

export function* watchLoadUser() {
  yield takeLatest(types.LOADUSER_INIT, loadUser);
}

export function* watchValidateEmail() {
  yield takeLatest(types.VALIDATE_EMAIL_INIT, validateEmail);
}

export function* watchRecoverPassword() {
  yield takeLatest(types.RECOVER_PASSWORD_INIT, recoverPassword);
}

export function* watchResetPassword() {
  yield takeLatest(types.RESET_PASSWORD_INIT, resetPassword);
}

export function* watchSigninGoogle() {
  yield takeLatest(types.SIGNIN_GOOGLE, signinGoogle);
}

export function* watchSignup() {
  yield takeLatest(types.SIGNGUP_INIT, signup);
}

export function* watchLogout() {
  yield takeLatest(types.LOGOUT_INIT, logout);
}

export default function* authSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchSignin),
    fork(watchSignup),
    fork(watchLogout),
    fork(watcRefreshToken),
    fork(watchCompleteProfile),
    fork(watchSigninGoogle),
    fork(watchRecoverPassword),
    fork(watchResetPassword),
    fork(watchValidateEmail),
    fork(watchRefreshVerificationCode),
  ]);
}

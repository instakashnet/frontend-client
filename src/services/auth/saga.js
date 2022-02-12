import { put, all, takeLatest, call, fork, takeEvery, delay } from "redux-saga/effects";
import camelize from "camelize";
import * as actions from "./actions";
import * as types from "./types";
import { setAlertInit } from "../../store/actions";
import Swal from "sweetalert2";
import { authService } from "../auth.service";
import history from "../../shared/history";

function* refreshToken() {
  try {
    const res = yield authService.post("/auth/refresh");
    console.log(res);
  } catch (error) {
    yield call(logout, {});
    yield put(actions.authError());
  }
}

function* loadUser(authData) {
  if (!authData) return yield put(actions.logoutSuccess());

  const { token, expDate } = authData;

  if (new Date(expDate) <= new Date()) return yield call(logout, {});

  try {
    const res = yield authService.get("/users/session");
    const user = camelize(res.data.user);
    yield call([sessionStorage, "setItem"], "userVerification", JSON.stringify(user));

    if (!user.verified) {
      yield call([history, "push"], "/email-verification/OTP");
      return yield put(actions.authError());
    }

    if (!user.completed) {
      yield call([history, "push"], "/complete-profile");
      return yield put(actions.authError());
    }

    yield put(actions.loadUserSuccess(token, user));

    yield call(setAuthTimeout, new Date(expDate).getTime() - new Date().getTime());
  } catch (error) {
    yield call(logout, {});
    yield put(actions.authError());
  }
}

function* setAuthTimeout(timeout) {
  yield delay(timeout - 2000);
  yield put(actions.logoutInit());
}

function* signin({ values }) {
  try {
    const res = yield authService.post("/auth/signin", values);
    if (res.status === 200) {
      let date = new Date();
      let authData = { token: res.data.accessToken, expDate: new Date(date.setSeconds(date.getSeconds() + res.data.expiresIn)) };
      yield put(actions.signinSuccess(res.data.accessToken));
      yield call(loadUser, authData);
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
      yield call(loadUser);
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* signup({ values }) {
  try {
    const res = yield authService.post("/auth/signup", values);
    if (res.status === 201) {
      yield put(actions.signupSuccess());
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
      if (otpType === "PWD") {
        yield put(actions.refreshCodeSuccess());
        return yield call([history, "push"], "/change-password");
      }
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
      // yield call(setAuthToken, res.data);
      yield call([history, "push"], "/email-verification/PWD");
      yield put(actions.recoverPasswordSuccess());
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
      yield call(clearUser);
      yield call([history, "push"], "/signin");
      yield call([Swal, "fire"], "Contraseña cambiada", "Ya puedes ingresar con tu nueva contraseña.", "success");
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* clearUser() {
  yield call([localStorage, "removeItem"], "authData");
  yield call([localStorage, "removeItem"], "userSession");
  yield call([sessionStorage, "removeItem"], "profileSelected");
  yield put(actions.logoutSuccess());
}

function* logout() {
  try {
    yield authService.post("/auth/logout");
  } catch (error) {
    yield put(actions.authError());
  }

  yield call(clearUser);
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

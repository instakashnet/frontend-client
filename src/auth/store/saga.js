import { put, all, takeLatest, call, delay, fork, takeEvery } from "redux-saga/effects";
import camelize from "camelize";
import * as actions from "./actions";
import * as types from "./types";
import { setAlertInit } from "../../store/actions";
import Swal from "sweetalert2";
import { authService } from "../../services/auth.service";
import history from "../../shared/history";

function* setAuthToken(data, isRefresh = false) {
  const date = new Date();
  const expDate = new Date(date.setSeconds(date.getSeconds() + data.expiresIn));

  yield call([localStorage, "setItem"], "authData", JSON.stringify({ token: data.accessToken, expDate }));

  if (isRefresh) yield call(setAuthTimeout, expDate.getTime() - new Date().getTime());
}

function* loadUser() {
  const authData = yield call([localStorage, "getItem"], "authData");
  if (!authData) return yield put(actions.logoutSuccess());

  const { token, expDate } = JSON.parse(authData);

  if (!token) return yield call(clearUser);

  if (new Date(expDate) <= new Date()) return yield call(logout);

  try {
    const res = yield authService.get("/users/session");
    const resData = camelize(res.data);
    yield call([sessionStorage, "setItem"], "userVerification", JSON.stringify({ verified: resData.verified, completed: resData.completed, isGoogle: resData.isGoogle }));

    if (!resData.verified) {
      yield call([history, "push"], "/email-verification");
      return yield put(actions.authError());
    }

    if (!resData.completed) {
      yield call([history, "push"], "/complete-profile");
      return yield put(actions.authError());
    }

    const userRes = yield authService.get("/users/username");
    yield put(actions.loadUserSuccess(token, userRes.data.username));

    yield call(setAuthTimeout, new Date(expDate).getTime() - new Date().getTime());
  } catch (error) {
    yield call(logout);
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
      yield call(setAuthToken, res.data);
      yield call(loadUser);
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
      yield call(setAuthToken, res.data);
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
      yield call(setAuthToken, res.data);
      yield put(actions.signupSuccess());
      yield call([history, "push"], "/email-verification");
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

function* validateEmail({ values }) {
  const verificationCode = { verificationCode: `${values.otp_1}${values.otp_2}${values.otp_3}${values.otp_4}` };

  try {
    const res = yield authService.post("/auth/verify-code", verificationCode);

    if (res.status === 200) {
      yield call(setAuthToken, res.data);
      yield call(loadUser);
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

// function* refreshToken() {
//   try {
//     const res = yield authService.post("/auth/refresh");
//     if (res.status === 200) {
//       yield call(setAuthToken, res.data, true);
//     } else yield call(logout);
//   } catch (error) {
//     yield call(logout);
//   }
// }

function* recoverPassword({ values, setSent }) {
  try {
    const res = yield authService.post("/users/recover-password", values);
    if (res.status === 201) {
      yield put(actions.recoverPasswordSuccess());
      yield call(setSent, true);
      yield call([Swal, "fire"], "¡Correo enviado!", "Revisa tu correo electrónico", "success");
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.authError());
  }
}

function* resetPassword({ values, token }) {
  try {
    const res = yield authService.post("/users/reset-password", values, { headers: { "x-access-token": token } });
    if (res.status === 201) {
      yield put(actions.resetPasswordSuccess());
      yield call([Swal, "fire"], "Contraseña cambiada", "Ya puedes ingresar con tu nueva contraseña.", "success");
      yield call([history, "push"], "/signin");
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
  const authData = yield call([localStorage, "getItem"], "authData");
  if (!authData) return yield put(actions.logoutSuccess());

  try {
    yield authService.post("/auth/logout");
  } catch (error) {
    yield put(actions.authError());
  }

  yield call(clearUser);
  yield call([history, "push"], "/signin");
  yield put(actions.logoutSuccess());
}

export function* watchLoadUser() {
  yield takeEvery(types.LOADUSER_INIT, loadUser);
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
    fork(watchLoadUser),
    fork(watchCompleteProfile),
    fork(watchSigninGoogle),
    fork(watchRecoverPassword),
    fork(watchResetPassword),
    fork(watchValidateEmail),
    fork(watchRefreshVerificationCode),
  ]);
}

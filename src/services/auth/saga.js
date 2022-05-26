import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
// SWEET ALERT
import Swal from "sweetalert2";
// API SERVICES
import { completeProfileSvc, loadUserSvc, logoutSvc, recoverPswdSvc, refreshTokenSvc, refreshVCodeSvc, resetPswdSvc, signinGoogleSvc, signinSvc, signupSvc, validateEmailSvc } from "../../api/services/auth.service";
// SNACKBAR ALERT ACTIONS
import { snackActions } from "../../hoc/snackbar-configurator.component";
// HISTORY
import history from "../../shared/history";
// SOCKET
import { closeSocketConnection } from "../socket/actions";
// REDUX
import * as actions from "./actions";
import * as types from "./types";


function* refreshToken() {
  try {
    const token = yield call(refreshTokenSvc);
    yield put(actions.refreshTokenSuccess(token));
    yield call(loadUser);
  } catch (error) {
    yield put(actions.logoutSuccess());
  }
}

function* loadUser() {
  try {
    const user = yield call(loadUserSvc);
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
    const token = yield call(signinSvc, values);
    yield put(actions.signinSuccess(token));
    yield put(actions.loadUserInit());
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.authError());
  }
}

function* signinGoogle({ token }) {
  try {
    const accessTkn = yield call(signinGoogleSvc, token);
    yield put(actions.signinSuccess(accessTkn));
    yield put(actions.loadUserInit());
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.authError());
  }
}

function* signup({ values }) {
  try {
    const token = yield call(signupSvc, values);
    yield put(actions.signupSuccess(token));
    yield call([history, "push"], "/email-verification/OTP");
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.authError());
  }
}

function* completeProfile({ values }) {
  try {
    yield call(completeProfileSvc, values);
    yield call(loadUser);
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.authError());
  }
}

function* validateEmail({ values, otpType }) {
  const validateValues = { verificationCode: `${values.otp_1}${values.otp_2}${values.otp_3}${values.otp_4}`, operation: otpType };

  try {
    const token = yield call(validateEmailSvc, validateValues);
    yield put(actions.validateEmailSuccess(token));

    if (otpType === "PWD") return yield call([history, "push"], "/change-password");

    return yield call(loadUser);
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.authError());
  }
}

function* refreshVerificationCode() {
  try {
    yield call(refreshVCodeSvc);
    yield call([Swal, "fire"], "¡Correo enviado!", "Revisa tu correo electrónico con el nuevo código de verificación.", "success");
    yield put(actions.refreshCodeSuccess());
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.authError());
  }
}

function* recoverPassword({ values }) {
  try {
    const token = yield call(recoverPswdSvc, values);
    yield put(actions.recoverPasswordSuccess(token));
    yield call([history, "push"], "/email-verification/PWD");
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.authError());
  }
}

function* resetPassword({ values }) {
  try {
    yield call(resetPswdSvc, values);
    yield put(actions.resetPasswordSuccess());
    yield call([history, "push"], "/signin");
    yield call([Swal, "fire"], "Contraseña cambiada", "Ya puedes ingresar con tu nueva contraseña.", "success");
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.authError());
  }
}

function* logout() {
  try {
    yield call(logoutSvc);
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

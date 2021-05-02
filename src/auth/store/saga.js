import { put, all, takeLatest, call, delay, fork, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { setAlertInit } from '../../store/actions';
import Swal from 'sweetalert2';
import axios from '../helpers/axios';
import history from '../../shared/history';

function* setAuthToken(data) {
  const date = new Date();
  const expDate = new Date(date.setSeconds(date.getSeconds() + data.expiresIn));

  yield call([localStorage, 'setItem'], 'authData', JSON.stringify({ token: data.accessToken, expDate, userId: data.id }));
}

function* loadUser() {
  const authData = yield call([localStorage, 'getItem'], 'authData');
  if (!authData) return yield put(actions.logoutSuccess());

  const { token, expDate } = JSON.parse(authData);
  if (!token) return yield call(clearUser);

  if (new Date(expDate) <= new Date()) return yield put(actions.logoutInit());

  try {
    const res = yield axios.get('/users/session');
    const profileCompleted = !!+res.data.completed;
    yield call([localStorage, 'setItem'], 'userSession', JSON.stringify({ ...res.data.activityUser, profileCompleted, is_google: !!+res.data.activityUser.is_google }));

    if (!profileCompleted) {
      yield call([history, 'push'], '/complete-profile');
      yield put(actions.authError());
    } else {
      const userResponse = yield axios.get('/users/username');
      yield put(actions.loadUserSuccess(token, userResponse.data.username));
    }
    yield call(setAuthTimeout, new Date(expDate).getTime() - new Date().getTime());
  } catch (error) {
    yield put(actions.logoutInit());
    yield put(actions.authError());
  }
}

function* setAuthTimeout(timeout) {
  yield delay(timeout);
  yield call(logout);
}

function* signin({ values }) {
  try {
    const res = yield axios.post('/auth/signin', values);
    if (res.status === 200) {
      yield call(setAuthToken, res.data);
      yield call(loadUser);
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.authError());
  }
}

function* signinGoogle({ token }) {
  try {
    const res = yield axios.post('/auth/google', { token });
    if (res.status === 201 || res.status === 200) {
      yield call(setAuthToken, res.data);
      yield call(loadUser);
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.authError());
  }
}

function* signup({ values }) {
  const signupValues = {
    ...values,
    phone: '+' + values.phone,
  };

  try {
    const res = yield axios.post('/auth/signup', signupValues);
    if (res.status === 201) yield put(actions.signinInit({ email: values.email, password: values.password }));
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.authError());
  }
}

function* completeProfile({ values }) {
  const profileValues = {
    ...values,
    phone: values.phone ? '+' + values.phone : null,
  };

  try {
    const res = yield axios.post('/users/profiles', profileValues);
    if (res.status === 200) yield call(loadUser);
  } catch (error) {
    console.log(error);
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.authError());
  }
}

function* recoverPassword({ values, setSent }) {
  try {
    const res = yield axios.post('/users/recover-password', values);
    if (res.status === 201) {
      yield put(actions.recoverPasswordSuccess());
      yield call(setSent, true);
      yield call([Swal, 'fire'], '¡Correo enviado!', 'Revisa tu correo electrónico', 'success');
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.authError());
  }
}

function* resetPassword({ values, token }) {
  try {
    const res = yield axios.post('/users/reset-password', values, { headers: { 'x-access-token': token } });
    if (res.status === 201) {
      yield put(actions.resetPasswordSuccess());
      yield call([Swal, 'fire'], 'Contraseña cambiada', 'Ya puedes ingresar con tu nueva contraseña.', 'success');
      yield call([history, 'push'], '/signin');
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.authError());
  }
}

function* clearUser() {
  yield call([localStorage, 'removeItem'], 'authData');
  yield call([localStorage, 'removeItem'], 'userSession');
  yield call([sessionStorage, 'removeItem'], 'profileSelected');
  yield put(actions.logoutSuccess());
}

function* logout() {
  try {
    yield axios.post('/auth/logout');
  } catch (error) {
    console.log(error);
  }

  yield call(clearUser);
  yield call([history, 'push'], '/signin');
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
  ]);
}

import { put, all, fork, call, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import * as actions from './actions';
import axios from '../helpers/axios';
import { setAlertInit, closeModal } from '../../store/actions';
import history from '../../shared/history';

function* getProfiles() {
  try {
    const res = yield axios.get('/users/profiles');
    if (res.status === 200) yield put(actions.getProfilesSuccess(res.data.profiles, res.data.user));
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.profilesError());
  }
}

function* addProfile({ values }) {
  try {
    const res = yield axios.post('/users/profiles', values);
    if (res.status === 200) {
      yield put(setAlertInit('El perfil ha sido agregado correctamente.', 'success'));
      yield put(actions.addProfileSuccess());
      yield put(actions.getProfilesInit());
      yield put(closeModal());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.profilesError());
  }
}

function* setSelectedProfile(profileId) {
  const profile = yield select((state) => state.Profile.profiles.find((profile) => profile.id === profileId));
  let completed = 0;
  yield call([sessionStorage, 'setItem'], 'profileSelected', JSON.stringify(profile));

  if (!profile.address && !profile.identity_photo) completed = 33;
  if ((!profile.address && profile.identity_photo) || (profile.address && !profile.identity_photo)) completed = 66;
  if (profile.address && profile.identity_photo) completed = 100;

  yield put(actions.selectProfileSuccess(profile, completed));
}

function* selectProfile({ profileId }) {
  yield call(setSelectedProfile, profileId);
  yield call([history, 'push'], '/');
}

function* editProfile({ values, setEdit }) {
  const profileValues = {
    ...values,
    pep: values.pep ? '1' : '0',
  };

  try {
    const res = yield axios.put('/users/profiles', profileValues);
    if (res.status === 200) {
      yield put(setAlertInit('Su perfil ha sido actualizado correctamente.', 'success'));
      yield put(actions.editProfileSuccess());
      yield call(getProfiles);
      yield call(setSelectedProfile, values.profileId);
      yield call(setEdit, false);
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.profilesError());
  }
}

function* uploadDocument({ values, uploadType }) {
  const formData = new FormData();
  formData.append(uploadType === 'frontal' ? 'file-one' : 'file-two', values.identity_photo || values.identity_photo_two);

  let URL = '/users/upload-identity-photo';

  if (uploadType === 'trasera') URL = '/users/upload-identity-photo-two';

  try {
    const res = yield axios.post(URL, formData, { timeout: 25000 });
    if (res.status === 200) {
      yield put(setAlertInit('La foto se ha cargado correctamente.', 'success'));
      yield put(actions.editProfileSuccess());
      yield call(getProfiles);

      const profileSelected = yield call([sessionStorage, 'getItem'], 'profileSelected');
      yield call(setSelectedProfile, JSON.parse(profileSelected).id);
      yield put(closeModal());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.profilesError());
  }
}

function* editUserCode({ values }) {
  try {
    const res = yield axios.put('/users/username', values);
    if (res.status === 200) {
      const userResponse = yield axios.get('/users/username');
      yield put(actions.editUserCodeSuccess(userResponse.data.username));
      yield put(setAlertInit('Tu código ha sido editado correctamente.', 'success'));
      yield put(closeModal());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.profilesError());
  }
}

export function* watchGetProfiles() {
  yield takeEvery(types.GET_PROFILES_INIT, getProfiles);
}

export function* watchSelectProfile() {
  yield takeEvery(types.SELECT_PROFILE_INIT, selectProfile);
}

export function* watchAddProfile() {
  yield takeLatest(types.ADD_PROFILE_INIT, addProfile);
}

export function* watchEditProfile() {
  yield takeLatest(types.EDIT_PROFILE_INIT, editProfile);
}

export function* watchUploadDocument() {
  yield takeLatest(types.UPLOAD_DOCUMENT_INIT, uploadDocument);
}

export function* watchEditUserCode() {
  yield takeLatest(types.EDIT_USER_CODE_INIT, editUserCode);
}

export default function* profilesSaga() {
  yield all([fork(watchGetProfiles), fork(watchSelectProfile), fork(watchAddProfile), fork(watchEditProfile), fork(watchUploadDocument), fork(watchEditUserCode)]);
}

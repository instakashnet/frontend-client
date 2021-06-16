import { put, all, fork, call, select, takeEvery, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import axios from "../helpers/axios";
import { setAlertInit, closeModal } from "../../store/actions";
import history from "../../shared/history";
import Swal from "sweetalert2";

function* getProfiles() {
  try {
    const res = yield axios.get("/users/profiles");
    if (res.status === 200) yield put(actions.getProfilesSuccess(res.data.profiles, res.data.user));
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  }
}

function* addProfile({ values }) {
  try {
    const res = yield axios.post("/users/profiles", values);
    if (res.status === 200) {
      yield put(setAlertInit("El perfil ha sido agregado correctamente.", "success"));
      yield put(actions.addProfileSuccess());
      yield put(actions.getProfilesInit());
      yield put(closeModal());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  }
}

function* setSelectedProfile(profileId) {
  const profile = yield select((state) => state.Profile.profiles.find((profile) => profile.id === profileId));
  let completed = 0;
  yield call([sessionStorage, "setItem"], "profileSelected", JSON.stringify(profile));

  if (!profile.address && !profile.identity_photo) completed = 33;
  if ((!profile.address && profile.identity_photo) || (profile.address && !profile.identity_photo)) completed = 66;
  if (profile.address && profile.identity_photo) completed = 100;

  yield put(actions.selectProfileSuccess(profile, completed));
}

function* selectProfile({ profileId }) {
  yield call(setSelectedProfile, profileId);
  yield call([history, "push"], "/");
}

function* editProfile({ values, setEdit }) {
  const profileValues = { ...values };

  if (typeof values.pep === "boolean") profileValues.pep = values.pep ? "1" : "0";

  try {
    const res = yield axios.put("/users/profiles", profileValues);
    if (res.status === 200) {
      yield call(getProfiles);
      yield call(setSelectedProfile, values.profileId);
      yield put(setAlertInit("Su perfil ha sido actualizado correctamente.", "success"));
      yield put(actions.editProfileSuccess());
      if (setEdit) yield call(setEdit, false);
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  }
}

function* uploadDocument({ values, uploadType, setFile, setPercentage }) {
  const formData = new FormData();
  formData.append(uploadType === "frontal" ? "file-one" : "file-two", values.identity_photo || values.identity_photo_two);
  let URL = "/users/upload-identity-photo";

  if (uploadType === "trasera") URL = "/users/upload-identity-photo-two";

  try {
    const res = yield axios.post(URL, formData, {
      timeout: 25000,
      onUploadProgress: ({ loaded, total }) => {
        const percentage = Math.floor((loaded * 100) / total);
        if (percentage < 100) setPercentage(percentage);
      },
    });
    if (res.status === 200) {
      yield call(getProfiles);
      const profileSelected = yield call([sessionStorage, "getItem"], "profileSelected");
      yield call(setSelectedProfile, JSON.parse(profileSelected).id);
      yield call(setFile, null);
      yield put(actions.editProfileSuccess());
      yield put(setAlertInit("La foto se ha cargado correctamente.", "success"));
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  } finally {
    call(setPercentage, 0);
  }
}

function* editUserCode({ values }) {
  try {
    const res = yield axios.put("/users/username", values);
    if (res.status === 200) {
      const userResponse = yield axios.get("/users/username");
      yield put(actions.editUserCodeSuccess(userResponse.data.username));
      yield put(setAlertInit("Tu código ha sido editado correctamente.", "success"));
      yield put(closeModal());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  }
}

function* disableProfile({ id }) {
  try {
    const result = yield call([Swal, "fire"], {
      icon: "warning",
      title: "¿Deseas eliminar este perfil?",
      text: "Los datos serán eliminados y deberás agregarlo de nuevo para poder utilizarlo en otras operaciones.",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#ff4b55",
    });

    if (result.isConfirmed) {
      const res = yield axios.delete(`/users/active/${id}`, { data: { active: false } });
      if (res.status === 200) {
        yield call(getProfiles);
        yield history.push("/profile-selection");
        yield call([sessionStorage, "removeItem"], "profileSelected");
        yield put(actions.disableProfileSuccess());
        yield Swal.fire("Perfil eliminado", "El perfil ha sido eliminado correctamente. Deberá seleccionar un nuevo perfil.", "success");
      }
    } else yield put(actions.profilesError());
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
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

export function* watchDisableProfile() {
  yield takeLatest(types.DISABLE_PROFILE_INIT, disableProfile);
}

export default function* profilesSaga() {
  yield all([
    fork(watchGetProfiles),
    fork(watchSelectProfile),
    fork(watchAddProfile),
    fork(watchEditProfile),
    fork(watchUploadDocument),
    fork(watchEditUserCode),
    fork(watchDisableProfile),
  ]);
}

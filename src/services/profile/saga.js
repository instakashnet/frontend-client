import { put, all, fork, call, delay, select, takeEvery, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { setAlertInit, closeModal, setUserData } from "../../store/actions";
import { replaceSpace } from "../../shared/functions";
import history from "../../shared/history";
import Swal from "sweetalert2";
import camelize from "camelize";
import { uploadFile } from "react-s3";

// API SERVICES
import { authService } from "../../api/axios";

// UTILS
const uploadToS3 = async (photo, docType) => {
  const S3config = {
    bucketName: process.env.REACT_APP_STAGE !== "prod" ? "instakash-docs-dev" : "instakash-docs",
    dirName: docType,
    region: "us-east-2",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };

  try {
    return await uploadFile(photo, S3config);
  } catch (error) {
    throw error;
  }
};

// SAGAS
function* getProfiles() {
  try {
    const res = yield authService.get("/users/profiles");
    if (res.status === 200) yield put(actions.getProfilesSuccess(res.data.profiles, res.data.user));
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  }
}

function* getUserData() {
  const res = yield authService.get("/users/session"),
    resData = camelize(res.data),
    user = { ...resData.user, verified: resData.verified, completed: resData.completed, isGoogle: resData.isGoogle, isReferal: resData.isReferal };

  yield put(setUserData(user));
  yield put(actions.getUserDataSuccess());
}

function* addProfile({ values }) {
  try {
    const res = yield authService.post("/users/profiles", values);
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

function* selectProfile({ profileId }) {
  const profileSelected = yield select((state) => state.Profile.profiles.find((p) => p.id === profileId));

  yield put(actions.selectProfileSuccess(profileSelected));
  yield call([history, "push"], "/currency-exchange");
}

function* editAdditionalInfo({ values, setSubmitted }) {
  try {
    const res = yield authService.put("/users/profiles", values);
    if (res.status === 200) {
      yield call(getUserData);
      yield put(actions.editAdditionalInfoSuccess());
      yield put(setAlertInit("Su perfil ha sido actualizado correctamente.", "success"));
      if (setSubmitted) {
        yield call(setSubmitted, true);
        yield delay(2000);
        yield call(setSubmitted, false);
      }
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  }
}

function* uploadDocument({ photos, docType }) {
  let uploaded;

  try {
    const resToken = yield authService.get("/users/generate-token"),
      user = yield select((state) => state.Auth.user),
      photosArray = docType === "dni" ? [photos.front, photos.back] : [photos.front];

    for (let i = 0; i < photosArray.length; i++) {
      const photoRes = yield fetch(photosArray[i]),
        blob = yield photoRes.blob(),
        docSide = docType === "passport" ? "front" : i > 0 ? "back" : "front",
        photo = new File([blob], `${user.documentType}-${user.documentIdentification}-${replaceSpace(user.name.toUpperCase())}-${docSide}-&Token&${resToken.data.accessToken}.jpg`);

      const res = yield call(uploadToS3, photo, user.documentType.toLowerCase());
      uploaded = res.result.status === 204;
    }

    if (uploaded) {
      // yield call(getUserData);
      yield put(actions.uploadDocumentSuccess());
      yield put(closeModal());
    }
  } catch (error) {
    console.log(error);
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  }
}

function* editUserCode({ values }) {
  try {
    const res = yield authService.put("/users/username", values);
    if (res.status === 200) {
      const userResponse = yield authService.get("/users/username");
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
      const res = yield authService.delete(`/users/active/${id}`, { data: { active: false } });
      if (res.status === 200) {
        yield call(getProfiles);
        yield put(actions.disableProfileSuccess());
        yield Swal.fire("Perfil eliminado", "El perfil ha sido eliminado correctamente. Deberá seleccionar un nuevo perfil.", "success");
      }
    } else yield put(actions.profilesError());
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  }
}

function* editBasicInfo({ values, editType, setSubmitted }) {
  let URL;

  if (editType === "phone") URL = "/users/change-phone";
  if (editType === "email") URL = "/users/change-email";

  try {
    const res = yield authService.put(URL, values);

    if (res.status === 200) {
      yield put(setAlertInit(`Tu ${editType === "phone" ? "teléfono" : "correo"} ha sido actualizado correctamente.`, "success"));
      yield call(setSubmitted, true);
      yield put(actions.editBasicInfoSuccess());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.profilesError());
  }
}

function* watchGetProfiles() {
  yield takeEvery(types.GET_PROFILES_INIT, getProfiles);
}

function* watchSelectProfile() {
  yield takeEvery(types.SELECT_PROFILE_INIT, selectProfile);
}

function* watchAddProfile() {
  yield takeLatest(types.ADD_PROFILE_INIT, addProfile);
}

function* watchEditBasicInfo() {
  yield takeLatest(types.EDIT_BASIC_INFO_INIT, editBasicInfo);
}

function* watchEditAdditionalInfo() {
  yield takeLatest(types.EDIT_ADDITIONAL_INFO_INIT, editAdditionalInfo);
}

function* watchUploadDocument() {
  yield takeLatest(types.UPLOAD_DOCUMENT_INIT, uploadDocument);
}

function* watchEditUserCode() {
  yield takeLatest(types.EDIT_USER_CODE_INIT, editUserCode);
}

function* watchDisableProfile() {
  yield takeLatest(types.DISABLE_PROFILE_INIT, disableProfile);
}

function* watchGetUserData() {
  yield takeLatest(types.GET_USER_DATA_INIT, getUserData);
}

export default function* profilesSaga() {
  yield all([
    fork(watchGetProfiles),
    fork(watchSelectProfile),
    fork(watchAddProfile),
    fork(watchEditBasicInfo),
    fork(watchEditAdditionalInfo),
    fork(watchUploadDocument),
    fork(watchEditUserCode),
    fork(watchDisableProfile),
    fork(watchGetUserData),
  ]);
}

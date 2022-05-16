import camelize from "camelize";
import moment from "moment";
import { uploadFile } from "react-s3";
import { all, call, delay, fork, put, select, takeEvery, takeLatest } from "redux-saga/effects";
// SWEET ALERT
import Swal from "sweetalert2";
// API SERVICES
import {
  completeProfileSvc,
  deleteProfileSvc,
  editAddInfoSvc,
  editBasicInfoSvc,
  generateTokenSvc,
  getProfilesSvc,
  loadUserSvc,
  userCodeSvc
} from "../../api/services/auth.service";
// SNACKBAR ALERT ACTIONS
import { snackActions } from "../../hoc/snackbar-configurator.component";
// HELPERS
import { replaceSpace } from "../../shared/functions";
// HISTORY
import history from "../../shared/history";
// REDUX
import { closeModal, setUserData } from "../../store/actions";
import * as actions from "./actions";
import * as types from "./types";

// UTILS
const uploadToS3 = async (photo, docType) => {
  const current = moment(),
    yearMonth = current.format("YYYYMM"),
    day = current.format("DD");

  const S3config = {
    bucketName: process.env.REACT_APP_STAGE !== "prod" ? "instakash-docs-dev" : "instakash-docs",
    dirName: `${docType}/${yearMonth}/${day}`,
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
    const res = yield call(getProfilesSvc);
    yield put(actions.getProfilesSuccess(res.profiles, res.user));
  } catch (error) {
    yield put(actions.profilesError());
  }
}

function* getUserData() {
  try {
    const res = yield call(loadUserSvc),
      resData = camelize(res),
      user = { ...resData, verified: resData.verified, completed: resData.completed, isGoogle: resData.isGoogle, isReferal: resData.isReferal };

    yield put(setUserData(user));
    yield put(actions.getUserDataSuccess());
  } catch (error) {
    yield put(actions.profilesError());
  }
}

function* addProfile({ values }) {
  try {
    yield call(completeProfileSvc, values);

    yield snackActions.success("El perfil ha sido agregado correctamente.");
    yield put(actions.addProfileSuccess());
    yield put(actions.getProfilesInit());
    yield put(closeModal());
  } catch (error) {
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
    yield call(editAddInfoSvc, values);
    yield call(getUserData);
    yield put(actions.editAdditionalInfoSuccess());
    yield snackActions.success("Tu perfil ha sido actualizado correctamente.");

    if (setSubmitted) {
      yield call(setSubmitted, true);
      yield delay(2000);
      yield call(setSubmitted, false);
    }
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.profilesError());
  }
}

function* uploadDocument({ photos, docType }) {
  let uploaded;

  try {
    const resToken = yield call(generateTokenSvc),
      user = yield select((state) => state.Auth.user),
      photosArray = docType === "dni" ? [photos.front, photos.back] : [photos.front];

    for (let i = 0; i < photosArray.length; i++) {
      const photoRes = yield fetch(photosArray[i]),
        blob = yield photoRes.blob(),
        docSide = docType === "passport" ? "front" : i > 0 ? "back" : "front",
        photo = new File([blob], `${user.documentType.toUpperCase()}-${user.documentIdentification}-${replaceSpace(user.name.toUpperCase())}-${docSide}-&Token&${resToken}.jpg`);

      const res = yield call(uploadToS3, photo, user.documentType.toLowerCase());
      uploaded = res.result.status === 204;
    }

    if (uploaded) {
      yield put(actions.uploadDocumentSuccess());
      yield put(closeModal());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.profilesError());
  }
}

function* editUserCode({ values }) {
  try {
    yield call(userCodeSvc, values);
    yield call(getUserData);
    yield put(actions.editUserCodeSuccess());
    yield snackActions.success("Tu código ha sido editado correctamente.");
    yield put(closeModal());
  } catch (error) {
    yield snackActions.error(error.message);
    yield put(actions.profilesError());
  }
}

function* disableProfile({ id }) {
  try {
    const result = yield call([Swal, "fire"], {
      icon: "warning",
      title: "¿Deseas eliminar este perfil?",
      text: "Los datos serán eliminados y deberás agregarlo de nuevo para poder utilizarlo en otras operaciones.",
      confirmButtonText: "Sí, eliminar",
      showCancelButton: true,
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#ff4b55",
    });

    if (result.isConfirmed) {
      yield call(deleteProfileSvc, id);
      yield call(getProfiles);
      yield put(actions.disableProfileSuccess());
      yield Swal.fire("Perfil eliminado", "El perfil ha sido eliminado correctamente. Deberá seleccionar un nuevo perfil.", "success");
    } else yield put(actions.profilesError());
  } catch (error) {
    snackActions.error(error.message);
    yield put(actions.profilesError());
  }
}

function* editBasicInfo({ values, editType, setSubmitted }) {
  let URL;

  if (editType === "phone") URL = "/users/change-phone";
  if (editType === "email") URL = "/users/change-email";

  try {
    yield call(editBasicInfoSvc, URL, values);

    yield snackActions.success(`Tu ${editType === "phone" ? "teléfono" : "correo"} ha sido actualizado correctamente.`);
    yield call(getUserData);
    yield put(actions.editBasicInfoSuccess());

    if (setSubmitted) {
      yield call(setSubmitted, true);
      yield delay(2000);
      yield call(setSubmitted, false);
    }
  } catch (error) {
    yield snackActions.error(error.message);
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

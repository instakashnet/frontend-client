import { delay, fork,put, takeEvery } from "redux-saga/effects";
import uuid from "uuid";

import * as actions from "./actions";
import * as types from "./types";

function* setAlert({ msg, alertType }) {
  const id = uuid.v4();
  const alert = { msg, type: alertType, id };
  yield put(actions.setAlertSuccess(alert));
  yield delay(500000);
  yield put(actions.removeAlert(id));
}

export function* watchSetAlert() {
  yield takeEvery(types.SET_ALERT.INIT, setAlert);
}

export default function* alertSaga() {
  yield fork(watchSetAlert);
}

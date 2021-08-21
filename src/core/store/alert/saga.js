import { put, delay, takeEvery, fork } from 'redux-saga/effects';
import uuid from 'uuid';
import * as actions from './actions';
import * as types from './types';

function* setAlert({ msg, alertType }) {
  const id = uuid.v4();
  const alert = { msg, type: alertType, id };
  yield put(actions.setAlert(alert));
  yield delay(5000);
  yield put(actions.removeAlert(id));
}

export function* watchSetAlert() {
  yield takeEvery(types.SET_ALERT_INIT, setAlert);
}

export default function* alertSaga() {
  yield fork(watchSetAlert);
}

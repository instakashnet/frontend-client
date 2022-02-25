import { put, takeEvery, all, fork } from "redux-saga/effects";
import camelize from "camelize";
import * as types from "./types";
import { setAlertInit } from "../../store/actions";
import * as actions from "./actions";

// API SERVICES
import { authService } from "../../api/axios";

function* getAffiliates() {
  try {
    const res = yield authService.get("/users/affiliates");
    if (res.status === 200) {
      const affiliatesData = camelize(res.data.affiliates);
      yield put(actions.getAffiliatesSuccess(affiliatesData));
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.affiliatesError());
  }
}

export function* watchGetAffiliates() {
  yield takeEvery(types.GET_AFFILIATES_INIT, getAffiliates);
}

export default function* affiliatesSaga() {
  yield all([fork(watchGetAffiliates)]);
}

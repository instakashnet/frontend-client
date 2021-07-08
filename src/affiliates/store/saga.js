import { put, takeEvery, all, fork } from "redux-saga/effects";
import * as types from "./types";
import { setAlertInit } from "../../store/actions";
import * as actions from "./actions";
import axios from "../helpers/axios";

function* getAffiliates() {
  try {
    const res = yield axios.get("/users/affiliates");
    console.log(res);
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

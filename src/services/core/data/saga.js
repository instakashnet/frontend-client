import { all, fork, takeEvery, put } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";

// API SERVICES
import { exchangeService } from "../../../api/axios";

function* getSchedule() {
  try {
    const res = yield exchangeService.get("/schedules");
    if (res.status === 200) yield put(actions.getScheduleSuccess(res.data));
  } catch (error) {
    yield put(actions.dataError());
  }
}

export function* watchGetSchedule() {
  yield takeEvery(types.GET_SCHEDULE_INIT, getSchedule);
}

export default function* dataSaga() {
  yield all([fork(watchGetSchedule)]);
}

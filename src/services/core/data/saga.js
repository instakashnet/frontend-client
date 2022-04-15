import moment from "moment";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getSchedulesSvc } from "../../../api/services/exchange.service";
import * as actions from "./actions";
import * as types from "./types";


function* setIsClosed() {
  try {
    const res = yield call(getSchedulesSvc);
    let closed = false;

    if (res?.length) {
      res.forEach((day) => {
        const currentDay = new Date().getDay();

        if (day.idDayOfWeek === currentDay) {
          if (!day.isWorkingDay) return (closed = true);

          const actualTime = moment(new Date(), "HH:mm");
          const startTime = moment(day.startTime, "HH:mm");
          const endTime = moment(day.endTime, "HH:mm");

          if (!actualTime.isAfter(startTime) || !actualTime.isBefore(endTime)) return (closed = true);
        }
      });
    }
    yield put(actions.setIsClosedSuccess(closed));
  } catch (error) {
    yield put(actions.dataError());
  }
}

export function* watchGetSchedule() {
  yield takeEvery(types.SET_IS_CLOSED.LOADING, setIsClosed);
}

export default function* dataSaga() {
  yield all([fork(watchGetSchedule)]);
}

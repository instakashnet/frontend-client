import { all, fork, takeEvery, put } from "redux-saga/effects";
import moment from "moment";
import * as types from "./types";
import * as actions from "./actions";

// API SERVICES
import { exchangeService } from "../../../api/axios";

function* setIsClosed() {
  try {
    const res = yield exchangeService.get("/schedules");
    let closed = false;

    if (res.status === 200 && res.data?.length) {
      res.data.forEach((day) => {
        const actualDay = new Date().getDay();

        if (day.idDayOfWeek === actualDay) {
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

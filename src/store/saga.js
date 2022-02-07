import { all } from "redux-saga/effects";
// CORE
import alertSaga from "../services/core/alert/saga";
import dataSaga from "../services/core/data/saga";
import { socketSaga } from "../services/socket/saga";
// MODULES
import authSaga from "../services/auth/saga";
import profileSaga from "../services/profile/saga";
import activitySaga from "../services/activity/saga";
import accountsSaga from "../services/accounts/saga";
import exchangeSaga from "../services/exchange/saga";
import affiliatesSaga from "../services/affiliates/saga";

export default function* rootSaga() {
  yield all([socketSaga(), alertSaga(), dataSaga(), authSaga(), profileSaga(), activitySaga(), accountsSaga(), exchangeSaga(), affiliatesSaga()]);
}

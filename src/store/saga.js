import { all } from "redux-saga/effects";

// MODULES
import accountsSaga from "../services/accounts/saga";
import activitySaga from "../services/activity/saga";
import affiliatesSaga from "../services/affiliates/saga";
// MODULE
import authSaga from "../services/auth/saga";
// CORE
import alertSaga from "../services/core/alert/saga";
import dataSaga from "../services/core/data/saga";
// MODULES
import exchangeSaga from "../services/exchange/saga";
import profileSaga from "../services/profile/saga";
// CORE
import { socketSaga } from "../services/socket/saga";

export default function* rootSaga() {
  yield all([socketSaga(), alertSaga(), dataSaga(), authSaga(), profileSaga(), activitySaga(), accountsSaga(), exchangeSaga(), affiliatesSaga()]);
}

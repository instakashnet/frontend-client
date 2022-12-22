import camelize from "camelize";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
// API SERVICE
import { getAffiliatesSvc } from "../../api/services/auth.service";
// SNACKBAR ALERT ACTIONS
import { snackActions } from "../../hoc/snackbar-configurator.component";
// REDUX
import * as actions from "./actions";
import * as types from "./types";


function* getAffiliates() {
  try {
    const res = yield call(getAffiliatesSvc);
    const affiliatesData = camelize(res);
    yield put(actions.getAffiliatesSuccess(affiliatesData));
  } catch (error) {
    if (error?.message) yield snackActions.error(error.message);
    yield put(actions.affiliatesError());
  }
}

export function* watchGetAffiliates() {
  yield takeEvery(types.GET_AFFILIATES_INIT, getAffiliates);
}

export default function* affiliatesSaga() {
  yield all([fork(watchGetAffiliates)]);
}

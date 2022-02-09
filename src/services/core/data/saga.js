import { all, fork, takeEvery, put } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { accountsService } from "../../accounts.service";
import { exchangeService } from "../../exchange.service";

function* getBanks() {
  try {
    const res = yield accountsService.get("/banks/172");
    if (res.status === 200) yield put(actions.getBanksSuccess(res.data.banks));
  } catch (error) {
    console.log(error);
  }
}

function* getCurrencies() {
  try {
    const res = yield accountsService.get("/currencies/country/172");
    if (res.status === 200) yield put(actions.getCurenciesSuccess(res.data.currencies));
  } catch (error) {
    console.log(error);
  }
}

function* getSchedule() {
  try {
    const res = yield exchangeService.get("/schedules");
    if (res.status === 200) yield put(actions.getScheduleSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(actions.dataError());
  }
}

export function* watchGetBanks() {
  yield takeEvery(types.GET_BANKS_INIT, getBanks);
}

export function* watchGetCurrencies() {
  yield takeEvery(types.GET_CURRENCIES_INIT, getCurrencies);
}

export function* watchGetSchedule() {
  yield takeEvery(types.GET_SCHEDULE_INIT, getSchedule);
}

export default function* dataSaga() {
  yield all([fork(watchGetBanks), fork(watchGetCurrencies), fork(watchGetSchedule)]);
}

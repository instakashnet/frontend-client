import { all, fork, takeEvery, put } from 'redux-saga/effects';
import * as types from './types';
import * as actions from './actions';
import accountAxios from '../../../accounts/helpers/axios';
import exchangeAxios from '../../../exchange/helpers/axios';

function* getBanks() {
  try {
    const res = yield accountAxios.get('/banks/172');
    if (res.status === 200) yield put(actions.getBanksSuccess(res.data.banks));
  } catch (error) {
    console.log(error);
  }
}

function* getCurrencies() {
  try {
    const res = yield accountAxios.get('/currencies/country/172');
    if (res.status === 200) yield put(actions.getCurenciesSuccess(res.data.currencies));
  } catch (error) {
    console.log(error);
  }
}

function* getSchedule() {
  try {
    const res = yield exchangeAxios.get('/schedules');
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

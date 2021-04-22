import { all } from 'redux-saga/effects';
// CORE
import alertSaga from '../core/store/alert/saga';
import dataSaga from '../core/store/data/saga';
// MODULES
import authSaga from '../auth/store/saga';
import profileSaga from '../profile/store/saga';
import dashboardSaga from '../dashboard/store/saga';
import accountsSaga from '../accounts/store/saga';
import exchangeSaga from '../exchange/store/saga';

export default function* rootSaga() {
  yield all([alertSaga(), dataSaga(), authSaga(), profileSaga(), dashboardSaga(), accountsSaga(), exchangeSaga()]);
}

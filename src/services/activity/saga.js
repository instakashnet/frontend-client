import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
// API SERVICES
import { getOrderAmountsSvc, getOrderDetailsSvc, getOrdersSvc, getTotalAmountSvc, getWithdrawalsSvc } from "../../api/services/exchange.service";
// SNACKBAR ALERT ACTIONS
import { snackActions } from "../../hoc/snackbar-configurator.component";
// REDUX
import * as actions from "./actions";
import * as types from "./types";


function* getOrders({ limit, enabled }) {
  try {
    const res = yield call(getOrdersSvc, limit, enabled);
    const orders = res.ordersByUser.reverse();
    const resData = { ...res, orders };
    yield put(actions.getOrdersSuccess(resData));
  } catch (error) {
    yield snackActions.negative(error.message);
    yield put(actions.activityError());
  }
}

function* getWithdrawals() {
  try {
    const res = yield call(getWithdrawalsSvc);
    yield put(actions.getWithdrawalsSuccess(res));
  } catch (error) {
    yield put(actions.activityError());
  }
}

function* getOrderAmounts() {
  try {
    const res = yield call(getOrderAmountsSvc);
    yield put(actions.getOrderAmountsSuccess(res));
  } catch (error) {
    yield put(actions.activityError());
  }
}

function* getTotalAmount() {
  try {
    const res = yield call(getTotalAmountSvc);
    yield put(actions.getTotalAmountSuccess(res));
  } catch (error) {
    yield put(actions.activityError());
  }
}

function* getOrderDetails({ id, detailsType }) {
  try {
    const res = yield call(getOrderDetailsSvc, id, detailsType);
    yield put(actions.getOrderDetailsSuccess(res));
  } catch (error) {
    yield snackActions.negative(error.message);
    yield put(actions.activityError());
  }
}

export function* watchGetOrders() {
  yield takeEvery(types.GET_ORDERS_INIT, getOrders);
}

export function* watchGetOrderAmounts() {
  yield takeEvery(types.GET_ORDER_AMOUNTS_INIT, getOrderAmounts);
}

export function* watchGetTotalAmount() {
  yield takeEvery(types.GET_TOTAL_AMOUNT_INIT, getTotalAmount);
}

export function* watchGetWithdrawals() {
  yield takeEvery(types.GET_WITHDRAWALS_INIT, getWithdrawals);
}

export function* watchGetOrderDetails() {
  yield takeLatest(types.GET_ORDER_DETAILS_INIT, getOrderDetails);
}

export default function* dashboardSaga() {
  yield all([fork(watchGetOrders), fork(watchGetOrderAmounts), fork(watchGetTotalAmount), fork(watchGetOrderDetails), fork(watchGetWithdrawals)]);
}

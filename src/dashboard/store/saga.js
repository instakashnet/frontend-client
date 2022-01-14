import { put, takeEvery, all, fork, select, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { setAlertInit } from "../../store/actions";
import { exchangeService } from "../../services/exchange.service";

function* getOrders({ limit, enabled }) {
  try {
    const res = yield exchangeService.get(`/order/user?enabled=${enabled}&limit=${limit}`);
    if (res.status === 200) {
      const orders = res.data.ordersByUser.reverse();
      const resData = { ...res.data, orders };
      yield put(actions.getOrdersSuccess(resData));
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.activityError());
  }
}

function* getWithdrawals() {
  try {
    const res = yield exchangeService.get("/withdrawals/user?limit=5");
    if (res.status === 200) yield put(actions.getWithdrawalsSuccess(res.data));
  } catch (error) {
    yield put(actions.activityError());
  }
}

function* getOrderAmounts() {
  try {
    const res = yield exchangeService.get("/order/data/total-processed/user");
    if (res.status === 200) yield put(actions.getOrderAmountsSuccess(res.data));
  } catch (error) {
    yield put(actions.activityError());
  }
}

function* getTotalAmount() {
  try {
    const res = yield exchangeService.get("/order/data/user");
    if (res.status === 200) yield put(actions.getTotalAmountSuccess(res.data));
  } catch (error) {
    yield put(actions.activityError());
  }
}

function* getOrderDetails({ id, detailsType }) {
  let details = {};

  if (detailsType === "order") details = yield select((state) => state.Dashboard.orders.find((order) => order.id === id));
  if (detailsType === "withdrawal") details = yield select((state) => state.Dashboard.withdrawals.find((withdrawal) => withdrawal.id === id));
  yield put(actions.getOrderDetailsSuccess(details));
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

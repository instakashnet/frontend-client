import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
// SWEET ALERT
import Swal from "sweetalert2";
// API SERVICES
import { cancelExchangeSvc, completeExchangeSvc, createExchangeSvc, getLastOrderSvc, getRatesSvc, processCodeSvc, validateCouponSvc } from "../../api/services/exchange.service";
// SNACKBAR ALERT ACTIONS
import { snackActions } from "../../hoc/snackbar-configurator.component";
// HISTORY
import history from "../../shared/history";
// REDUX
import { getOrdersInit } from "../../store/actions";
import * as actions from "./actions";
import * as types from "./types";

function* getRates() {
  try {
    const res = yield call(getRatesSvc);
    const rates = { id: res.id, buy: +res.buy, sell: +res.sell };

    yield put(actions.getRatesSuccess(rates));
  } catch (error) {
    if (error.message) yield snackActions.error(error.message);
    yield put(actions.exchangeError());
  }
}

function* getLastOrder() {
  try {
    const lastOrder = yield call(getLastOrderSvc);

    yield put(actions.getLastOrderSuccess(lastOrder));
    if (lastOrder?.status === 2) yield call([history, "push"], "/currency-exchange/complete");
  } catch (error) {
    yield put(actions.exchangeError());
  }
}

function* validateCoupon({ couponName, profileType, clearCoupon }) {
  try {
    const res = yield call(validateCouponSvc, couponName, profileType);
    yield put(actions.validateCouponSuccess({ name: couponName, discount: res.discount, minimumAmount: res.minAmountBuy }));
    yield call(clearCoupon, "");
  } catch (error) {
    if (!couponName.includes("NUEVOREFERIDO") || (couponName.includes("NUEVOREFERIDO") && profileType === "juridica")) {
      if (error.message) yield snackActions.error(error.message);
    }
    yield put(actions.exchangeError());
  }
}

function* createExchange({ values, amountSent, profile }) {
  const exchangeValues = {
    ...values,
    amount_sent: amountSent,
    amount_received: parseFloat(values.amount_received),
    profile_id: profile.id,
  };

  try {
    const res = yield call(createExchangeSvc, exchangeValues);
    yield put(actions.createExchangeSuccess(res));
    yield call([history, "push"], "/currency-exchange/step-2");
  } catch (error) {
    if (error.message) yield snackActions.error(error.message);
    yield put(actions.exchangeError());
  }
}

function* completeExchange({ values, orderId }) {
  const exchangeValues = {
    ...values,
    kashApplied: values.kashApplied === "yes",
    bank_id: values.bank_id || 1,
    funds_origin: values.funds_origin === "otros" ? values.funds_text : values.funds_origin,
  };

  try {
    const res = yield call(completeExchangeSvc, orderId, exchangeValues);

    if (res.noBank) {
      yield call([history, "push"], "/dashboard/recent");
      yield Swal.fire({
        title: "Solicitud completada",
        text: "Tu solicitud de cambio fue recibida y será procesada en breve. Puedes ver el detalle en tu tabla de actividades.",
        imageUrl: `${process.env.PUBLIC_URL}/images/success.svg`,
        imageAlt: "success",
        showConfirmButton: false,
        showCloseButton: true,
      });
      yield call([sessionStorage, "removeItem"], "order");
      return yield put(actions.processCodeSuccess());
    }

    yield put(actions.completeExchangeSuccess(res));
    yield call([history, "push"], "/currency-exchange/complete");
  } catch (error) {
    if (error.code === "C4006") {
      yield call(
        [Swal, "fire"],
        "Ha ocurrido un error",
        "En este momento no podemos crear su pedido hacia el banco que está solicitando. Por favor intente más tarde o contáctanos.",
        "error"
      );
    } else if (error.message) yield snackActions.error(error.message);

    yield put(actions.exchangeError());
  }
}

function* cancelExchange({ orderId, status, necessaryConfirm, closeModal }) {
  try {
    let result = { isConfirmed: necessaryConfirm };

    if (necessaryConfirm) {
      result = yield Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: "Deberás crear una nueva operación para recibir tu cambio.",
        showCancelButton: true,
        cancelButtonColor: "#ffeb4d",
        confirmButtonColor: "#ff4b55",
        confirmButtonText: "Continuar",
        cancelButtonText: "Regresar",
      });
    }

    let URL = `/order/cancel/${orderId}`;
    if (status === "draft") URL = `/order/draft/${orderId}`;

    if (!necessaryConfirm || result.isConfirmed) {
      yield call(cancelExchangeSvc, URL);

      if (status === "details") {
        yield put(getOrdersInit(5));
        yield call(closeModal);
      }

      if (status === "complete" || status === "draft") yield call([history, "push"], "/currency-exchange");

      if (result.isConfirmed) yield Swal.fire("Exitoso", "Su solicitud de cambio fue cancelada.", "success");

      yield put(actions.cancelExchangeSuccess());
    } else yield put(actions.exchangeError());
  } catch (error) {
    if (error.message) yield snackActions.error(error.message);
    yield put(actions.exchangeError());
  }
}

function* processCode({ values, orderId, processType, closeModal }) {
  const processValue = { transaction_code: values ? values.transaction_code : null };

  try {
    yield call(processCodeSvc, orderId, processValue);
    if (processType === "details") {
      yield put(getOrdersInit());
      yield call(closeModal);
    } else yield call([history, "push"], "/dashboard/recent");

    yield Swal.fire({
      title: "Solicitud completada",
      text: "Tu solicitud de cambio fue recibida y será procesada en breve. Puedes ver el detalle en tu tabla de actividades.",
      imageUrl: `${process.env.PUBLIC_URL}/images/success.svg`,
      imageAlt: "success",
      showConfirmButton: false,
      showCloseButton: true,
    });
    yield put(actions.processCodeSuccess());
  } catch (error) {
    if (error.message) yield snackActions.error(error.message);
    yield put(actions.exchangeError());
    if (error.code === 4005 && processType !== "details") yield call([history, "push"], "/currency-exchange");
  }
}

export function* watchGetRates() {
  yield takeEvery(types.GET_RATES_INIT, getRates);
}

export function* watchGetLastOrder() {
  yield takeEvery(types.GET_LAST_ORDER_INIT, getLastOrder);
}

export function* watchCompleteExchnge() {
  yield takeLatest(types.COMPLETE_EXCHANGE_INIT, completeExchange);
}

export function* watchValidateCoupon() {
  yield takeEvery(types.VALIDATE_COUPON_INIT, validateCoupon);
}

export function* watchCreateExchange() {
  yield takeLatest(types.CREATE_EXCHANGE_INIT, createExchange);
}

export function* watchCancelExchange() {
  yield takeLatest(types.CANCEL_EXCHANGE_INIT, cancelExchange);
}

export function* watchProcessCode() {
  yield takeLatest(types.PROCESS_CODE_INIT, processCode);
}

export default function* exchangeSaga() {
  yield all([
    fork(watchGetRates),
    fork(watchGetLastOrder),
    fork(watchValidateCoupon),
    fork(watchCreateExchange),
    fork(watchCompleteExchnge),
    fork(watchProcessCode),
    fork(watchCancelExchange),
  ]);
}

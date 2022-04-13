import camelize from "camelize";
import { all, call,fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";

// API SERVICES
import { exchangeService } from "../../api/axios";
import { getLastOrderSvc, getRatesSvc, validateCouponSvc } from "../../api/services/exchange.service";
import history from "../../shared/history";
import { getOrdersInit,setAlertInit } from "../../store/actions";
import * as actions from "./actions";
import * as types from "./types";

function* getRates() {
  try {
    const res = yield call(getRatesSvc);
    const rates = { id: res.id, buy: +res.buy, sell: +res.sell };

    yield put(actions.getRatesSuccess(rates));
  } catch (error) {
    yield put(actions.exchangeError());
  }
}

function* getLastOrder() {
  try {
    const res = yield call(getLastOrderSvc);
    const data = camelize(res);

    yield put(actions.getLastOrderSuccess(data.lastOrder));
    if (data.lastOrder?.status === 2) yield call([history, "push"], "/currency-exchange/complete");
  } catch (error) {
    yield put(actions.exchangeError());
  }
}

function* validateCoupon({ couponName, profileType, clearCoupon }) {
  try {
    //const res = yield exchangeService.get(`/coupons/${couponName}/${profileType}`);
    console.log("validateCoupon SAGA.JS:", couponName);
    console.log("validateCoupon SAGA.JS:", profileType);
    console.log("validateCoupon SAGA.JS:", clearCoupon);
    const res = yield call(validateCouponSvc, couponName, profileType);
    yield put(actions.validateCouponSuccess({ name: couponName, discount: res.discount, minimumAmount: res.minAmountBuy }));
    yield call(clearCoupon, "");
  } catch (error) {
    if (!couponName.includes("NUEVOREFERIDO")) yield put(setAlertInit(error.message, "error"));
    yield put(actions.exchangeError());
  }
}

function* createExchange({ values, amountSent, profile }) {
  const exchangeValues = {
    ...values,
    amount_sent: amountSent,
    profile_id: profile.id,
  };

  try {
    const res = yield exchangeService.post("/order/step-2", exchangeValues);
    if (res.status === 201) {
      yield put(actions.createExchangeSuccess(res.data));
      yield call([history, "push"], "/currency-exchange/step-2");
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
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
    const res = yield exchangeService.put(`/order/step-3/${orderId}`, exchangeValues);

    if (res.status === 200) {
      if (res.data.noBank) {
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

      yield put(actions.completeExchangeSuccess(res.data));
      yield call([history, "push"], "/currency-exchange/complete");
    }
  } catch (error) {
    if (error.code === "C4006") {
      yield call(
        [Swal, "fire"],
        "Ha ocurrido un error",
        `En este momento no podemos crear su pedido hacía el banco que está solicitando. Por favor intente nuevamente con un monto menor. Si el problema persiste contactese con atención al cliente.`,
        "error"
      );
    } else yield put(setAlertInit(error.message, "error"));

    yield put(actions.exchangeError());
  }
}

function* cancelExchange({ orderId, status, closeModal }) {
  try {
    const result = yield Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "Deberás crear una nueva operación para recibir tu cambio.",
      showCancelButton: true,
      cancelButtonColor: "#ffeb4d",
      confirmButtonColor: "#ff4b55",
      confirmButtonText: "Continuar",
      cancelButtonText: "Regresar",
    });

    let URL = `/order/cancel/${orderId}`;
    if (status === "draft") URL = `/order/draft/${orderId}`;

    if (result.isConfirmed) {
      const res = yield exchangeService.delete(URL);

      if (res.status === 202) {
        if (status === "details") {
          yield put(getOrdersInit(5));
          yield call(closeModal);
        }

        if (status === "complete" || status === "draft") yield call([history, "push"], "/currency-exchange");

        yield Swal.fire("Exitoso", "Su solicitud de cambio fue cancelada.", "success");
        yield put(actions.cancelExchangeSuccess());
      }
    } else yield put(actions.exchangeError());
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.exchangeError());
  }
}

function* processCode({ values, orderId, processType, closeModal }) {
  const processValue = { transaction_code: values ? values.transaction_code : null };

  try {
    const res = yield exchangeService.put(`/order/step-4/${orderId}`, processValue);
    if (res.status === 200) {
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
    }
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.exchangeError());
    if (error.data && error.data.code === 4005 && processType !== "details") yield call([history, "push"], "/currency-exchange");
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

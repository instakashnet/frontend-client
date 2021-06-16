import { put, takeEvery, takeLatest, all, fork, call } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import axios from "../helpers/axios";
import { setAlertInit, getOrdersInit } from "../../store/actions";
import Swal from "sweetalert2";
import history from "../../shared/history";

function* getRates() {
  try {
    const res = yield axios.get("/rates");
    if (res.status === 200) yield put(actions.getRatesSuccess(res.data[0]));
  } catch (error) {
    yield put(actions.exchangeError());
  }
}

function* validateCoupon({ couponName, profileType }) {
  try {
    const res = yield axios.get(`/coupons/client/${couponName}/${profileType}`);
    if (res.status === 200) yield put(actions.validateCouponSuccess({ name: couponName, discount: res.data.discount, minimumAmount: res.data.minAmountBuy }));
  } catch (error) {
    if (!couponName.includes("NUEVOREFERIDO")) yield put(setAlertInit(error.message, "error"));
    yield put(actions.exchangeError());
  }
}

function* createExchange({ values, profile }) {
  const exchangeValues = {
    ...values,
    profile_id: profile.id,
  };

  try {
    const res = yield axios.post("/order/client/step-2", exchangeValues);
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
  };

  try {
    const res = yield axios.put(`/order/client/step-3/${orderId}`, exchangeValues);

    if (res.status === 200) {
      if (res.data.noBank) {
        yield call([history, "push"], "/dashboard");
        yield Swal.fire({
          title: "Solicitud completada",
          text: "Tu solicitud de cambio fue recibida y será procesada en breve. Puedes ver el detalle en tu tabla de actividades.",
          imageUrl: `${process.env.PUBLIC_URL}/images/success.svg`,
          imageAlt: "success",
          showConfirmButton: false,
          showCloseButton: true,
        });
        return yield put(actions.processCodeSuccess());
      }

      yield put(actions.completeExchangeSuccess(res.data));
      return yield call([history, "push"], "/currency-exchange/complete");
    }
  } catch (error) {
    if (error.data && error.data.code === 4006) {
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

function* cancelExchange({ orderId, status }) {
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

    let URL = `/order/client/cancel/${orderId}`;
    if (status === "draft") URL = `/order/client/draft/${orderId}`;

    if (result.isConfirmed) {
      yield axios.delete(URL);
      if (status === "draft") {
        yield call([history, "push"], "/currency-exchange");
      } else yield call([history, "push"], "/dashboard");
      yield put(actions.cancelExchangeSuccess());
      yield Swal.fire("Exitoso", "Su solicitud de cambio fue cancelada.", "success");
    } else yield put(actions.exchangeError());
  } catch (error) {
    yield put(setAlertInit(error.message, "error"));
    yield put(actions.exchangeError());
  }
}

function* processCode({ values, orderId, processType }) {
  try {
    const res = yield axios.put(`/order/client/step-4/${orderId}`, values);
    if (res.status === 200) {
      if (processType === "details") yield put(getOrdersInit());
      yield call([history, "push"], "/dashboard");
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
  yield all([fork(watchGetRates), fork(watchValidateCoupon), fork(watchCreateExchange), fork(watchCompleteExchnge), fork(watchProcessCode), fork(watchCancelExchange)]);
}

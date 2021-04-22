import { put, takeEvery, takeLatest, all, fork, call } from 'redux-saga/effects';
import * as types from './types';
import * as actions from './actions';
import axios from '../helpers/axios';
import { setAlertInit } from '../../store/actions';
import Swal from 'sweetalert2';
import history from '../../shared/history';

function* getRates() {
  try {
    const res = yield axios.get('/rates');
    if (res.status === 200) yield put(actions.getRatesSuccess(res.data[0]));
  } catch (error) {
    yield put(actions.exchangeError());
  }
}

function* validateCoupon({ couponName }) {
  try {
    const res = yield axios.get(`/coupons/client/${couponName}`);
    console.log(res);
    if (res.status === 200)
      yield put(actions.validateCouponSuccess({ name: couponName, discount: res.data.discount, minimumBuy: res.data.minAmountBuy, minimumSell: res.data.minAmountSell }));
  } catch (error) {
    if (!couponName.includes('NEW_USER')) yield put(setAlertInit(error.message, 'error'));
    yield put(actions.exchangeError());
  }
}

function* createExchange({ values, profile, setStep }) {
  const exchangeValues = {
    ...values,
    profile_id: profile.id,
  };

  try {
    const res = yield axios.post('/order/client/step-2', exchangeValues);
    if (res.status === 201) {
      yield put(actions.createExchangeSuccess(res.data));
      yield call(setStep, 1);
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.exchangeError());
  }
}

function* completeExchange({ values, orderId, setStep }) {
  try {
    const res = yield axios.put(`/order/client/step-3/${orderId}`, values);
    if (res.status === 200) {
      yield put(actions.completeExchangeSuccess(res.data));
      yield call(setStep, 2);
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.exchangeError());
  }
}

function* cancelExchange({ orderId }) {
  try {
    const result = yield Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Deberás crear una nueva operación para recibir tu cambio.',
      showCancelButton: true,
      confirmButtonColor: '#f56565',
      confirmButtonText: 'Si, cancelar',
      cancelButtonText: 'No, regresar',
    });

    if (result.isConfirmed) {
      yield axios.delete(`/order/client/cancel/${orderId}`);
      yield call([history, 'push'], '/');
      yield put(actions.cancelExchangeSuccess());
      yield Swal.fire('Exitoso', 'Su solicitud de cambio fue cancelada.', 'success');
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.exchangeError());
  }
}

function* processCode({ values, orderId }) {
  try {
    const res = yield axios.put(`/order/client/step-4/${orderId}`, values);
    if (res.status === 200) {
      yield call([history, 'push'], '/dashboard');
      yield Swal.fire({
        title: 'Solicitud completada',
        text: 'Tu solicitud de cambio fue recibida y será procesada en breve. Puedes ver el detalle en tu tabla de actividades.',
        imageUrl: `${process.env.PUBLIC_URL}/images/success.svg`,
        imageAlt: 'success',
        showConfirmButton: false,
        showCloseButton: true,
      });
      yield put(actions.processCodeSuccess());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.exchangeError());
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

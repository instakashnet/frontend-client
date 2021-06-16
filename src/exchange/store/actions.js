import * as types from "./types";

export const getRatesInit = () => ({
  type: types.GET_RATES_INIT,
});

export const getRatesSuccess = (rates) => ({
  type: types.GET_RATES_SUCCESS,
  rates,
});

export const validateCouponInit = (couponName, profileType) => ({
  type: types.VALIDATE_COUPON_INIT,
  couponName,
  profileType,
});

export const validateCouponSuccess = (coupon) => ({
  type: types.VALIDATE_COUPON_SUCCESS,
  coupon,
});

export const deleteCoupon = () => ({
  type: types.DELETE_COUPON,
});

export const createExchangeInit = (values, profile) => ({
  type: types.CREATE_EXCHANGE_INIT,
  values,
  profile,
});

export const createExchangeSuccess = (order) => ({
  type: types.CREATE_EXCHANGE_SUCCESS,
  order,
});

export const completeExchangeInit = (values, orderId) => ({
  type: types.COMPLETE_EXCHANGE_INIT,
  values,
  orderId,
});

export const completeExchangeSuccess = (order) => ({
  type: types.COMPLETE_EXCHANGE_SUCCESS,
  order,
});

export const cancelExchangeInit = (orderId, status = null, setStep = null) => ({
  type: types.CANCEL_EXCHANGE_INIT,
  orderId,
  status,
  setStep,
});

export const cancelExchangeSuccess = () => ({
  type: types.CANCEL_EXCHANGE_SUCCESS,
});

export const processCodeInit = (values, orderId, processType = null) => ({
  type: types.PROCESS_CODE_INIT,
  values,
  orderId,
  processType,
});

export const processCodeSuccess = () => ({
  type: types.PROCESS_CODE_SUCCESS,
});

export const exchangeError = () => ({
  type: types.EXCHANGE_ERROR,
});

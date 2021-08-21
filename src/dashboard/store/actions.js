import * as types from './types';

export const getOrdersInit = () => ({
  type: types.GET_ORDERS_INIT,
});

export const getOrdersSuccess = (orders) => ({
  type: types.GET_ORDERS_SUCCESS,
  orders,
});

export const getWithdrawalsInit = () => ({
  type: types.GET_WITHDRAWALS_INIT,
});

export const getWithdrawalsSuccess = (withdrawals) => ({
  type: types.GET_WITHDRAWALS_SUCCESS,
  withdrawals,
});

export const getOrderAmountsInit = () => ({
  type: types.GET_ORDER_AMOUNTS_INIT,
});

export const getOrderAmountsSuccess = (orderAmounts) => ({
  type: types.GET_ORDER_AMOUNTS_SUCCESS,
  orderAmounts,
});

export const getTotalAmountInit = () => ({
  type: types.GET_TOTAL_AMOUNT_INIT,
});

export const getTotalAmountSuccess = (totalAmount) => ({
  type: types.GET_TOTAL_AMOUNT_SUCCESS,
  totalAmount,
});

export const getOrderDetailsInit = (id, detailsType) => ({
  type: types.GET_ORDER_DETAILS_INIT,
  id,
  detailsType,
});

export const getOrderDetailsSuccess = (details) => ({
  type: types.GET_ORDER_DETAILS_SUCCESS,
  details,
});

export const activityError = () => ({
  type: types.ACTIVITY_ERROR,
});

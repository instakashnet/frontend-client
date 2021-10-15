import * as types from "./types";
const initialState = {
  orders: [],
  withdrawals: [],
  totalAmount: 0,
  orderAmounts: {},
  details: {},
  isLoading: true,
};

export default function activityReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ORDERS_INIT:
      return { ...state, isLoading: true };
    case types.GET_ORDERS_SUCCESS:
      const filteredOrders = action.orders.reverse();
      return { ...state, orders: filteredOrders, isLoading: false };
    case types.GET_WITHDRAWALS_SUCCESS:
      const filteredWithdrawals = action.withdrawals.reverse();
      return { ...state, withdrawals: filteredWithdrawals, isLoading: false };
    case types.GET_ORDER_AMOUNTS_SUCCESS:
      return { ...state, orderAmounts: action.orderAmounts, isLoading: false };
    case types.GET_TOTAL_AMOUNT_SUCCESS:
      return { ...state, totalAmount: action.totalAmount, isLoading: false };
    case types.GET_ORDER_DETAILS_SUCCESS:
      return { ...state, details: action.details };
    case types.ACTIVITY_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

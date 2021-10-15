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
      return { ...state, orders: action.orders.orders, totalAmount: action.orders.dataOfUser, orderAmounts: action.orders.dataProcessedUser, isLoading: false };
    case types.GET_WITHDRAWALS_SUCCESS:
      return { ...state, withdrawals: action.withdrawals, isLoading: false };
    case types.GET_ORDER_DETAILS_SUCCESS:
      return { ...state, details: action.details };
    case types.ACTIVITY_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

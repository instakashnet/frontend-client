import * as types from "./types";
const initialState = {
  rates: { buy: 0, sell: 0 },
  isLoading: false,
  isProcessing: false,
  coupon: null,
  order: null,
};

const exchangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LAST_ORDER_INIT:
    case types.GET_RATES_INIT:
      return { ...state, isLoading: true };
    case types.GET_LAST_ORDER_SUCCESS:
      return { ...state, isLoading: false };

    case types.CREATE_EXCHANGE_INIT:
    case types.COMPLETE_EXCHANGE_INIT:
    case types.PROCESS_CODE_INIT:
    case types.CANCEL_EXCHANGE_INIT:
    case types.VALIDATE_COUPON_INIT:
      return { ...state, isProcessing: true };
    case types.GET_RATES_SUCCESS:
      return { ...state, rates: action.rates, isLoading: false };
    case types.VALIDATE_COUPON_SUCCESS:
      return { ...state, coupon: action.coupon, isProcessing: false };

    case types.DELETE_COUPON:
      return { ...state, coupon: null };

    case types.CREATE_EXCHANGE_SUCCESS:
      return { ...state, isProcessing: false, order: action.order };
    case types.COMPLETE_EXCHANGE_SUCCESS:
      return { ...state, isProcessing: false, order: action.order, coupon: null };
    case types.PROCESS_CODE_SUCCESS:
    case types.CANCEL_EXCHANGE_SUCCESS:
      return { ...state, isProcessing: false, order: null };
    case types.EXCHANGE_ERROR:
      return { ...state, isLoading: false, isProcessing: false };
    default:
      return state;
  }
};

export default exchangeReducer;

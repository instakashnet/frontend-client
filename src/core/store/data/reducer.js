import * as types from './types';
const initialState = {
  schedule: null,
  isLoading: true,
  banks: [],
  currencies: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SCHEDULE_SUCCESS:
      return { ...state, schedule: action.schedule };
    case types.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.currencies };
    case types.GET_BANKS_SUCCESS:
      return { ...state, banks: action.banks };
    case types.DATA_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default dataReducer;

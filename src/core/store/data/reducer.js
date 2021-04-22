import * as types from './types';
const initialState = {
  schedule: null,
  banks: [],
  currencies: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.currencies };
    case types.GET_BANKS_SUCCESS:
      return { ...state, banks: action.banks };
    default:
      return state;
  }
};

export default dataReducer;

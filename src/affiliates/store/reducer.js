import * as types from "./types";
const initialState = {
  isLoading: true,
  affiliates: [],
};

export const affiliatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AFFILIATES_INIT:
      return { ...state, isLoading: true, affiliates: [] };
    case types.GET_AFFILIATES_SUCCESS:
      return { ...state, isLoading: false, affiliates: action.affiliates };
    case types.AFFILIATES_ERROR:
      return { ...state, isLoading: false, affiliates: [] };
    default:
      return state;
  }
};

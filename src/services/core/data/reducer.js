import * as types from "./types";
const initialState = {
  isClosed: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_IS_CLOSED.SUCCESS:
      return { isClosed: action.closed };
    case types.DATA_ERROR:
      return { isClosed: false };
    default:
      return state;
  }
};

export default dataReducer;

import * as types from "./types";
const initialState = [];

const alertReducer = (state = initialState, action) => {
  if (action.type === types.SET_ALERT) return [...state, action.alert];
  if (action.type === types.REMOVE_ALERT) return state.filter((alert) => alert.id !== action.id);
  return state;
};

export default alertReducer;

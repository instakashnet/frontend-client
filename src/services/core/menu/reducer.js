const TOGGLE_NAV = 'TOGGLE_NAV';
const initialState = {
  opened: false,
};

export const navReducer = (state = initialState, action) => {
  if (action.type === TOGGLE_NAV) return { opened: !state.opened };
  return state;
};

export default navReducer;

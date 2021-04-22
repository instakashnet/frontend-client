import * as types from './types';
const initialState = {
  isOpen: false,
  isSliderOpen: false,
  sliderType: '',
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return { ...state, isOpen: true };
    case types.CLOSE_MODAL:
      return { ...state, isOpen: false };
    case types.OPEN_SLIDER_MODAL:
      return { ...state, isSliderOpen: true, sliderType: action.sliderType };
    case types.CLOSE_SLIDER_MODAL:
      return { ...state, isSliderOpen: false, sliderType: '' };
    default:
      return state;
  }
};

export default modalReducer;

import * as types from './types';
const initialState = {
  isOpen: false,
  isSliderOpen: false,
  Component: null,
  SliderComponent: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return { ...state, isOpen: true, Component: action.Component };
    case types.CLOSE_MODAL:
      return { ...state, isOpen: false };
    case types.OPEN_SLIDER_MODAL:
      return { ...state, isSliderOpen: true, SliderComponent: action.SliderComponent };
    case types.CLOSE_SLIDER_MODAL:
      return { ...state, isSliderOpen: false, sliderType: '' };
    default:
      return state;
  }
};

export default modalReducer;

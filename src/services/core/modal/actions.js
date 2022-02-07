import * as types from './types';

export const openModal = (Component) => ({
  type: types.OPEN_MODAL,
  Component,
});

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
});

export const openSliderModal = (SliderComponent) => ({
  type: types.OPEN_SLIDER_MODAL,
  SliderComponent,
});

export const closeSliderModal = () => ({
  type: types.CLOSE_SLIDER_MODAL,
});

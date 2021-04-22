import * as types from './types';

export const openModal = () => ({
  type: types.OPEN_MODAL,
});

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
});

export const openSliderModal = (sliderType) => ({
  type: types.OPEN_SLIDER_MODAL,
  sliderType,
});

export const closeSliderModal = () => ({
  type: types.CLOSE_SLIDER_MODAL,
});

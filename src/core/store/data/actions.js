import * as types from './types';

export const getCurenciesInit = () => ({
  type: types.GET_CURRENCIES_INIT,
});

export const getCurenciesSuccess = (currencies) => ({
  type: types.GET_CURRENCIES_SUCCESS,
  currencies,
});

export const getBanksInit = () => ({
  type: types.GET_BANKS_INIT,
});

export const getBanksSuccess = (banks) => ({
  type: types.GET_BANKS_SUCCESS,
  banks,
});

export const getScheduleInit = () => ({
  type: types.GET_SCHEDULE_INIT,
});

export const getScheduleSuccess = (schedule) => ({
  type: types.GET_SCHEDULE_SUCCESS,
  schedule,
});

export const dataError = () => ({
  type: types.DATA_ERROR,
});
